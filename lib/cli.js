const inquirer = require('inquirer');
const shapes = require("./shapes.js");
const svg = require("./svg.js");

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
      }
    ])
    .then(({ shape, color, text, t_color }) => {
      let validity = this.isValid()
      if(validity.status) {
        let svgObj = new svg(shape,color,text, t_color)
        svgObj.toFile()
        console.log("done")
      } else {
        console.log(validity.errors)
        console.log("Please try again.")
        this.prompts();
      }
    })
  }

  isValid() {
    // TODO: Implement checks of color and text validity
    return {"status": true, "errors": []}
  }
}

module.exports = CLI;
