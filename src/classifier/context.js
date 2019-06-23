import React from "react";
import axios from "axios";
import {Card, CardFooter, CardHeader, Spinner} from "reactstrap";
import Canvas from "./canvas";
import Predictions from "./predictions";

const tf = require('@tensorflow/tfjs');


function range(begin, end, interval = 1) {
    const result = [];

    for (let i = begin; i < end; i += interval)
        result.push(i);

    if (interval > result[-1])
        result.push(end);

    return Array.from(result);
}


export default class Context extends React.Component {
    state = {
        predictions: [],
        spinner: false
    };

    predict = (ctx, scale) => {
        this.setState({spinner: true, predictions: []});

        const destCanvas = document.createElement('canvas');
        const destCtx = destCanvas.getContext('2d');

        const destDim = ctx.canvas.width / scale;

        destCtx.drawImage(ctx.canvas, 0, 0);

        destCtx.scale(1 / scale, 1 / scale);
        destCtx.drawImage(destCtx.canvas, 0, 0);

        const imageData = destCtx.getImageData(0, 0, destDim, destDim);
        const tensor = tf.browser.fromPixels(imageData);

        tensor.data().then((data) => {
            const height = tensor.shape[0];
            const width = tensor.shape[1];
            let requestData = '';

            for (const h of range(0, height)) {
                let row = '';

                for (const w of range(0, width)) {
                    const r = data[h * width + w * 3];
                    const g = data[h * height + w * 3 + 1];
                    const b = data[h * height + w * 3 + 2];

                    row += `[${Math.max(r, g, b)}],`;
                }

                requestData += `[${row.slice(0, -1)}],`;
            }

            requestData = `[[${requestData.slice(0, -1)}]]`;

            const url = 'https://quickdraw-classification.herokuapp.com/v1/models/quickdraw:predict';
            axios.post(
                url,
                {
                    instances: JSON.parse(requestData)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            ).then((response => {
                this.setState({predictions: response.data.predictions, spinner: false});
            })).catch((error) => {
                console.log(error);
                this.setState({predictions: "error", spinner: false});
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
        return (
            <Card>
                <CardHeader>
                    <Canvas predict={this.predict} clear={this.clear}/>
                </CardHeader>
                <CardFooter>
                    <Predictions predictions={this.state.predictions[0]}/>
                    {this.state.spinner && <Spinner type="grow">Loading...</Spinner>}
                </CardFooter>
            </Card>
        );
    }
}