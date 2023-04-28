const SVG = require('../lib/svg.js');

describe('SVG', () => {
  describe('toString', () => {
    test('should return object as SVG string', () => {
      const shape = "circle";
      const color = "green";
      const text = "SVG";
      const t_color = "white";
      const svgObj = new SVG(shape,color,text,t_color);
      expect(svgObj.toString()).toEqual('<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="150" cy="100" r="80" fill="green" /><text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text></svg>');
    });
  });
});