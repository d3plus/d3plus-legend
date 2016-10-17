import {max, sum} from "d3-array";
import {nest} from "d3-collection";
import {select} from "d3-selection";

import {accessor, BaseClass, constant, elem} from "d3plus-common";
import * as d3plus from "d3plus-shape";
import {TextBox, textWidth, textWrap} from "d3plus-text";

/**
    @class Legend
    @extends BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
export default class Legend extends BaseClass {

  /**
      @memberof Legend
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();

    const s = new d3plus.Shape();

    this._align = "center";
    this._data = [];
    this._duration = 600;
    this._height = 200;
    this._id = accessor("id");
    this._label = accessor("id");
    this._lineData = [];
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._shape = constant("Rect");
    this._shapeConfig = {
      duration: this._duration,
      fill: accessor("color"),
      fontColor: constant("#444"),
      fontFamily: s.fontFamily(),
      fontResize: false,
      fontSize: constant(10),
      height: constant(10),
      hitArea: dd => {
        const d = this._lineData[this._data.indexOf(dd)],
              h = max([d.height, d.shapeHeight]);
        return {width: d.width + d.shapeWidth + (d.width ? this._padding : 0), height: h, x: -d.shapeWidth / 2, y: -h / 2};
      },
      labelBounds: (dd, i, s) => {
        const d = this._lineData[dd.i],
              w = s.r !== void 0 ? s.r : s.width / 2;
        return {width: d.width, height: d.height, x: w + this._padding, y: -d.height / 2};
      },
      opacity: 1,
      r: constant(5),
      width: constant(10),
      x: (d, i) => {
        const s = this._shapeConfig.width;
        const y = this._lineData[i].y;
        const pad = this._align === "left" ? 0 : this._align === "center"
                  ? (this._outerBounds.width - this._rowWidth(this._lineData.filter(l => y === l.y))) / 2
                  : this._outerBounds.width - this._rowWidth(this._lineData.filter(l => y === l.y));
        return this._rowWidth(this._lineData.slice(0, i).filter(l => y === l.y)) + this._padding +
               this._outerBounds.x + s(d, i) / 2 + pad;
      },
      y: (d, i) => {
        const s = this._shapeConfig.height;
        const ld = this._lineData[i];
        return ld.y + this._titleHeight + this._outerBounds.y +
               max(this._lineData.filter(l => ld.y === l.y).map(l => l.height).concat(this._data.map((l, x) => s(l, x)))) / 2;
      }
    };
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13
    };
    this._verticalAlign = "middle";
    this._width = 400;

  }

  _rowHeight(row) {
    return max(row.map(d => d.height).concat(row.map(d => d.shapeHeight))) + this._padding;
  }

  _rowWidth(row) {
    return sum(row.map(d => d.shapeWidth + d.width + this._padding * (d.width ? 2 : 1))) - this._padding;
  }

  /**
      @memberof Legend
      @desc Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  render(callback) {

    if (this._select === void 0) this.select(select("body").append("svg").attr("width", `${this._width}px`).attr("height", `${this._height}px`).node());
    if (this._lineHeight === void 0) this._lineHeight = (d, i) => this._shapeConfig.fontSize(d, i) * 1.1;

    // Shape <g> Group
    this._group = elem("g.d3plus-Legend", {parent: this._select});

    let availableHeight = this._height;
    this._titleHeight = 0;
    if (this._title) {
      const f = this._titleConfig.fontFamily,
            lH = this._titleConfig.lineHeight,
            s = this._titleConfig.fontSize;
      const res = textWrap().fontFamily(f).fontSize(s).lineHeight(lH).width(this._width).height(this._height)(this._title);
      this._titleHeight = lH + res.lines.length + this._padding;
      availableHeight -= this._titleHeight;
    }

    // Calculate Text Sizes
    this._lineData = this._data.map((d, i) => {
      const shapeWidth = this._shapeConfig.width(d, i);
      const f = this._shapeConfig.fontFamily(d, i),
            lh = this._lineHeight(d, i),
            s = this._shapeConfig.fontSize(d, i);
      const h = availableHeight - (this._data.length + 1) * this._padding,
            w = this._width;
      const res = textWrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(this._label(d, i));
      res.width = Math.ceil(max(res.lines.map(t => textWidth(t, {"font-family": f, "font-size": s})))) + s;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      res.og = {height: res.height, width: res.width};
      res.data = d;
      res.f = f;
      res.s = s;
      res.lh = lh;
      res.y = 0;
      res.id = this._id(d, i);
      res.i = i;
      res.shapeWidth = shapeWidth;
      res.shapeHeight = this._shapeConfig.height(d, i);
      return res;
    });

    let spaceNeeded;
    const availableWidth = this._width - this._padding * 2;
    spaceNeeded = sum(this._lineData.map(d => d.shapeWidth + this._padding * 2 + d.width)) - this._padding;

    if (spaceNeeded > availableWidth) {
      let lines = 1, newRows = [];

      const maxLines = max(this._lineData.map(d => d.words.length));
      this._wrapLines = function() {

        lines++;

        if (lines > maxLines) return;

        const wrappable = lines === 1 ? this._lineData.slice()
                        : this._lineData.filter(d => d.width + d.shapeWidth + this._padding * (d.width ? 2 : 1) > availableWidth && d.words.length >= lines)
                            .sort((a, b) => b.sentence.length - a.sentence.length);

        if (wrappable.length && availableHeight > wrappable[0].height * lines) {

          let truncated = false;
          for (let x = 0; x < wrappable.length; x++) {
            const label = wrappable[x];
            const h = label.og.height * lines, w = label.og.width * (1.5 * (1 / lines));
            const res = textWrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
            if (!res.truncated) {
              label.width = Math.ceil(max(res.lines.map(t => textWidth(t, {"font-family": label.f, "font-size": label.s})))) + label.s;
              label.height = res.lines.length * (label.lh + 1);
            }
            else {
              truncated = true;
              break;
            }
          }
          if (!truncated) this._wrapRows();
        }
        else {
          newRows = [];
          return;
        }

      };

      this._wrapRows = function() {
        newRows = [];
        let row = 1, rowWidth = 0;
        for (let i = 0; i < this._lineData.length; i++) {
          const d = this._lineData[i],
                w = d.width + this._padding * (d.width ? 2 : 1) + d.shapeWidth;
          if (sum(newRows.map(row => max(row, d => max([d.height, d.shapeHeight])))) > availableHeight) {
            newRows = [];
            break;
          }
          if (rowWidth + w < availableWidth) {
            rowWidth += w;
          }
          else if (w > availableWidth) {
            newRows = [];
            this._wrapLines();
            break;
          }
          else {
            rowWidth = w;
            row++;
          }
          if (!newRows[row - 1]) newRows[row - 1] = [];
          newRows[row - 1].push(d);
        }
      };

      this._wrapRows();

      if (!newRows.length || sum(newRows, this._rowHeight.bind(this)) + this._padding > availableHeight) {
        spaceNeeded = sum(this._lineData.map(d => d.shapeWidth + this._padding * 1)) - this._padding;
        for (let i = 0; i < this._lineData.length; i++) {
          this._lineData[i].width = 0;
          this._lineData[i].height = 0;
        }
        this._wrapRows();
      }

      if (newRows.length && sum(newRows, this._rowHeight.bind(this)) + this._padding < availableHeight) {
        newRows.forEach((row, i) => {
          row.forEach(d => {
            if (i) {
              d.y = sum(newRows.slice(0, i), this._rowHeight.bind(this));
            }
          });
        });
        spaceNeeded = max(newRows, l => sum(l, d => d.shapeWidth + this._padding * (d.width ? 2 : 1) + d.width)) - this._padding;
      }
    }

    const innerHeight = max(this._lineData, (d, i) => max([d.height, this._shapeConfig.height(d.data, i)]) + d.y) + this._titleHeight,
          innerWidth = spaceNeeded;

    this._outerBounds.width = innerWidth;
    this._outerBounds.height = innerHeight;

    let xOffset = this._padding,
        yOffset = this._padding;
    if (this._align === "center") xOffset = (this._width - innerWidth) / 2;
    else if (this._align === "right") xOffset = this._width - this._padding - innerWidth;
    if (this._verticalAlign === "middle") yOffset = (this._height - innerHeight) / 2;
    else if (this._verticalAlign === "bottom") yOffset = this._height - this._padding - innerHeight;
    this._outerBounds.x = xOffset;
    this._outerBounds.y = yOffset;

    new TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .select(this._group.node())
      .textAnchor({left: "start", center: "middle", right: "end"}[this._align])
      .width(this._width - this._padding * 2)
      .x(this._padding)
      .y(this._outerBounds.y)
      .config(this._titleConfig)
      .render();

    this._shapes = [];
    const baseConfig = this._shapeConfig,
          config = {
            id: d => d.id,
            label: d => d.label,
            lineHeight: d => d.lH
          };

    const data = this._data.map((d, i) => {

      const obj = {
        data: d, i,
        id: this._id(d, i),
        label: this._lineData[i].width ? this._label(d, i) : false,
        lH: this._lineHeight(d, i),
        shape: this._shape(d, i)
      };

      for (const k in baseConfig) {
        if (k !== "labelBounds" && {}.hasOwnProperty.call(baseConfig, k)) {
          if (typeof baseConfig[k] === "function") {
            obj[k] = baseConfig[k](d, i);
            config[k] = d => d[k];
          }
          else if (k === "on") {
            config[k] = {};
            for (const t in baseConfig[k]) {
              if ({}.hasOwnProperty.call(baseConfig[k], t)) {
                config[k][t] = function(d) {
                  if (!baseConfig[k][t]) return;
                  baseConfig[k][t].bind(this)(d.data, d.i);
                };
              }
            }
          }
        }
      }

      return obj;

    });

    // Legend Shapes
    nest().key(d => d.shape).entries(data).forEach(d => {

      new d3plus[d.key]()
        .data(d.values)
        .duration(this._duration)
        .labelPadding(0)
        .select(this._group.node())
        .verticalAlign("top")
        .config(Object.assign({}, baseConfig, config))
        .render();

    });

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  align(_) {
    return arguments.length ? (this._align = _, this) : this._align;
  }

  /**
      @memberof Legend
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  data(_) {
    return arguments.length ? (this._data = _, this) : this._data;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
  */
  duration(_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  height(_) {
    return arguments.length ? (this._height = _, this) : this._height;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
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
      @memberof Legend
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
  */
  label(_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : constant(_), this) : this._label;
  }

  /**
      @memberof Legend
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  outerBounds() {
    return this._outerBounds;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  padding(_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  }

  /**
      @memberof Legend
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  select(_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value* = "Rect"]
  */
  shape(_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : constant(_), this) : this._shape;
  }

  /**
      @memberof Legend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  shapeConfig(_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
  */
  title(_) {
    return arguments.length ? (this._title = _, this) : this._title;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
  */
  titleConfig(_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.
      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
  */
  verticalAlign(_) {
    return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
  }

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
  */
  width(_) {
    return arguments.length ? (this._width = _, this) : this._width;
  }

}
