import React from "react";
import axios from "axios";
import {Card, CardFooter, CardHeader, Spinner} from "reactstrap";
import Canvas from "./canvas";
import Predictions from "./predictions";
import Alert from "reactstrap/es/Alert";

const tf = require('@tensorflow/tfjs');


export default class Context extends React.Component {
    state = {
        predictions: [],
        spinner: false
    };

    predict = (ctx, scale) => {
        console.log('---------- PREDICTION ----------');

        this.setState({spinner: true, predictions: []});

        const destCanvas = document.createElement('canvas');
        const destCtx = destCanvas.getContext('2d');

        const destWidth = ctx.canvas.width / scale;
        const destHeight = ctx.canvas.height / scale;

        destCtx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height, 0, 0, destWidth, destHeight);

        const imageData = destCtx.getImageData(0, 0, destWidth, destHeight);
        let tensor = tf.browser.fromPixels(imageData);

        tensor = tensor.div(tf.scalar(255));
        tensor = tensor.max(2);
        console.log(tensor.arraySync());
        tensor = tensor.expandDims(2);
        tensor = tensor.expandDims(0);

        tensor.array().then((data) => {
            const url = 'https://quickdraw-classification.herokuapp.com/v1/models/quickdraw:predict';
            axios.post(
                url,
                {
                    instances: data
                },
                {
                    headers: {
                        'Content-Tycpe': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            ).then((response => {
                this.setState({predictions: response.data.predictions, spinner: false});
            })).catch((error) => {
                console.warn(error);
                this.setState({predictions: 'error', spinner: false});
            });
        });
    };

    clear = () => {
        this.setState({predictions: []});
    };

    remove = () => {
        this.props.remove(this.props.id);
    };

    render() {
        if (this.state.predictions.length > 0)
            console.log(this.state.predictions);

        let isError = false;

        if (typeof this.state.predictions === 'string')
            isError = true;

        return (
            <Card>
                <CardHeader>
                    <Canvas predict={this.predict} clear={this.clear}/>
                </CardHeader>
                <CardFooter>
                    {isError && <Alert color='danger'>{this.state.predictions}</Alert>}
                    {!isError && <Predictions predictions={this.state.predictions[0]}/>}
                    {this.state.spinner && <Spinner type="grow">Loading...</Spinner>}
                </CardFooter>
            </Card>
        );
    }
}