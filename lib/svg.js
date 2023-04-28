const fs = require('fs')
const shapes = require('./shapes.js')
const Texts = require('./texts.js')

class SVG {
  constructor(shape,color,text,t_color) {
    this.shape = new shapes.shape_options[shape](color)
    this.text = new Texts(text,t_color)
  }

  toFile() {
    fs.writeFile('logo.svg', this.render(), (err) =>
      err ? console.error(err) : console.log('Generated logo.svg')
    );
  }

  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n\n\t${this.shape.render()}\n\n\t${this.text.render()}\n\n</svg>`
  }
}

module.exports = SVG;
