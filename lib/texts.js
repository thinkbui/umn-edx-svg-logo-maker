// Simple class that stores just the text and its color to return as an SVG elem string
class Texts {
  constructor(text,t_color) {
    this.text = text
    this.t_color = t_color
    this.x = 150
    this.y = 125
    this.font_size = 60
    this.text_anchor = "middle"
  }

  render() {
    return `<text x="${this.x}" y="${this.y}" font-size="${this.font_size}" text-anchor="${this.text_anchor}" fill="${this.t_color}">${this.text}</text>`
  }
}

module.exports = Texts;
