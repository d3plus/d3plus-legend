[width]: 400
[height]: 200

# Images in Legends

Each pair of square and text in a Legend is just an extension of the [Shape](http://d3plus.org/docs/#Shape) class. In order to override how they are rendered, pass a valid [config](http://d3plus.org/docs/#BaseClass.config) object to [.shapeConfig( )](http://d3plus.org/docs/#Shape.shapeConfig). In this example, we are providing an accessor function to the [backgroundImage](http://d3plus.org/docs/#Shape.backgroundImage) method of [Shape](http://d3plus.org/docs/#Shape), which returns an image path from each data point.

```js
var data = [
  {id: "Apple", color: "orange", image: "https://datausa.io/images/attrs/thing_apple.png"},
  {id: "Fish", color: "blue", image: "https://datausa.io/images/attrs/thing_fish.png"},
  {id: "Tomato", color: "red", image: "https://datausa.io/images/attrs/thing_tomato.png"}
];

var legend = new d3plus.Legend()
  .data(data)
  .shapeConfig({
    backgroundImage: function(d) { return d.image; },
    fill: function(d) { return d.color; },
    height: 25,
    width: 25
  })
  .render();
```
