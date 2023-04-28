const inquirer = require('inquirer');
const shapes = require("./shapes.js");
const svg = require("./svg.js");

const valid_colors = ["red","orange","yellow","green","blue","purple","brown","black","white"]
const questions = [
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
]

class CLI {
  constructor() {
    null;
  }

  run() {
    this.prompts();
  }

  prompts() {
    return inquirer
    .prompt(questions)
    .then(({ shape, color, text, t_color, output_file }) => {
      let validity = isValid(shape, color, text, t_color)
      if(validity.status) {
        let svgObj = new svg(shape, color, text, t_color)
        if (output_file) {
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
}

function isValid(shape, color, text, t_color) {
  let validity_array = [isValidShape(shape), isValidColor(color), isValidText(text), isValidColor(t_color)]
  return validity_array.reduce(validReduceHelper)
}

function isValidShape(shape) {
  if(Object.keys(shapes.shape_options).includes(shape)) {
    return {"status": true, "errors": []}
  } else {
    return {"status": false, "errors": [`"${shape}" is not a valid shape.`]}
  }
}

function isValidColor(color) {
  if(valid_colors.includes(color) || color.match(/\A#[0-9A-Fa-f]{3}\z/) || color.match(/\A#[0-9A-Fa-f]{6}\z/)) {
    return {"status": true, "errors": []}
  } else {
    return {"status": false, "errors": [`"${color}" is not a valid color.`]}
  }
}

function isValidText(text) {
  if(text.length<=3) {
    return {"status": true, "errors": []}
  } else {
    return {"status": false, "errors": [`"${text}" is too long.`]}
  }
}

function validReduceHelper(a,b) {
  a.status &= b.status
  a.errors = a.errors.concat(b.errors)
  return a
}

module.exports = CLI;
