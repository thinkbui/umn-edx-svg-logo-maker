const shapes = require('./shapes.js')

class SVG {
  constructor(shape,color,text,t_color) {
    this.shape = new shapes.shape_options[shape](color)
    this.text = new SvgText(text,t_color)
  }

  toString() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shape.toString()}${this.text.toString()}</svg>`
  }
}

class SvgText {
  constructor(text,t_color) {
    this.text = text
    this.t_color = t_color
  }

  toString() {
    return `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.t_color}">${this.text}</text>`
  }
}

module.exports = SVG;
