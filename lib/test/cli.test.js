const CLI = require('../cli.js');

describe("CLI", () =>
  it ("should return 1", () => {
    const cli = new CLI();
    expect(cli.run()).toEqual(1);
  })
)