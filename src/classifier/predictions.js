import React from "react";
import {Row} from "reactstrap";
import Prediction from "./prediction";


export default class Predictions extends React.Component {
    classes = [
        "sun",
        "laptop",
        "ladder",
        "book",
        "tennis racquet",
        "face",
        "eye",
        "mushroom",
        "sword",
        "flower",
        "car",
        "tree",
        "square",
        "moon",
        "hat",
        "pizza",
        "triangle",
        "scissors",
        "paper clip",
        "microphone",
        "saw",
        "key",
        "donut",
        "bird",
        "coffee cup",
        "butterfly",
        "cat",
        "ice cream",
        "suitcase",
        "hammer",
        "rainbow",
        "bicycle"
    ];

    render() {
        if (!this.props.predictions)
            return null;

        return (
            <Row>
                {this.props.predictions.map((pred, i) => (
                    <Prediction key={i} position={i}>{this.classes[pred]}</Prediction>
                ))}
            </Row>
        )
    }
}