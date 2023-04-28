const inquirer = require('inquirer');
const shapes = require("./shapes.js");
const svg = require("./svg.js");

const valid_colors = ["red","orange","yellow","green","blue","purple","brown","black","white"]

class CLI {
  constructor() {
    null;
  }

  run() {
    this.prompts();
  }

  prompts() {
    return inquirer
    .prompt([
      {
        type: 'list',
        name: 'shape',
        message: 'Please select a shape:',
        choices: Object.keys(shapes.shape_options)
      },
      {
        type: 'input',
        name: 'color',
        message: 'Please enter the shape color:'
      },
      {
        type: 'input',
        name: 'text',
        message: 'Please enter the text:'
      },
      {
        type: 'input',
        name: 't_color',
        message: 'Please enter the text color:'
      },
      {
        type: 'confirm',
        name: 'output_file',
        message: 'Output to file?'
      }
    ])
    .then(({ shape, color, text, t_color, output_file }) => {
      this.shape = shape
      this.color = color
      this.text = text
      this.t_color = t_color
      this.output_file = output_file
      let validity = this.isValid()
      if(validity.status) {
        let svgObj = new svg(this.shape, this.color, this.text, this.t_color)
        if (this.output_file) {
          svgObj.toFile()
        } else {
          console.log(svgObj.toString())
        }
      } else {
        for(let i=0;i<validity.errors.length;i++){
          console.log(validity.errors[i])
        }
        console.log("Please try again.")
        this.prompts();
      }
    })
  }

  isValid() {
    let validity_array = [this.isValidShape(this.shape), this.isValidColor(this.color), this.isValidText(this.text), this.isValidColor(this.t_color)]
    return validity_array.reduce(this.validReduceHelper)
  }

  isValidShape(shape) {
    if(Object.keys(shapes.shape_options).includes(shape)) {
      return {"status": true, "errors": []}
    } else {
      return {"status": false, "errors": [`"${shape}" is not a valid shape.`]}
    }
  }

  isValidColor(color) {
    if(valid_colors.includes(color) || color.match(/\A#[0-9A-Fa-f]{3}\z/) || color.match(/\A#[0-9A-Fa-f]{6}\z/)) {
      return {"status": true, "errors": []}
    } else {
      return {"status": false, "errors": [`"${color}" is not a valid color.`]}
    }
  }

  isValidText(text) {
    if(text.length<=3) {
      return {"status": true, "errors": []}
    } else {
      return {"status": false, "errors": [`"${text}" is too long.`]}
    }
  }

  validReduceHelper(a,b) {
    a.status &= b.status
    a.errors = a.errors.concat(b.errors)
    return a
  }
}

module.exports = CLI;
