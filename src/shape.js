import {default as constant} from "./constant";
import {max, sum} from "d3-array";
import {select as d3Select} from "d3-selection";
import * as d3plusShape from "d3plus-shape";
import {split, width as measureText, wrap} from "d3plus-text";

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
    @desc Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
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
      The default y accessor function.
      @private
  */
  function shapeLabelBounds(s, i) {
    const d = lineData[i];
    return {"width": d.width, "height": d.height, "x": s.width / 2 + padding, "y": 1 - d.height / 2};
  }

  /**
      The default x accessor function.
      @private
  */
  function shapeX(d, i) {
    if (orient === "vertical") return xOffset + size(d, i) / 2;
    else return xOffset + sum(data.slice(0, i).map((b, i) => size(b, i))) +
                sum(lineData.slice(0, i).map((l) => l.width - fontSize(d, i))) +
                size(d, i) / 2 + padding * 3 * i;
  }

  /**
      The default y accessor function.
      @private
  */
  function shapeY(d, i) {
    if (orient === "horizontal") return yOffset + max(lineData.map((l) => l.height).concat(data.map((l, x) => size(l, x)))) / 2;
    else {
      const s = size(d, i);
      const pad = lineData[i].height > s ? lineData[i].height / 2 : s / 2,
            prev = sum(lineData.slice(0, i), (l, x) => max([l.height, size(l.data, x)]));
      return yOffset + prev + pad + padding * i;
    }
  }

  let align = "center",
      backgroundColor = "transparent",
      color = shapeColor,
      fontColor = constant("#444"),
      fontFamily = constant("sans-serif"),
      fontResize = constant(false),
      fontSize = constant(10),
      height = 100,
      id = shapeId,
      label = shapeId,
      labelBounds = shapeLabelBounds,
      lineData = [],
      lineHeight,
      orient = "horizontal",
      padding = 5,
      select,
      size = constant(10),
      verticalAlign = "middle",
      width = 400,
      x = shapeX,
      xOffset,
      y = shapeY,
      yOffset;

  /**
    The inner return object and draw function that gets assigned the public methods.
    @private
  */
  function shape(callback) {

    if (select === void 0) shape.select(d3Select("body").append("svg").attr("width", `${width}px`).attr("height", `${height}px`).node());
    if (lineHeight === void 0) lineHeight = (d, i) => fontSize(d, i) * 1.1;

    // Background Rectangle
    d3plusShape.rect()
      .data([{"id": "legend-background"}])
      .fill(backgroundColor)
      .height(height)
      .select(select.node())
      .width(width)
      .x(width / 2)
      .y(height / 2)
      ();

    // Calculate Text Sizes
    lineData = data.map((d, i) => {
      const f = fontFamily(d, i), lh = lineHeight(d, i), s = fontSize(d, i);
      const h = orient === "horizontal" ? height - (data.length + 1) * padding : height,
            w = orient === "vertical" ? width - padding * 3 - size(d, i) : width;
      const res = wrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(label(d, i));
      res.words = split(res.sentence);
      res.width = Math.ceil(max(res.lines.map((t) => measureText(t, {"font-family": f, "font-size": s})))) + s;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      res.og = {
        "height": res.height,
        "width": res.width
      };
      res.data = d;
      res.f = f;
      res.s = s;
      res.lh = lh;
      return res;
    });

    let availableSpace, textSpace, visibleLabels = true;

    if (orient === "horizontal") {
      availableSpace = width - sum(data.map((d, i) => size(d, i) + padding * 3)) - padding * 2;
      textSpace = sum(lineData.map((d, i) => d.width - fontSize(d, i)));
      if (textSpace > availableSpace) {
        const wrappable = lineData
          .filter((d) => d.words.length > 1)
          .sort((a, b) => b.sentence.length - a.sentence.length);

        if (wrappable.length && height > wrappable[0].height * 2) {

          let line = 2;
          while (line <= 5) {
            const labels = wrappable.filter((d) => d.words.length >= line);
            if (!labels.length) break;
            for (let x = 0; x < wrappable.length; x++) {
              const label = wrappable[x];
              const h = label.og.height * line, w = label.og.width * (1.5 * (1 / line));
              const res = wrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
              if (!res.truncated) {
                textSpace -= label.width;
                label.width = Math.ceil(max(res.lines.map((t) => measureText(t, {"font-family": label.f, "font-size": label.s})))) + label.s;
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
    if (textSpace > availableSpace) visibleLabels = false;

    if (!visibleLabels)
      for (let i = 0; i < lineData.length; i++) {
        lineData[i].width = 0;
        lineData[i].height = 0;
      }

    xOffset = padding;
    yOffset = padding;
    const innerHeight = max(lineData, (d, i) => max([d.height, size(d.data, i)])),
          innerWidth = textSpace + sum(data, (d, i) => size(d, i)) + padding * (data.length * 3 - 2);
    if (align === "center") xOffset = (width - padding * 2 - innerWidth) / 2;
    else if (align === "right") xOffset = width - padding * 2 - innerWidth;
    if (verticalAlign === "middle") yOffset = (height - padding * 2 - innerHeight) / 2;
    else if (verticalAlign === "bottom") yOffset = height - padding * 2 - innerHeight;

    // Shape <g> Group
    let shapeGroup = select.selectAll("g.d3plus-legend-shape-group")
      .data([0]);

    shapeGroup = shapeGroup.enter().append("g")
        .attr("class", "d3plus-legend-shape-group")
      .merge(shapeGroup);

    // Legend Shapes
    d3plusShape.rect()
      .data(data)
      .fill(color)
      .fontColor(fontColor)
      .fontFamily(fontFamily)
      .fontResize(fontResize)
      .fontSize(fontSize)
      .height(size)
      .id(id)
      .innerBounds(labelBounds)
      .label(visibleLabels ? label : false)
      .labelPadding(0)
      .lineHeight(lineHeight)
      .select(shapeGroup.node())
      .verticalAlign("top")
      .width(size)
      .x(x)
      .y(y)
      ();

    if (callback) setTimeout(callback, 100);

    return shape;

  }

  /**
      @memberof shape
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  shape.align = function(_) {
    return arguments.length ? (align = _, shape) : align;
  };

  /**
      @memberof shape
      @desc If a valid CSS *color* is specified, sets the overall background color to the specified value and returns this generator. If *color* is not specified, returns the current background color.
      @param {String} [*color* = []]
  */
  shape.backgroundColor = function(_) {
    return arguments.length ? (backgroundColor = _, shape) : backgroundColor;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the color accessor to the specified function and returns this generator. If *value* is not specified, returns the current color accessor.
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
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  shape.data = function(_) {
    return arguments.length ? (data = _, shape) : data;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.
      @param {Function|String} [*value*]
  */
  shape.fontColor = function(_) {
    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant(_), shape) : fontColor;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current font-family accessor.
      @param {Function|String} [*value*]
  */
  shape.fontFamily = function(_) {
    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant(_), shape) : fontFamily;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this rectangle generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#shape.label) will be resized the best fit the rectangle.
      @param {Function|Boolean} [*value*]
  */
  shape.fontResize = function(_) {
    return arguments.length ? (fontResize = typeof _ === "function" ? _ : constant(_), shape) : fontResize;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current font-size accessor.
      @param {Function|String} [*value*]
  */
  shape.fontSize = function(_) {
    return arguments.length ? (fontSize = typeof _ === "function" ? _ : constant(_), shape) : fontSize;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  shape.height = function(_) {
    return arguments.length ? (height = _, shape) : height;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
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
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
  */
  shape.label = function(_) {
    return arguments.length ? (label = typeof _ === "function" ? _ : constant(_), shape) : label;
  };

  /**
      @memberof shape
      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this legend generator. If *bounds* is not specified, returns the current inner bounds accessor.
      @example
function(w, h) {
  return {
    "width": w,
    "height": h,
    "x": -w / 2,
    "y": -h / 2
  };
}
      @param {Function} [*bounds*] Given a shape's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
  */
  shape.labelBounds = function(_) {
    return arguments.length ? (labelBounds = _, shape) : labelBounds;
  };

  /**
      @memberof shape
      @desc If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "horizontal"] Supports `"horizontal"` and `"vertical"` orientations.
  */
  shape.orient = function(_) {
    return arguments.length ? (orient = _, shape) : orient;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  shape.padding = function(_) {
    return arguments.length ? (padding = _, shape) : padding;
  };

  /**
      @memberof shape
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3Select("body").append("svg")]
  */
  shape.select = function(_) {
    return arguments.length ? (select = d3Select(_), shape) : select;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current size accessor.
      @param {Function|Number} [*value* = 20]
  */
  shape.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(_), shape) : size;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the vertical alignment to the specified value and returns this generator. If *value* is not specified, returns the current vertical alignment.
      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
  */
  shape.verticalAlign = function(_) {
    return arguments.length ? (verticalAlign = _, shape) : verticalAlign;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
  */
  shape.width = function(_) {
    return arguments.length ? (width = _, shape) : width;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
  */
  shape.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), shape) : x;
  };

  /**
      @memberof shape
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
  */
  shape.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), shape) : y;
  };

  return data.length ? shape() : shape;

}