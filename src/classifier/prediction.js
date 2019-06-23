import React from "react";
import {Col} from "reactstrap";

export default class Prediction extends React.Component {
    positions = [
        'text-info',
        'text-dark',
        'text-secondary'
    ];

    render() {
        return (
            <Col className={this.positions[this.props.position]}><h4>{this.props.children}</h4></Col>
        )
    }
}
