class Shape {
  constructor(color) {
    this.fill = color
  }

  render() {
    throw new Error("Not implemented.")
  }
}

class Circle extends Shape {
  constructor(color) {
    super(color)
    this.cx = 150
    this.cy = 100
    this.r = 80
  }

  render() {
    return `<circle cx="${this.cx}" cy="${this.cy}" r="${this.r}" fill="${this.fill}" />`
  }
}

class Triangle extends Shape {
  constructor(color) {
    super(color)
    this.points = "150,10 20,190 280,190"
  }

  render() {
    return `<polygon points="${this.points}" fill="${this.fill}" />`
  }
}

class Rectangle extends Shape {
  constructor(color) {
    super(color)
    this.x = 40
    this.y = 40
    this.width = 220
    this.height = 120
  }

  render() {
    return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="${this.fill}" />`
  }
}

const shape_options = {"circle":Circle, "triangle":Triangle, "rectangle":Rectangle};

module.exports = {shape_options, Circle, Triangle, Rectangle};
