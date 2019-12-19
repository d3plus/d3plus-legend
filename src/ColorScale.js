/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

import ckmeans from "./ckmeans";
import Legend from "./Legend";

import {extent, merge, min, range} from "d3-array";
import {scaleLinear, scaleThreshold} from "d3-scale";
import {select} from "d3-selection";

import {Axis} from "d3plus-axis";
import {colorLighter} from "d3plus-color";
import {accessor, assign, BaseClass, constant, elem} from "d3plus-common";
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
      gridSize: 0,
      shapeConfig: {
        labelConfig: {
          fontColor: "#222"
        }
      },
      titleConfig: {
        fontSize: 12
      }
    };
    this._axisTest = new Axis();
    this._align = "middle";
    this._buckets = 5;
    this._bucketAxis = false;
    this._colorMax = "#0C8040";
    this._colorMid = "#f7f7f7";
    this._colorMin = "#b22200";
    this._data = [];
    this._duration = 600;
    this._height = 200;
    this._legendClass = new Legend();
    this._legendConfig = {
      shapeConfig: {
        labelConfig: {
          fontColor: "#222"
        },
        stroke: "#444",
        strokeWidth: 1
      }
    };
    this._midpoint = 0;
    this._orient = "bottom";
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._rectClass = new Rect();
    this._rectConfig = {
      stroke: "#444",
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
    const negative = domain[0] < this._midpoint;
    const positive = domain[1] > this._midpoint;
    const diverging = negative && positive;

    let colors = this._color, labels, ticks;

    if (colors && !(colors instanceof Array)) {
      colors = range(0, this._buckets, 1)
        .map(i => colorLighter(colors, (i + 1) / this._buckets))
        .reverse();
    }

    if (this._scale === "jenks") {

      const data = this._data
        .map(this._value)
        .filter(d => d !== null && typeof d === "number");

      const buckets = min([colors ? colors.length : this._buckets, data.length]);

      const jenks = ckmeans(data, buckets);

      ticks = merge(jenks.map((c, i) => i === jenks.length - 1 ? [c[0], c[c.length - 1]] : [c[0]]));

      const tickSet = new Set(ticks);

      if (ticks.length !== tickSet.size) {
        labels = Array.from(tickSet);
      }

      if (!colors) {
        if (diverging) {
          colors = [this._colorMin, this._colorMid, this._colorMax];
          const negatives = ticks
            .slice(0, buckets)
            .filter((d, i) => d < this._midpoint && ticks[i + 1] <= this._midpoint);
          const spanning = ticks
            .slice(0, buckets)
            .filter((d, i) => d <= this._midpoint && ticks[i + 1] > this._midpoint);
          const positives = ticks
            .slice(0, buckets)
            .filter((d, i) => d > this._midpoint && ticks[i + 1] > this._midpoint);
          const negativeColors = negatives.map((d, i) => !i ? colors[0] : colorLighter(colors[0], i / negatives.length));
          const spanningColors = spanning.map(() => colors[1]);
          const positiveColors = positives.map((d, i) => i === positives.length - 1 ? colors[2] : colorLighter(colors[2], 1 - (i + 1) / positives.length));
          colors = negativeColors.concat(spanningColors).concat(positiveColors);
        }
        else {
          colors = range(0, this._buckets, 1)
            .map(i => colorLighter(this._colorMax, i / this._buckets))
            .reverse();
        }
      }

      if (data.length <= buckets) {
        colors = colors.slice(buckets - data.length);
      }

      this._colorScale = scaleThreshold()
        .domain(ticks)
        .range(["black"].concat(colors).concat(colors[colors.length - 1]));

    }
    else {

      let buckets;
      if (diverging && !colors) {
        const half = Math.floor(this._buckets / 2);
        const negativeColors = range(0, half, 1).map(i => !i ? this._colorMin : colorLighter(this._colorMin, i / half));
        const spanningColors = (this._buckets % 2 ? [0] : []).map(() => this._colorMid);
        const positiveColors = range(0, half, 1).map(i => !i ? this._colorMax : colorLighter(this._colorMax, i / half)).reverse();
        colors = negativeColors.concat(spanningColors).concat(positiveColors);
        const step = (colors.length - 1) / 2;
        buckets = [domain[0], this._midpoint, domain[1]];
        buckets = range(domain[0], this._midpoint, -(domain[0] - this._midpoint) / step)
          .concat(range(this._midpoint, domain[1], (domain[1] - this._midpoint) / step))
          .concat([domain[1]]);
      }
      else {
        if (!colors) {
          if (this._scale === "buckets") {
            colors = range(0, this._buckets, 1)
              .map(i => colorLighter(negative ? this._colorMin : this._colorMax, i / this._buckets));
            if (positive) colors = colors.reverse();
          }
          else {
            colors = negative ? [this._colorMin, colorLighter(this._colorMin, 0.8)]
              : [colorLighter(this._colorMax, 0.8), this._colorMax];
          }
        }
        const step = (domain[1] - domain[0]) / (colors.length - 1);
        buckets = range(domain[0], domain[1] + step / 2, step);
      }

      if (this._scale === "buckets") {
        ticks = buckets.concat([buckets[buckets.length - 1]]);
      }

      if (this._scale === "log") {
        const negativeBuckets = buckets.filter(d => d < 0);
        if (negativeBuckets.length) {
          const minVal = negativeBuckets[0];
          const newNegativeBuckets = negativeBuckets.map(d => -Math.pow(Math.abs(minVal), d / minVal));
          negativeBuckets.forEach((bucket, i) => {
            buckets[buckets.indexOf(bucket)] = newNegativeBuckets[i];
          });
        }
        const positiveBuckets = buckets.filter(d => d > 0);
        if (positiveBuckets.length) {
          const maxVal = positiveBuckets[positiveBuckets.length - 1];
          const newPositiveBuckets = positiveBuckets.map(d => Math.pow(maxVal, d / maxVal));
          positiveBuckets.forEach((bucket, i) => {
            buckets[buckets.indexOf(bucket)] = newPositiveBuckets[i];
          });
        }
        if (buckets.includes(0)) buckets[buckets.indexOf(0)] = 1;
      }

      this._colorScale = scaleLinear()
        .domain(buckets)
        .range(colors);

    }

    if (this._bucketAxis || !["buckets", "jenks"].includes(this._scale)) {

      const axisConfig = assign({
        domain: horizontal ? domain : domain.reverse(),
        duration: this._duration,
        height: this._height,
        labels: labels || ticks,
        orient: this._orient,
        padding: this._padding,
        scale: this._scale === "log" ? "log" : "linear",
        ticks,
        width: this._width
      }, this._axisConfig);

      this._axisTest
        .select(elem("g.d3plus-ColorScale-axisTest", {enter: {opacity: 0}, parent: this._group}).node())
        .config(axisConfig)
        .duration(0)
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

      const axisScale = this._axisTest._getPosition.bind(this._axisTest);
      const scaleRange = this._axisTest._getRange();

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

      const scaleDomain = this._colorScale.domain();
      const offsetScale = scaleLinear()
        .domain(scaleRange)
        .range([0, 100]);

      stops.enter().append("stop").merge(stops)
        .attr("offset", (d, i) => `${offsetScale(axisScale(scaleDomain[i]))}%`)
        .attr("stop-color", String);

      /** determines the width of buckets */
      const bucketWidth = (d, i) => {
        const w = Math.abs(axisScale(ticks[i + 1]) - axisScale(d));
        return w || 2;
      };

      this._rectClass
        .data(ticks ? ticks.slice(0, ticks.length - 1) : [0])
        .id((d, i) => i)
        .select(elem("g.d3plus-ColorScale-Rect", {parent: this._group}).node())
        .config({
          duration: this._duration,
          fill: ticks ? d => this._colorScale(d) : `url(#gradient-${this._uuid})`,
          [x]: ticks ? (d, i) => axisScale(d) + bucketWidth(d, i) / 2 - (["left", "right"].includes(this._orient) ? bucketWidth(d, i) : 0) : scaleRange[0] + (scaleRange[1] - scaleRange[0]) / 2,
          [y]: this._outerBounds[y] + (["top", "left"].includes(this._orient) ? axisBounds[height] : 0) + this._size / 2,
          [width]: ticks ? bucketWidth : scaleRange[1] - scaleRange[0],
          [height]: this._size
        })
        .config(this._rectConfig)
        .render();
    }
    else {

      const format = this._axisConfig.tickFormat
        ? this._axisConfig.tickFormat : d => d;

      const data = ticks.reduce((arr, tick, i) => {
        if (i !== ticks.length - 1) {
          const next = ticks[i + 1];
          arr.push({
            color: colors[i],
            id: tick === next ? `${format(tick)}+` : `${format(tick)} - ${format(next)}`
          });
        }
        return arr;
      }, []);

      const legendConfig = assign({
        align: horizontal ? "center" : {start: "left", middle: "center", end: "right"}[this._align],
        direction: horizontal ? "row" : "column",
        duration: this._duration,
        height: this._height,
        padding: this._padding,
        shapeConfig: assign({
          duration: this._duration
        }, this._axisConfig.shapeConfig || {}),
        title: this._axisConfig.title,
        titleConfig: this._axisConfig.titleConfig || {},
        width: this._width,
        verticalAlign: horizontal ? {start: "top", middle: "middle", end: "bottom"}[this._align] : "middle"
      }, this._legendConfig);

      this._legendClass
        .data(data)
        .select(elem("g.d3plus-ColorScale-legend", {
          parent: this._group
        }).node())
        .config(legendConfig)
        .render();

      this._outerBounds = this._legendClass.outerBounds();

    }

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  }

  /**
      @memberof ColorScale
      @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
      @param {Object} [*value*]
      @chainable
  */
  axisConfig(_) {
    return arguments.length ? (this._axisConfig = assign(this._axisConfig, _), this) : this._axisConfig;
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
      @desc The number of discrete buckets to create in a bucketed color scale. Will be overridden by any custom Array of colors passed to the `color` method.
      @param {Number} [*value* = 5]
      @chainable
  */
  buckets(_) {
    return arguments.length ? (this._buckets = _, this) : this._buckets;
  }

  /**
      @memberof ColorScale
      @desc Determines whether or not to use an Axis to display bucket scales (both "buckets" and "jenks"). When set to `false`, bucketed scales will use the `Legend` class to display squares for each range of data. When set to `true`, bucketed scales will be displayed on an `Axis`, similar to "linear" scales.
      @param {Boolean} [*value* = false]
      @chainable
  */
  bucketAxis(_) {
    return arguments.length ? (this._bucketAxis = _, this) : this._bucketAxis;
  }

  /**
      @memberof ColorScale
      @desc Overrides the default internal logic of `colorMin`, `colorMid`, and `colorMax` to only use just this specified color. If a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.
      @param {String|Array} [*value*]
      @chainable
  */
  color(_) {
    return arguments.length ? (this._color = _, this) : this._color;
  }

  /**
      @memberof ColorScale
      @desc Defines the color to be used for numbers greater than the value of the `midpoint` on the scale (defaults to `0`). Colors in between this value and the value of `colorMid` will be interpolated, unless a custom Array of colors has been specified using the `color` method.
      @param {String} [*value* = "#0C8040"]
      @chainable
  */
  colorMax(_) {
    return arguments.length ? (this._colorMax = _, this) : this._colorMax;
  }

  /**
      @memberof ColorScale
      @desc Defines the color to be used for the midpoint of a diverging scale, based on the current value of the `midpoint` method (defaults to `0`). Colors in between this value and the values of `colorMin` and `colorMax` will be interpolated, unless a custom Array of colors has been specified using the `color` method.
      @param {String} [*value* = "#f7f7f7"]
      @chainable
  */
  colorMid(_) {
    return arguments.length ? (this._colorMid = _, this) : this._colorMid;
  }

  /**
      @memberof ColorScale
      @desc Defines the color to be used for numbers less than the value of the `midpoint` on the scale (defaults to `0`). Colors in between this value and the value of `colorMid` will be interpolated, unless a custom Array of colors has been specified using the `color` method.
      @param {String} [*value* = "#b22200"]
      @chainable
  */
  colorMin(_) {
    return arguments.length ? (this._colorMin = _, this) : this._colorMin;
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
      @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
      @param {Object} [*value*]
      @chainable
  */
  legendConfig(_) {
    return arguments.length ? (this._legendConfig = assign(this._legendConfig, _), this) : this._legendConfig;
  }

  /**
      @memberof ColorScale
      @desc The number value to be used as the anchor for `colorMid`, and defines the center point of the diverging color scale.
      @param {Number} [*value* = 0]
      @chainable
  */
  midpoint(_) {
    return arguments.length ? (this._midpoint = _, this) : this._midpoint;
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
      @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Rect](http://d3plus.org/docs/#Rect). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
      @param {Object} [*value*]
      @chainable
  */
  rectConfig(_) {
    return arguments.length ? (this._rectConfig = assign(this._rectConfig, _), this) : this._rectConfig;
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
