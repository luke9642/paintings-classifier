import React from "react";
import {Button, ButtonGroup} from "reactstrap";


export default class Canvas extends React.Component {
    scale = 20;
    imageDim = 28;
    isPainting = false;
    line = [];
    prevPos = {offsetX: 0, offsetY: 0};

    onMouseDown = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        this.isPainting = true;
        this.prevPos = {offsetX, offsetY};
    };

    onMouseMove = ({nativeEvent}) => {
        if (this.isPainting) {
            const {offsetX, offsetY} = nativeEvent;
            const offSetData = {offsetX, offsetY};
            // Set the start and stop position of the paint event.
            const positionData = {
                start: {...this.prevPos},
                stop: {...offSetData},
            };
            // Add the position to the line array
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData, 'black');
        }
    };

    endPaintEvent = () => {
        if (this.isPainting)
            this.isPainting = false;
    };

    paint = (prevPos, currPos, strokeStyle) => {
        const {offsetX, offsetY} = currPos;
        const {offsetX: x, offsetY: y} = prevPos;

        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(offsetX, offsetY);
        this.ctx.stroke();
        this.prevPos = {offsetX, offsetY};
    };

    predict = () => {
        this.props.predict(this.ctx, this.scale);
    };

    clear = () => {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.props.clear();
    };

    componentDidMount() {
        this.canvas.width = this.imageDim * this.scale;
        this.canvas.height = this.imageDim * this.scale;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'white';
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 20;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        return (
            <>
                <canvas
                    // We use the ref attribute to get direct access to the canvas element.
                    ref={(ref) => (this.canvas = ref)}
                    className="shadow bg-white"
                    onMouseDown={this.onMouseDown}
                    onMouseLeave={this.endPaintEvent}
                    onMouseUp={this.endPaintEvent}
                    onMouseMove={this.onMouseMove}
                />
                <hr/>
                <ButtonGroup>
                    <Button color='info' onClick={this.predict}>Predict</Button>
                    <Button color='info' onClick={this.clear}>Clear</Button>
                </ButtonGroup>
            </>
        );
    }
}