[width]: 400
[height]: 200

# Changing Style of a Color Scale

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)).

Given a page with a dark background:

```css
body {
  background-color: #444;
}
```

It is often necessary to lighten the default [fontColor](http://d3plus.org/docs/#TextBox.fontColor) and [stroke](http://d3plus.org/docs/#Shape.stroke):

```js
var data = [
  {value: 20},
  {value: 640}
];

var bottom = new d3plus.ColorScale()
  .data(data)
  .color(["#000", "#F00"])
  .axisConfig({
    barConfig: {
      stroke: "white"
    },
    shapeConfig: {
      labelConfig: {
        fontColor: "white"
      },
      stroke: "#979797"
    }
  })
  .rectConfig({
    stroke: "white"
  })
  .render();
```
