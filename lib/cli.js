const inquirer = require('inquirer');
const shapes = require("./shapes.js");
const svg = require("./svg.js");

// Selection of colors supported in SVG
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

// This class directly interacts with the terminal prompting the user for details about the logo
class CLI {
  constructor() {
    null;
  }

  run() {
    this.prompts();
  }

  // This function is separate so that it can be recursively called when validation fails
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
          console.log(svgObj.render())
        }
      } else {
        console.log("ERROR:")
        for(let i=0;i<validity.errors.length;i++){
          console.log(validity.errors[i])
        }
        console.log("Please try again.")
        this.prompts();
      }
    })
  }
}

// Validation functions are separate to keep the private
// isValid is the overall validator for all 4 logo options
function isValid(shape, color, text, t_color) {
  let validity_array = [isValidShape(shape), isValidColor(color), isValidText(text), isValidColor(t_color)]
  return validity_array.reduce(validReduceHelper)
}

// isValidShape ensures the shape selected is among the options
// Though this is trivial since users can select only from the list
function isValidShape(shape) {
  if(Object.keys(shapes.shape_options).includes(shape)) {
    return {"status": true, "errors": []}
  } else {
    return {"status": false, "errors": [`"${shape}" is not a valid shape.`]}
  }
}

// isValidColor ensures the color is on the list of valid colors or in a 3 or 6 digit hex format
function isValidColor(color) {
  if(valid_colors.includes(color) || color.match(/^#[0-9A-Fa-f]{3}$/) || color.match(/^#[0-9A-Fa-f]{6}$/)) {
    return {"status": true, "errors": []}
  } else {
    return {"status": false, "errors": [`"${color}" is not a valid color.`]}
  }
}

// isValidText ensures the text is length 3 or less
function isValidText(text) {
  if(text.length<=3) {
    return {"status": true, "errors": []}
  } else {
    return {"status": false, "errors": [`"${text}" is too long.`]}
  }
}

// This helper is for reducing an array of validation result objects into a single object
function validReduceHelper(a,b) {
  a.status &= b.status
  a.errors = a.errors.concat(b.errors)
  return a
}

module.exports = CLI;
