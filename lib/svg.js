const fs = require('fs')
const shapes = require('./shapes.js')
const Texts = require('./texts.js')

// Class that holds the overall SVG data and renders the full image
// It is here where app writes the output file
class SVG {
  constructor(shape,color,text,t_color) {
    this.shape = new shapes.shape_options[shape](color)
    this.text = new Texts(text,t_color)
    this.version = 1.1
    this.width = 300
    this.height = 200
    this.xmlns = "http://www.w3.org/2000/svg"
  }

  toFile() {
    fs.writeFile('logo.svg', this.render(), (err) =>
      err ? console.error(err) : console.log('Generated logo.svg')
    );
  }

  render() {
    return `<svg version="${this.version}" width="${this.width}" height="${this.height}" xmlns="${this.xmlns}">\n\n\t${this.shape.render()}\n\n\t${this.text.render()}\n\n</svg>`
  }
}

module.exports = SVG;
