import React from "react";
import {Button, Container, Row} from "reactstrap";
import Context from "./context";


export default class Images extends React.Component {
    state = {
        images: []
    };

    addCanvas = () => {
        this.setState(prevState => ({
            images: [...prevState.images, <Context remove={this.removeCanvas}/>]
        }));
    };

    removeCanvas = () => {
        this.setState(prevState => ({
            images: prevState.images.slice(0, -1)
        }))
    };

    componentDidMount() {
        this.addCanvas();
    }

    render() {
        return (
            <Container>
                {this.state.images.map(((image, i) => (
                    <Row key={i} className="justify-content-center mb-4">
                        {image}
                    </Row>
                )))}

                <Button onClick={this.removeCanvas} className="fixed-bottom rounded-circle"
                        style={{left: "auto", right: 25, bottom: 115, width: 70, height: 70}}
                        disabled={this.state.images.length <= 0}><h1>-</h1></Button>

                <Button color='info' onClick={this.addCanvas} className="fixed-bottom rounded-circle"
                        style={{left: "auto", right: 25, bottom: 25, width: 70, height: 70}}
                        disabled={this.state.images.length >= 5}><h1>+</h1></Button>
            </Container>
        );
    }
}