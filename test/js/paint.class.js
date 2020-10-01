import Point from './point.model.js'
import { getMouseCoordsOnCanvas, findDistance } from './utility.js'
export default class Paint {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.context = this.canvas.getContext("2d")
        this.undoStack = []
        this.undoLimit = 20;
    }

    set activeTool(tool) {
        this.tool = tool
    }

    set lineWidth(linewidth) {
        this._lineWidth = linewidth;
        this.context.lineWidth = this._lineWidth
    }

    set selectedColor(color) {
        this.color = color;
        this.context.strokeStyle = this.color;
    }

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e)
    }

    onMouseDown(e) {
        this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        if (this.undoStack.length >= this.undoLimit) {
            this.undoStack.shift()
        }
        this.undoStack.push(this.savedData)
        this.canvas.onmousemove = e => this.onMouseMove(e)
        document.onmouseup = e => this.onMouseUp(e)
        this.startPos = getMouseCoordsOnCanvas(e, this.canvas)
        if (this.tool == "draw") {
            this.context.beginPath()
            this.context.moveTo(this.startPos.x, this.startPos.y)
        }
    }

    onMouseMove(e) {
        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas)
        console.log(this.currentPos)

        switch (this.tool) {
            case "line":
            case "circle":
            case "rectangle":
                this.drawShape()
                break;
            case "draw":
                this.drawFreeLine(this._lineWidth)
                break;
            default:
                break;
        }
    }

    onMouseUp(e) {
        this.canvas.onmousemove = null
        document.onmouseup = null
    }

    drawShape() {
        this.context.putImageData(this.savedData, 0, 0)
        this.context.beginPath()

        if (this.tool == "line") {
            this.context.moveTo(this.startPos.x, this.startPos.y)
            this.context.lineTo(this.currentPos.x, this.currentPos.y)
        } else if (this.tool == "rectangle") {
            this.context.rect(this.startPos.x, this.startPos.y, this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y)
        } else if (this.tool == "circle") {
            var distance = findDistance(this.startPos, this.currentPos)
            this.context.arc(this.startPos.x, this.startPos.y, distance, 0, 2 * Math.PI, false)
        }
        this.context.stroke()
    }

    drawFreeLine(lineWidth) {
        this.context.lineWidth = lineWidth
        this.context.lineTo(this.currentPos.x, this.currentPos.y)
        this.context.stroke()
    }

    undoPaint() {
        if (this.undoStack.length > 0) {
            this.context.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0)
            this.undoStack.pop()
        }
    }
}