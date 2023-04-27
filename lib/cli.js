const inquirer = require('inquirer');

class CLI {
  constructor() {
    this.shape = ""
    this.color = ""
    this.text = ""
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
        choices: ["circle", "triangle", "square"]
      },
      {
        type: 'input',
        name: 'color',
        message: 'Please enter your logo color:'
      },
      {
        type: 'input',
        name: 'text',
        message: 'Please enter your logo text:'
      }
    ])
    .then(({ shape, color, text }) => {
      console.log(shape);
      console.log(color);
      console.log(text);
      this.shape = shape;
      this.color = color;
      this.text = text;
      console.log(this.shape)
      console.log(this.color)
      console.log(this.text)
      let validity = this.isValid()
      if(validity.status) {
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
