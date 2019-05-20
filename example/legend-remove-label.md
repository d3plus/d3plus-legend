[width]: 400
[height]: 200

# Removing Legend Labels

The text labels in a legend can be removed/disabled by setting the [.label( )](http://d3plus.org/docs/#Legend.label) method to `false`. This is common practice when using images, as in the [Images in Legends](http://d3plus.org/examples/d3plus-legend/legend-image/) example (which this code is based on).

```js
var data = [
  {id: "Apple", color: "orange", image: "https://datausa.io/images/attrs/thing_apple.png"},
  {id: "Fish", color: "blue", image: "https://datausa.io/images/attrs/thing_fish.png"},
  {id: "Tomato", color: "red", image: "https://datausa.io/images/attrs/thing_tomato.png"}
];

var legend = new d3plus.Legend()
  .data(data)
  .label(false)
  .shapeConfig({
    backgroundImage: function(d) { return d.image; },
    fill: function(d) { return d.color; },
    height: 25,
    width: 25
  })
  .render();
```
