import {constant} from "d3plus-common";
import {max} from "d3-array";
import * as scales from "d3-scale";
import {TextBox, textWidth, textWrap} from "d3plus-text";

import {default as BaseLegend} from "./BaseLegend";

/**
    @class ScaleLegend
    @extends BaseLegend
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
export default class ScaleLegend extends BaseLegend {

  constructor() {

    super();

    this._align = "middle";
    this._domain = [0, 10];
    this.orient("bottom");
    this._scale = "linear";
    this._strokeWidth = 1;
    this._textBoxConfig = {
      fontFamily: new TextBox().fontFamily(),
      fontResize: false,
      fontSize: constant(10)
    };
    this._tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
    this._tickSize = 5;

  }

  /**
      @memberof ScaleLegend
      @desc Sets positioning for the axis bar.
      @param {D3Selection} *bar*
      @private
  */
  _barPosition(bar) {
    const {height, x, y} = this._position;
    const position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] : this._outerBounds[y];
    bar
      .attr(`${x}1`, this._d3Scale(this._d3Scale.domain()[0]))
      .attr(`${x}2`, this._d3Scale(this._d3Scale.domain()[1]))
      .attr(`${y}1`, position)
      .attr(`${y}2`, position);
  }

  /**
      @memberof ScaleLegend
      @desc Sets positioning for the clip rectangle.
      @param {D3Selection} *click*
      @private
  */
  _clipPosition(clip) {
    const {width, height, x, y} = this._position;
    const d = this._d3Scale.domain(),
          p = this._strokeWidth,
          s = this._d3Scale(d[1]) - this._d3Scale(d[0]);
    const position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - this._tickSize : this._outerBounds[y];
    clip
      .attr(x, this._d3Scale(this._d3Scale.domain()[0]) - p)
      .attr(y, position)
      .attr(width, s + p * 2)
      .attr(height, this._tickSize + p);
  }

  /**
      @memberof ScaleLegend
      @desc Sets positioning for the axis ticks.
      @param {D3Selection} *ticks*
      @private
  */
  _tickPosition(ticks, last = false) {
    const {height, x, y} = this._position;
    const position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] : this._outerBounds[y],
          scale = last ? this._lastScale || this._d3Scale : this._d3Scale,
          size = ["top", "left"].includes(this._orient) ? -this._tickSize : this._tickSize;
    ticks
      .attr("stroke-width", this._strokeWidth)
      .attr(`${x}1`, d => scale(d.id))
      .attr(`${x}2`, d => scale(d.id))
      .attr(`${y}1`, position)
      .attr(`${y}2`, last ? position : position + size);
  }

  /**
      @memberof ScaleLegend
      @desc Renders the current ScaleLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  render(callback) {

    super.render(callback);

    if (this._lineHeight === void 0) this._lineHeight = (d, i) => this._textBoxConfig.fontSize(d, i) * 1.1;

    const {width, height, x, y} = this._position;

    const clipId = `d3plus-ShapeLegend-clip-${this._uuid}`,
          p = this._padding;

    const range = this._range ? this._range.slice() : [undefined, undefined];
    if (range[0] === void 0) range[0] = p;
    if (range[1] === void 0) range[1] = this[`_${width}`] - p;
    let size = range[1] - range[0];

    this._titleHeight = 0;
    if (this._title) {
      const lH = this._titleConfig.lineHeight ? this._titleConfig.lineHeight : this._titleConfig.fontSize * 1.1,
            titleWrap = textWrap()
              .fontFamily(this._titleConfig.fontFamily)
              .fontSize(this._titleConfig.fontSize)
              .lineHeight(lH)
              .width(size)
              .height(this._height - this._tickSize - p)
              (this._title);
      this._titleHeight = titleWrap.lines.length * lH + p;
    }

    this._d3Scale = scales[`scale${this._scale.charAt(0).toUpperCase()}${this._scale.slice(1)}`]()
      .domain(this._domain)
      .rangeRound(range);

    let ticks = this._ticks || this._d3Scale.ticks(Math.floor(size / this._tickScale(size)));
    const tickFormat = this._d3Scale.tickFormat(ticks.length - 1);
    if (!this._ticks) ticks = ticks.map(tickFormat).map(Number);
    const values = this._tickLabels || ticks;

    let space = 0;
    if (values.length > 1) {
      for (let i = 0; i < values.length; i++) {
        const s = this._d3Scale(values[i + 1]) - this._d3Scale(values[i]);
        if (s > space) space = s;
      }
    }
    else space = size;

    const textData = values.map((d, i) => {

      const f = this._textBoxConfig.fontFamily(d, i),
            s = this._textBoxConfig.fontSize(d, i);

      const lh = this._textBoxConfig.lineHeight ? this._textBoxConfig.lineHeight(d, i) : s * 1.1;

      const res = textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(space)
        .height(this._height - this._tickSize - p)
        (d);

      res.lines = res.lines.filter(d => d !== "");
      res.d = d;
      res.fS = s;
      res.width = Math.ceil(max(res.lines.map(t => textWidth(t, {"font-family": f, "font-size": s}))));
      res.height = Math.ceil(res.lines.length * (lh + 1));
      if (res.width % 2) res.width++;

      return res;

    });

    const rangeInit = range.slice();
    if (textData.length) {

      const first = textData[0],
            last = textData[textData.length - 1];

      const firstB = this._d3Scale(first.d) - first[width] / 2 - p;
      if (firstB < range[0]) {
        const d = range[0] - firstB;
        if (this._range === void 0 || this._range[0] === void 0) {
          size -= d;
          range[0] += d;
        }
        else if (this._range) {
          rangeInit[0] -= d;
        }
      }

      const lastB = this._d3Scale(last.d) + last[width] / 2 + p;
      if (lastB > range[1]) {
        const d = lastB - range[1];
        if (this._range === void 0 || this._range[1] === void 0) {
          size -= d;
          range[1] -= d;
        }
        else if (this._range) {
          rangeInit[1] += d;
        }
      }

      this._d3Scale.rangeRound(range);

    }

    const tPad = textData.length ? p * 2 : 0;
    this._outerBounds = {
      [height]: this._titleHeight + this._tickSize + (max(textData, t => t[height]) || 0) + tPad,
      [width]: rangeInit[1] - rangeInit[0],
      [x]: rangeInit[0]
    };
    this._outerBounds[y] = this._align === "start" ? this._padding
                         : this._align === "end" ? this[`_${height}`] - this._outerBounds[height]
                         : this[`_${height}`] / 2 - this._outerBounds[height] / 2;

    let group = this._select.selectAll(`g#d3plus-ScaleLegend-${clipId}`)
      .data([0]);

    group = group.enter().append("g")
        .attr("id", `d3plus-ScaleLegend-${clipId}`)
      .merge(group);

    let defs = group.selectAll("defs").data([null]);
    defs = defs.enter().append("defs").merge(defs);

    let clip = defs.selectAll(`clipPath#${clipId}`).data([null]);
    clip = clip.enter().append("clipPath")
        .attr("id", clipId)
      .merge(clip);

    const axisClip = clip.selectAll("rect").data([null]);
    axisClip.enter().append("rect")
      .call(this._clipPosition.bind(this))
      .merge(axisClip).transition(this._transition)
        .call(this._clipPosition.bind(this));

    const bar = group.selectAll("line.bar").data([null]);

    bar.enter().append("line")
        .attr("class", "bar")
        .attr("stroke", "#000")
        .attr("opacity", 0)
        .call(this._barPosition.bind(this))
      .merge(bar).transition(this._transition)
        .attr("opacity", 1)
        .call(this._barPosition.bind(this));

    const lines = group.selectAll("line.tick").data(ticks.map(d => ({id: d})), d => d.id);

    lines.exit().transition(this._transition)
      .attr("opacity", 0)
      .call(this._tickPosition.bind(this))
      .remove();

    lines.enter().append("line")
        .attr("class", "tick")
        .attr("stroke", "#000")
        .attr("opacity", 0)
        .attr("clip-path", `url(#${clipId})`)
        .call(this._tickPosition.bind(this), true)
      .merge(lines).transition(this._transition)
        .attr("opacity", 1)
        .call(this._tickPosition.bind(this));

    const maxTextHeight = max(textData, t => t.height) || 0,
          maxTextWidth = max(textData, t => t.width + t.fS) || 0;

    let titleGroup = group.selectAll("g.d3plus-scaleLegend-title").data([null]);
    titleGroup = titleGroup.enter().append("g").attr("class", "d3plus-scaleLegend-title").merge(titleGroup);

    new TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .height(this._outerBounds.height)
      .rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0)
      .select(titleGroup.node())
      .text(d => d.text)
      .textAnchor("middle")
      .verticalAlign(this._orient === "bottom" ? "bottom" : "top")
      .width(this._outerBounds[width])
      .x(["top", "bottom"].includes(this._orient) ? this._outerBounds.x : this._orient === "left" ? this._outerBounds.x + this._titleHeight / 2 - this._outerBounds[width] / 2 : this._outerBounds.x + this._outerBounds.width - this._titleHeight / 2 - this._outerBounds[width] / 2)
      .y(["top", "bottom"].includes(this._orient) ? this._outerBounds.y : this._outerBounds.y - this._titleHeight / 2 + this._outerBounds[width] / 2)
      .config(this._titleConfig)
      .render();

    let tickGroup = group.selectAll("g.d3plus-scaleLegend-ticks").data([null]);
    tickGroup = tickGroup.enter().append("g").attr("class", "d3plus-scaleLegend-ticks").merge(tickGroup);

    new TextBox()
      .data(values.filter((d, i) => textData[i].lines.length).map(d => ({id: d})))
      .duration(this._duration)
      .height(maxTextHeight)
      .select(tickGroup.node())
      .text(d => tickFormat(d.id))
      .textAnchor(this._orient === "left" ? "end" : this._orient === "right" ? "start" : "middle")
      .verticalAlign(this._orient === "bottom" ? "top" : this._orient === "top" ? "bottom" : "middle")
      .width(maxTextWidth)
      .x((d, i) => {
        if (["top", "bottom"].includes(this._orient)) return this._d3Scale(d.id) - maxTextWidth / 2;
        return this._orient === "left" ? this._titleHeight + this._outerBounds.x - this._textBoxConfig.fontSize(values[i], i) / 2 : this._outerBounds.x + this._tickSize + this._padding;
      })
      .y(d => {
        if (["left", "right"].includes(this._orient)) return this._d3Scale(d.id) - maxTextHeight / 2;
        return this._orient === "bottom" ? this._outerBounds.y + this._tickSize + p : this._titleHeight + this._outerBounds.y;
      })
      .config(this._textBoxConfig)
      .render();

    this._lastScale = this._d3Scale;

    return this;

  }

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  align(_) {
    return arguments.length ? (this._align = _, this) : this._align;
  }

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the scale domain of the legend and returns the current class instance. If *value* is not specified, returns the current scale domain.
      @param {Array} [*value* = [0, 10]]
  */
  domain(_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  }

  /**
      @memberof ScaleLegend
      @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
  */
  orient(_) {
    if (arguments.length) {
      const horizontal = ["top", "bottom"].includes(_);
      this._position = {
        width: horizontal ? "width" : "height",
        height: horizontal ? "height" : "width",
        x: horizontal ? "x" : "y",
        y: horizontal ? "y" : "x"
      };
      return this._orient = _, this;
    }
    return this._orient;
  }

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the scale range (in pixels) of the legend and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.
      @param {Array} [*value*]
  */
  range(_) {
    return arguments.length ? (this._range = _, this) : this._range;
  }

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the scale of the legend and returns the current class instance. If *value* is not specified, returns the current this._d3Scale
      @param {String} [*value* = "linear"]
  */
  scale(_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  }

  /**
      @memberof ShapeLegend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  textBoxConfig(_) {
    return arguments.length ? (this._textBoxConfig = Object.assign(this._textBoxConfig, _), this) : this._textBoxConfig;
  }

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the visible tick labels of the legend and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.
      @param {Array} [*value*]
  */
  tickLabels(_) {
    return arguments.length ? (this._tickLabels = _, this) : this._tickLabels;
  }

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the tick values of the legend and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#ScaleLegend.domain) and the available [width](#ScaleLegend.width).
      @param {Array} [*value*]
  */
  ticks(_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  }

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the tick size of the legend and returns the current class instance. If *value* is not specified, returns the current tick size.
      @param {Number} [*value* = 5]
  */
  tickSize(_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  }

}
