import {default as constant} from "./constant";
import {select as d3Select} from "d3-selection";
import * as d3plusShape from "d3plus-shape";

/**
    The default id accessor function.
    @private
*/
function shapeColor(d) {
  return d.color;
}

/**
    The default id accessor function.
    @private
*/
function shapeId(d) {
  return d.id;
}

/**
    @function shape
    @desc Creates an SVG color shape based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this shape generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
    @param {Array} [data = []]
    @example <caption>a sample dataset</caption>
var data = [
  {"id": 0, "color": "brickred"},
  {"id": 1, "color": "cornflowerblue"}
];
@example <caption>passed to the generator</caption>
shape([data]);
@example <caption>creates the following</caption>
<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
</g>
@example <caption>this is shorthand for the following</caption>
shape().data([data])();
@example <caption>which also allows a post-draw callback function</caption>
shape().data([data])(function() { alert("draw complete!"); })
*/
export default function(data = []) {

  /**
      The default x accessor function.
      @private
  */
  function shapeX(d, i) {
    const s = size(d, i);
    return orient === "vertical" ? s / 2 : i * s + s / 2 + padding * i;
  }

  /**
      The default y accessor function.
      @private
  */
  function shapeY(d, i) {
    const s = size(d, i);
    return orient === "horizontal" ? s / 2 : i * s + s / 2 + padding * i;
  }

  let color = shapeColor,
      id = shapeId,
      label = shapeId,
      orient = "vertical",
      padding = 10,
      select,
      size = constant(50),
      x = shapeX,
      y = shapeY;

  /**
    The inner return object and draw function that gets assigned the public methods.
    @private
  */
  function shape(callback) {

    if (select === void 0) shape.select(d3Select("body").append("svg").style("width", `${window.innerWidth}px`).style("height", `${window.innerHeight}px`).node());

    d3plusShape.rect()
      .data(data)
      .duration(0)
      .fill(color)
      .height(size)
      .id(id)
      .label(label)
      .select(select.node())
      .width(size)
      .x(x)
      .y(y)();

    if (callback) setTimeout(callback, 100);

    return shape;

  }

  /**
      @memberof shape
      @desc If *value* is specified, sets the color accessor to the specified function and returns this shape generator. If *value* is not specified, returns the current color accessor.
      @param {Function} [*value*]
      @example
function value(d) {
  return d.color;
}
  */
  shape.color = function(_) {
    return arguments.length ? (color = _, shape) : color;
  };

  /**
      @memberof shape
      @desc If *data* is specified, sets the data array to the specified array and returns this shape generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  shape.data = function(_) {
    return arguments.length ? (data = _, shape) : data;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the id accessor to the specified function and returns this shape generator. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
      @example
function value(d) {
  return d.id;
}
  */
  shape.id = function(_) {
    return arguments.length ? (id = _, shape) : id;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this shape generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
  */
  shape.label = function(_) {
    return arguments.length ? (label = typeof _ === "function" ? _ : constant(_), shape) : label;
  };

  /**
      @memberof shape
      @desc If *orient* is specified, sets the orientation of the shape and returns this shape generator. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "vertical"] Supports `"horizontal"` and `"vertical"` orientations.
  */
  shape.orient = function(_) {
    return arguments.length ? (orient = _, shape) : orient;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the padding between each key to the specified number and returns this shape generator. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  shape.padding = function(_) {
    return arguments.length ? (padding = _, shape) : padding;
  };

  /**
      @memberof shape
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this shape generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3Select("body").append("svg")]
  */
  shape.select = function(_) {
    return arguments.length ? (select = d3Select(_), shape) : select;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the size accessor to the specified function or number and returns this shape generator. If *value* is not specified, returns the current size accessor.
      @param {Function|Number} [*value* = 20]
  */
  shape.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(_), shape) : size;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this shape generator. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
  */
  shape.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), shape) : x;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this shape generator. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
  */
  shape.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), shape) : y;
  };

  return data.length ? shape() : shape;

}
