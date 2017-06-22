/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

import ckmeans from "./ckmeans";

import {extent, merge, range} from "d3-array";
import {interpolateHsl} from "d3-interpolate";
import {scaleLinear, scaleThreshold} from "d3-scale";
import {select} from "d3-selection";

import {Axis} from "d3plus-axis";
import {colorLighter} from "d3plus-color";
import {accessor, BaseClass, constant, elem} from "d3plus-common";
import {Rect} from "d3plus-shape";

/**
    @class ColorScale
    @extends external:BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
export default class ColorScale extends BaseClass {

  /**
      @memberof ColorScale
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();

    this._axisClass = new Axis();
    this._axisConfig = {
      gridSize: 0
    };
    this._axisTest = new Axis();
    this._align = "middle";
    this._color = "#0C8040";
    this._data = [];
    this._duration = 600;
    this._height = 200;
    this._orient = "bottom";
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._rectClass = new Rect();
    this._rectConfig = {
      stroke: "#000",
      strokeWidth: 1
    };
    this._scale = "linear";
    this._size = 10;
    this._value = accessor("value");
    this._width = 400;

  }

  /**
      @memberof ColorScale
      @desc Renders the current ColorScale to the page. If a *callback* is specified, it will be called once the ColorScale is done drawing.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  render(callback) {

    if (this._select === void 0) this.select(select("body").append("svg").attr("width", `${this._width}px`).attr("height", `${this._height}px`).node());

    const horizontal = ["bottom", "top"].includes(this._orient);

    const height = horizontal ? "height" : "width",
          width = horizontal ? "width" : "height",
          x = horizontal ? "x" : "y",
          y = horizontal ? "y" : "x";

    // Shape <g> Group
    this._group = elem("g.d3plus-ColorScale", {parent: this._select});

    const domain = extent(this._data, this._value);
    let colors = this._color, ticks;

    if (!(colors instanceof Array)) {
      colors = [
        colorLighter(colors, 0.9),
        colorLighter(colors, 0.75),
        colorLighter(colors, 0.5),
        colorLighter(colors, 0.25),
        colors
      ];
    }

    if (this._scale === "jenks") {

      const data = this._data
        .map(this._value)
        .filter(d => d !== null && typeof d === "number");

      if (data.length <= colors.length) {

        const ts = scaleLinear()
          .domain(range(0, data.length - 1))
          .interpolate(interpolateHsl)
          .range(colors);

        colors = data.slice(0, data.length - 1).map((d, i) => ts(i));
      }

      const jenks = ckmeans(data, colors.length);

      ticks = merge(jenks.map((c, i) => i === jenks.length - 1 ? [c[0], c[c.length - 1]] : [c[0]]));

      this._colorScale = scaleThreshold()
        .domain(ticks)
        .range(["black"].concat(colors).concat(colors[colors.length - 1]));

    }
    else {

      const step = (domain[1] - domain[0]) / colors.length;
      const buckets = range(domain[0], domain[1] + step / 2, step);

      if (this._scale === "buckets") ticks = buckets;

      this._colorScale = scaleLinear()
        .domain(buckets)
        .range(colors);

    }

    const axisConfig = Object.assign({
      domain: horizontal ? domain : domain.reverse(),
      duration: this._duration,
      height: this._height,
      labels: ticks,
      orient: this._orient,
      padding: this._padding,
      ticks,
      width: this._width
    }, this._axisConfig);

    this._axisTest
      .select(elem("g.d3plus-ColorScale-axisTest", {enter: {opacity: 0}, parent: this._group}).node())
      .config(axisConfig)
      .render();

    const axisBounds = this._axisTest.outerBounds();

    this._outerBounds[width] = this[`_${width}`] - this._padding * 2;
    this._outerBounds[height] = axisBounds[height] + this._size;

    this._outerBounds[x] = this._padding;
    this._outerBounds[y] = this._padding;
    if (this._align === "middle") this._outerBounds[y] = (this[`_${height}`] - this._outerBounds[height]) / 2;
    else if (this._align === "end") this._outerBounds[y] = this[`_${height}`] - this._padding - this._outerBounds[height];

    const groupOffset = this._outerBounds[y] + (["bottom", "right"].includes(this._orient) ? this._size : 0) - (axisConfig.padding || this._axisClass.padding());
    this._axisClass
      .select(elem("g.d3plus-ColorScale-axis", {
        parent: this._group,
        update: {transform: `translate(${horizontal ? 0 : groupOffset}, ${horizontal ? groupOffset : 0})`}
      }).node())
      .config(axisConfig)
      .align("start")
      .render();

    const axisScale = this._axisTest._d3Scale;
    const scaleRange = axisScale.range();

    let defs = this._group.selectAll("defs").data([0]);
    const defsEnter = defs.enter().append("defs");
    defsEnter.append("linearGradient").attr("id", `gradient-${this._uuid}`);
    defs = defsEnter.merge(defs);
    defs.select("linearGradient")
      .attr(`${x}1`, horizontal ? "0%" : "100%")
      .attr(`${x}2`, horizontal ? "100%" : "0%")
      .attr(`${y}1`, "0%")
      .attr(`${y}2`, "0%");
    const stops = defs.select("linearGradient").selectAll("stop")
      .data(colors);
    stops.enter().append("stop").merge(stops)
      .attr("offset", (d, i) => `${i / (colors.length - 1) * 100}%`)
      .attr("stop-color", String);

    function bucketWidth(d, i) {
      const w = Math.abs(axisScale(ticks[i + 1]) - axisScale(d));
      return w || 2;
    }

    this._rectClass
      .data(ticks ? ticks.slice(0, ticks.length - 1) : [0])
      .id((d, i) => i)
      .select(elem("g.d3plus-ColorScale-Rect", {parent: this._group}).node())
      .config({
        fill: ticks ? d => this._colorScale(d) : `url(#gradient-${this._uuid})`,
        [x]: ticks ? (d, i) => axisScale(d) + bucketWidth(d, i) / 2 - (["left", "right"].includes(this._orient) ? bucketWidth(d, i) : 0) : scaleRange[0] + (scaleRange[1] - scaleRange[0]) / 2,
        [y]: this._outerBounds[y] + (["top", "left"].includes(this._orient) ? axisBounds[height] : 0) + this._size / 2,
        [width]: ticks ? bucketWidth : scaleRange[1] - scaleRange[0],
        [height]: this._size
      })
      .config(this._rectConfig)
      .render();

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the axis configuration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current axis configuration.
      @param {Object} [*value*]
      @chainable
  */
  axisConfig(_) {
    return arguments.length ? (this._axisConfig = Object.assign(this._axisConfig, _), this) : this._axisConfig;
  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  align(_) {
    return arguments.length ? (this._align = _, this) : this._align;
  }

  /**
      @memberof ColorScale
      @desc Defines the color or colors to be used for the scale. If only a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.
      @param {String|Array} [*value* = "#0C8040"]
      @chainable
  */
  color(_) {
    return arguments.length ? (this._color = _, this) : this._color;
  }

  /**
      @memberof ColorScale
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
      @chainable
  */
  data(_) {
    return arguments.length ? (this._data = _, this) : this._data;
  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the transition duration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
      @chainable
  */
  duration(_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the overall height of the ColorScale and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
      @chainable
  */
  height(_) {
    return arguments.length ? (this._height = _, this) : this._height;
  }

  /**
      @memberof ColorScale
      @desc Sets the flow of the items inside the ColorScale. If no value is passed, the current flow will be returned.
      @param {String} [*value* = "bottom"]
      @chainable
  */
  orient(_) {
    return arguments.length ? (this._orient = _, this) : this._orient;
  }

  /**
      @memberof ColorScale
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the ColorScale content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  outerBounds() {
    return this._outerBounds;
  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
      @chainable
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof ColorScale
      @desc Provides access to the config method of the Rect class used to create the different rectangle color buckets.
      @param {Object} [*value*]
      @chainable
  */
  rectConfig(_) {
    return arguments.length ? (this._rectConfig = Object.assign(this._rectConfig, _), this) : this._rectConfig;
  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the scale of the ColorScale and returns the current class instance. If *value* is not specified, returns the current scale value.
      @param {String} [*value* = "linear"] Can either be "linear", "jenks", or "buckets".
      @chainable
  */
  scale(_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  }

  /**
      @memberof ColorScale
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  select(_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  }

  /**
      @memberof ColorScale
      @desc The height of horizontal color scales, and width when positioned vertical.
      @param {Number} [*value* = 10]
      @chainable
  */
  size(_) {
    return arguments.length ? (this._size = _, this) : this._size;
  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the value accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current value accessor.
      @param {Function|String} [*value*]
      @chainable
      @example
function value(d) {
  return d.value;
}
  */
  value(_) {
    return arguments.length ? (this._value = typeof _ === "function" ? _ : constant(_), this) : this._value;
  }

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the overall width of the ColorScale and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
      @chainable
  */
  width(_) {
    return arguments.length ? (this._width = _, this) : this._width;
  }

}
