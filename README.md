# d3plus-legend

[![NPM Release](http://img.shields.io/npm/v/d3plus-legend.svg?style=flat)](https://www.npmjs.org/package/d3plus-legend) [![Build Status](https://travis-ci.org/d3plus/d3plus-legend.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-legend) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-legend.svg?style=flat)](https://david-dm.org/d3plus/d3plus-legend) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/) 

An easy to use javascript chart legend.

## Installing

If you use NPM, run `npm install d3plus-legend --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-legend/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-legend.v0.8.full.min.js"></script>
```

## Examples

 * [Changing Style of a Color Scale](http://d3plus.org/examples/d3plus-legend/colorScale-dark/)
 * [Creating a Color Scale](http://d3plus.org/examples/d3plus-legend/colorScale/)
 * [Removing Legend Labels](http://d3plus.org/examples/d3plus-legend/legend-remove-label/)
 * [Images in Legends](http://d3plus.org/examples/d3plus-legend/legend-image/)

## API Reference

##### 
* [ColorScale](#ColorScale)
* [Legend](#Legend)

---

<a name="ColorScale"></a>
#### **ColorScale** [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L18)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [ColorScale](#ColorScale) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
    * [new ColorScale()](#new_ColorScale_new)
    * [.render([*callback*])](#ColorScale.render) ↩︎
    * [.axisConfig([*value*])](#ColorScale.axisConfig) ↩︎
    * [.align([*value*])](#ColorScale.align) ↩︎
    * [.color([*value*])](#ColorScale.color) ↩︎
    * [.data([*data*])](#ColorScale.data) ↩︎
    * [.duration([*value*])](#ColorScale.duration) ↩︎
    * [.height([*value*])](#ColorScale.height) ↩︎
    * [.orient([*value*])](#ColorScale.orient) ↩︎
    * [.outerBounds()](#ColorScale.outerBounds)
    * [.padding([*value*])](#ColorScale.padding) ↩︎
    * [.rectConfig([*value*])](#ColorScale.rectConfig) ↩︎
    * [.scale([*value*])](#ColorScale.scale) ↩︎
    * [.select([*selector*])](#ColorScale.select) ↩︎
    * [.size([*value*])](#ColorScale.size) ↩︎
    * [.value([*value*])](#ColorScale.value) ↩︎
    * [.width([*value*])](#ColorScale.width) ↩︎


<a name="new_ColorScale_new" href="#new_ColorScale_new">#</a> new **ColorScale**()

Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.





<a name="ColorScale.render" href="#ColorScale.render">#</a> ColorScale.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L65)

Renders the current ColorScale to the page. If a *callback* is specified, it will be called once the ColorScale is done drawing.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.axisConfig" href="#ColorScale.axisConfig">#</a> ColorScale.**axisConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L221)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.align" href="#ColorScale.align">#</a> ColorScale.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L231)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.color" href="#ColorScale.color">#</a> ColorScale.**color**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L241)

Defines the color or colors to be used for the scale. If only a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.data" href="#ColorScale.data">#</a> ColorScale.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L251)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.duration" href="#ColorScale.duration">#</a> ColorScale.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L261)

If *value* is specified, sets the transition duration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.height" href="#ColorScale.height">#</a> ColorScale.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L271)

If *value* is specified, sets the overall height of the ColorScale and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.orient" href="#ColorScale.orient">#</a> ColorScale.**orient**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L281)

Sets the flow of the items inside the ColorScale. If no value is passed, the current flow will be returned.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.outerBounds" href="#ColorScale.outerBounds">#</a> ColorScale.**outerBounds**() [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L291)

If called after the elements have been drawn to DOM, will returns the outer bounds of the ColorScale content.


This is a static method of [<code>ColorScale</code>](#ColorScale).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```


<a name="ColorScale.padding" href="#ColorScale.padding">#</a> ColorScale.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L301)

If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.rectConfig" href="#ColorScale.rectConfig">#</a> ColorScale.**rectConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L311)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Rect](http://d3plus.org/docs/#Rect). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.scale" href="#ColorScale.scale">#</a> ColorScale.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L321)

If *value* is specified, sets the scale of the ColorScale and returns the current class instance. If *value* is not specified, returns the current scale value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.select" href="#ColorScale.select">#</a> ColorScale.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L331)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.size" href="#ColorScale.size">#</a> ColorScale.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L341)

The height of horizontal color scales, and width when positioned vertical.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.value" href="#ColorScale.value">#</a> ColorScale.**value**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L355)

If *value* is specified, sets the value accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


```js
function value(d) {
  return d.value;
}
```


<a name="ColorScale.width" href="#ColorScale.width">#</a> ColorScale.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L365)

If *value* is specified, sets the overall width of the ColorScale and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.

---

<a name="Legend"></a>
#### **Legend** [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L13)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [Legend](#Legend) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
    * [new Legend()](#new_Legend_new)
    * [.render([*callback*])](#Legend.render) ↩︎
    * [.active([*value*])](#Legend.active) ↩︎
    * [.align([*value*])](#Legend.align) ↩︎
    * [.data([*data*])](#Legend.data) ↩︎
    * [.direction([*value*])](#Legend.direction) ↩︎
    * [.duration([*value*])](#Legend.duration) ↩︎
    * [.height([*value*])](#Legend.height) ↩︎
    * [.hover([*value*])](#Legend.hover) ↩︎
    * [.id([*value*])](#Legend.id) ↩︎
    * [.label([*value*])](#Legend.label) ↩︎
    * [.outerBounds()](#Legend.outerBounds)
    * [.padding([*value*])](#Legend.padding) ↩︎
    * [.select([*selector*])](#Legend.select) ↩︎
    * [.shape([*value*])](#Legend.shape) ↩︎
    * [.shapeConfig([*config*])](#Legend.shapeConfig) ↩︎
    * [.title([*value*])](#Legend.title) ↩︎
    * [.titleConfig([*value*])](#Legend.titleConfig) ↩︎
    * [.verticalAlign([*value*])](#Legend.verticalAlign) ↩︎
    * [.width([*value*])](#Legend.width) ↩︎


<a name="new_Legend_new" href="#new_Legend_new">#</a> new **Legend**()

Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.





<a name="Legend.render" href="#Legend.render">#</a> Legend.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L110)

Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.active" href="#Legend.active">#</a> Legend.**active**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L358)

If *value* is specified, sets the active method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.align" href="#Legend.align">#</a> Legend.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L369)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.data" href="#Legend.data">#</a> Legend.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L379)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.direction" href="#Legend.direction">#</a> Legend.**direction**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L389)

Sets the flow of the items inside the legend. If no value is passed, the current flow will be returned.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.duration" href="#Legend.duration">#</a> Legend.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L399)

If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.height" href="#Legend.height">#</a> Legend.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L409)

If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.hover" href="#Legend.hover">#</a> Legend.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L419)

If *value* is specified, sets the hover method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.id" href="#Legend.id">#</a> Legend.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L434)

If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


```js
function value(d) {
  return d.id;
}
```


<a name="Legend.label" href="#Legend.label">#</a> Legend.**label**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L444)

If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.outerBounds" href="#Legend.outerBounds">#</a> Legend.**outerBounds**() [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L454)

If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.


This is a static method of [<code>Legend</code>](#Legend).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```


<a name="Legend.padding" href="#Legend.padding">#</a> Legend.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L464)

If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.select" href="#Legend.select">#</a> Legend.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L474)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.shape" href="#Legend.shape">#</a> Legend.**shape**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L484)

If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.shapeConfig" href="#Legend.shapeConfig">#</a> Legend.**shapeConfig**([*config*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L494)

If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.title" href="#Legend.title">#</a> Legend.**title**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L504)

If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.titleConfig" href="#Legend.titleConfig">#</a> Legend.**titleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L514)

If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.verticalAlign" href="#Legend.verticalAlign">#</a> Legend.**verticalAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L524)

If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.width" href="#Legend.width">#</a> Legend.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L534)

If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.

---



###### <sub>Documentation generated on Wed, 28 Mar 2018 21:14:12 GMT</sub>
