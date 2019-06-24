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

        let values = this.props.predictions
            .map((prediction, i) => [prediction, i])
            .sort(([pred1,], [pred2,]) => pred2 - pred1);

        values = values.slice(0, 3)
            .map(([, i]) => this.classes[i]);

        return (
            <Row>
                {values.map((val, i) => (
                    <Prediction key={i} position={i}>{val}</Prediction>
                ))}
            </Row>
        )
    }
}