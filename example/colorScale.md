[width]: 400
[height]: 200

# Creating a Color Scale

The [ColorScale](http://d3plus.org/docs/#ColorScale) class creates a custom color scale given an array of data. In this example, we are providing an array of 2 values, but the array of data can be of any length (it extracts the values from all available data points).

```js
var data = [
  {value: 20},
  {value: 640}
];

var bottom = new d3plus.ColorScale()
  .data(data)
  .render();
```
