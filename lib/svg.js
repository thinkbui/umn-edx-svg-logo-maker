const shapes = require('./shapes.js')
const Texts = require('./texts.js')

class SVG {
  constructor(shape,color,text,t_color) {
    this.shape = new shapes.shape_options[shape](color)
    this.text = new Texts(text,t_color)
  }

  toString() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shape.toString()}${this.text.toString()}</svg>`
  }
}

module.exports = SVG;
