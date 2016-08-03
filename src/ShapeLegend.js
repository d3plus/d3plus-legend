import {accessor, constant} from "d3plus-common";
import {max, sum} from "d3-array";
import {nest} from "d3-collection";
import {select as d3Select} from "d3-selection";
import * as d3plus from "d3plus-shape";
import {textWidth as measureText, textWrap as wrap} from "d3plus-text";

/**
    @class ShapeLegend
    @desc Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
    @param {Array} [data = []]
    @example <caption>a sample dataset</caption>
var data = [
  {"id": 0, "color": "brickred"},
  {"id": 1, "color": "cornflowerblue"}
];
@example <caption>passed to the generator</caption>
new ShapeLegend()
  .data([data])
  .render();
@example <caption>creates the following</caption>
<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
</g>
@example <caption>this is shorthand for the following</caption>
shape().data([data])();
@example <caption>which also allows a post-draw callback function</caption>
shape().data([data])(function() { alert("draw complete!"); })
*/
export default class ShapeLegend {

  constructor() {

    const s = new d3plus.Shape();

    this._align = "center";
    this._height = 100;
    this._id = accessor("id");
    this._label = accessor("id");
    this._lineData = [];
    this._orient = "horizontal";
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._shape = constant("Rect");
    this._shapeConfig = {
      duration: s.duration(),
      fill: accessor("color"),
      fontColor: constant("#444"),
      fontFamily: s.fontFamily(),
      fontSize: constant(10),
      height: constant(10),
      labelBounds: (s, i) => {
        const d = this._lineData[i],
              w = s.r !== void 0 ? s.r : s.width / 2;
        return {width: d.width, height: d.height, x: w + this._padding, y: 1 - d.height / 2};
      },
      opacity: 1,
      r: constant(5),
      width: constant(10),
      x: (d, i) => {
        const s = this._shapeConfig.width;
        if (this._orient === "vertical") return this._outerBounds.x + s(d, i) / 2;
        else {
          return this._outerBounds.x + sum(this._data.slice(0, i).map((b, i) => s(b, i))) +
                 sum(this._lineData.slice(0, i).map(l => l.width - this._shapeConfig.fontSize(d, i))) +
                 s(d, i) / 2 + this._padding * 3 * i;
        }
      },
      y: (d, i) => {
        const s = this._shapeConfig.height;
        if (this._orient === "horizontal") return this._outerBounds.y + max(this._lineData.map(l => l.height).concat(this._data.map((l, x) => s(l, x)))) / 2;
        else {
          const h = s(d, i);
          const pad = this._lineData[i].height > h ? this._lineData[i].height / 2 : h / 2,
                prev = sum(this._lineData.slice(0, i), (l, x) => max([l.height, s(l.data, x)]));
          return this._outerBounds.y + prev + pad + this._padding * i;
        }
      }
    };
    this._verticalAlign = "middle";
    this._width = 400;

  }

  /**
      @memberof ShapeLegend
      @desc Renders the current ShapeLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  render(callback) {

    if (this._select === void 0) this.select(d3Select("body").append("svg").attr("width", `${window.innerWidth}px`).attr("height", `${window.innerHeight}px`).node());
    if (this._lineHeight === void 0) this._lineHeight = (d, i) => this._shapeConfig.fontSize(d, i) * 1.1;

    // Calculate Text Sizes
    this._lineData = this._data.map((d, i) => {
      const f = this._shapeConfig.fontFamily(d, i),
            lh = this._lineHeight(d, i),
            s = this._shapeConfig.fontSize(d, i);
      const h = this._orient === "horizontal" ? this._height - (this._data.length + 1) * this._padding : this._height,
            w = this._orient === "vertical" ? this._width - this._padding * 3 - this._shapeConfig.width(d, i) : this._width;
      const res = wrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(this._label(d, i));
      res.width = Math.ceil(max(res.lines.map(t => measureText(t, {"font-family": f, "font-size": s})))) + s;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      res.og = {height: res.height, width: res.width};
      res.data = d;
      res.f = f;
      res.s = s;
      res.lh = lh;
      return res;
    });

    let availableSpace, textSpace, visibleLabels = true;

    if (this._orient === "horizontal") {
      availableSpace = this._width - sum(this._data.map((d, i) => this._shapeConfig.width(d, i) + this._padding * 3)) - this._padding * 2;
      textSpace = sum(this._lineData.map((d, i) => d.width - this._shapeConfig.fontSize(d, i)));
      if (textSpace > availableSpace) {
        const wrappable = this._lineData
          .filter(d => d.words.length > 1)
          .sort((a, b) => b.sentence.length - a.sentence.length);

        if (wrappable.length && this._height > wrappable[0].height * 2) {

          let line = 2;
          while (line <= 5) {
            const labels = wrappable.filter(d => d.words.length >= line);
            if (!labels.length) break;
            for (let x = 0; x < wrappable.length; x++) {
              const label = wrappable[x];
              const h = label.og.height * line, w = label.og.width * (1.5 * (1 / line));
              const res = wrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
              if (!res.truncated) {
                textSpace -= label.width;
                label.width = Math.ceil(max(res.lines.map(t => measureText(t, {"font-family": label.f, "font-size": label.s})))) + label.s;
                label.height = res.lines.length * (label.lh + 1);
                textSpace += label.width;
                if (textSpace <= availableSpace) break;
              }
            }
            if (textSpace <= availableSpace) break;
            line++;

          }

        }
        else visibleLabels = false;
      }
    }
    else {
      availableSpace = this._width - max(this._data.map((d, i) => this._shapeConfig.width(d, i) + this._padding * 3)) - this._padding * 2;
      textSpace = max(this._lineData.map((d, i) => d.width - this._shapeConfig.fontSize(d, i)));
    }

    if (textSpace > availableSpace) visibleLabels = false;

    if (!visibleLabels) {
      textSpace = 0;
      for (let i = 0; i < this._lineData.length; i++) {
        this._lineData[i].width = 0;
        this._lineData[i].height = 0;
      }
    }

    const innerHeight = max(this._lineData, (d, i) => max([d.height, this._shapeConfig.height(d.data, i)])),
          innerWidth = this._orient === "horizontal"
                     ? textSpace + sum(this._data, (d, i) => this._shapeConfig.width(d, i)) + this._padding * (this._data.length * (visibleLabels ? 3 : 1) - 2)
                     : textSpace + max(this._data, (d, i) => this._shapeConfig.width(d, i)) + this._padding * 3;
    this._outerBounds.width = innerWidth;
    this._outerBounds.height = innerHeight;

    let xOffset = this._padding,
        yOffset = this._padding;
    if (this._align === "center") xOffset = (this._width - this._padding * 2 - innerWidth) / 2;
    else if (this._align === "right") xOffset = this._width - this._padding * 2 - innerWidth;
    if (this._verticalAlign === "middle") yOffset = (this._height - this._padding * 2 - innerHeight) / 2;
    else if (this._verticalAlign === "bottom") yOffset = this._height - this._padding * 2 - innerHeight;
    this._outerBounds.x = xOffset;
    this._outerBounds.y = yOffset;

    // Shape <g> Group
    let shapeGroup = this._select.selectAll("g.d3plus-legendShape")
      .data([0]);

    shapeGroup = shapeGroup.enter().append("g")
        .attr("class", "d3plus-legendShape")
      .merge(shapeGroup);

    // Legend Shapes
    nest().key(this._shape).entries(this._data).forEach(d => {

      new d3plus[d.key]()
        .data(d.values)
        .id(this._id)
        .lineHeight(this._lineHeight)
        .label(visibleLabels ? this._label : false)
        .labelPadding(0)
        .select(shapeGroup.node())
        .verticalAlign("top")
        .config(this._shapeConfig)
        .render();

    });

    if (callback) setTimeout(callback, this._shapeConfig.duration + 100);

    return this;

  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  align(_) {
    return arguments.length ? (this._align = _, this) : this._align;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
  */
  config(_) {
    if (arguments.length) {
      for (const k in _) if ({}.hasOwnProperty.call(_, k) && k in this) this[k](_[k]);
      return this;
    }
    else {
      const config = {};
      for (const k in this.prototype.constructor) if (k !== "config" && {}.hasOwnProperty.call(this, k)) config[k] = this[k]();
      return config;
    }
  }

  /**
      @memberof ShapeLegend
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  data(_) {
    return arguments.length ? (this._data = _, this) : this._data;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  height(_) {
    return arguments.length ? (this._height = _, this) : this._height;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
      @example
function value(d) {
  return d.id;
}
  */
  id(_) {
    return arguments.length ? (this._id = _, this) : this._id;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
  */
  label(_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : constant(_), this) : this._label;
  }

  /**
      @memberof ShapeLegend
      @desc If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "horizontal"] Supports `"horizontal"` and `"vertical"` orientations.
  */
  orient(_) {
    return arguments.length ? (this._orient = _, this) : this._orient;
  }

  /**
      @memberof ShapeLegend
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  outerBounds() {
    return this._outerBounds;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof ShapeLegend
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  select(_) {
    return arguments.length ? (this._select = d3Select(_), this) : this._select;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the shape accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value* = "Rect"]
  */
  shape(_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : constant(_), this) : this._shape;
  }

  /**
      @memberof ShapeLegend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns this generator. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  shapeConfig(_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the vertical alignment to the specified value and returns this generator. If *value* is not specified, returns the current vertical alignment.
      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
  */
  verticalAlign(_) {
    return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
  }

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
  */
  width(_) {
    return arguments.length ? (this._width = _, this) : this._width;
  }

}
