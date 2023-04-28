class Texts {
  constructor(text,t_color) {
    this.text = text
    this.t_color = t_color
  }

  toString() {
    return `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.t_color}">${this.text}</text>`
  }
}

module.exports = Texts;