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
    })
  }
}

module.exports = CLI;