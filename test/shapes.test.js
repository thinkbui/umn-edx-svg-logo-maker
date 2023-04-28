const Shape = require('../lib/shapes.js');

describe('Circle', () => {
  describe('render', () => {
    test('should return shape as SVG string', () => {
      const color = "green";
      const circle = new Shape.Circle(color);
      expect(circle.render()).toEqual('<circle cx="150" cy="100" r="80" fill="green" />');
    });
  });
});

describe('Triangle', () => {
  describe('render', () => {
    test('should return shape as SVG string', () => {
      const color = "green";
      const triangle = new Shape.Triangle(color);
      expect(triangle.render()).toEqual('<polygon points="150,10 20,190 280,190" fill="green" />');
    });
  });
});

describe('Rectangle', () => {
  describe('render', () => {
    test('should return shape as SVG string', () => {
      const color = "green";
      const rectangle = new Shape.Rectangle(color);
      expect(rectangle.render()).toEqual('<rect x="40" y="40" width="220" height="120" fill="green" />');
    });
  });
});
