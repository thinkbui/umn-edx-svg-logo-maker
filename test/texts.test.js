const Texts = require('../lib/texts.js');

describe('Texts', () => {
  describe('render', () => {
    test('should return object as SVG string', () => {
      const text = "SVG";
      const t_color = "white";
      const textsObj = new Texts(text,t_color);
      expect(textsObj.render()).toEqual('<text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>');
    });
  });
});
