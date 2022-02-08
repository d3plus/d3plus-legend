# d3plus-legend

[![NPM Release](http://img.shields.io/npm/v/d3plus-legend.svg?style=flat)](https://www.npmjs.org/package/d3plus-legend) [![Build Status](https://travis-ci.org/d3plus/d3plus-legend.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-legend) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-legend.svg?style=flat)](https://david-dm.org/d3plus/d3plus-legend) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/)

An easy to use javascript chart legend.

## Installing

If you use NPM, `npm install d3plus-legend`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-legend/releases/latest). You can also load d3plus-legend as a standalone library or as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-legend@1"></script>
<script>
  console.log(d3plus);
</script>
```

## API Reference

##### 
* [ColorScale](#ColorScale)
* [Legend](#Legend)

---

<a name="ColorScale"></a>
#### **ColorScale** [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L21)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [ColorScale](#ColorScale) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
    * [new ColorScale()](#new_ColorScale_new)
    * [.render([*callback*])](#ColorScale.render) ↩︎
    * [.axisConfig([*value*])](#ColorScale.axisConfig) ↩︎
    * [.align([*value*])](#ColorScale.align) ↩︎
    * [.buckets([*value*])](#ColorScale.buckets) ↩︎
    * [.bucketAxis([*value*])](#ColorScale.bucketAxis) ↩︎
    * [.bucketFormat([*value*])](#ColorScale.bucketFormat) ↩︎
    * [.bucketJoiner([*value*])](#ColorScale.bucketJoiner) ↩︎
    * [.centered([*value*])](#ColorScale.centered) ↩︎
    * [.color([*value*])](#ColorScale.color) ↩︎
    * [.colorMax([*value*])](#ColorScale.colorMax) ↩︎
    * [.colorMid([*value*])](#ColorScale.colorMid) ↩︎
    * [.colorMin([*value*])](#ColorScale.colorMin) ↩︎
    * [.data([*data*])](#ColorScale.data) ↩︎
    * [.domain([*value*])](#ColorScale.domain) ↩︎
    * [.duration([*value*])](#ColorScale.duration) ↩︎
    * [.height([*value*])](#ColorScale.height) ↩︎
    * [.labelConfig([*value*])](#ColorScale.labelConfig) ↩︎
    * [.labelMin([*value*])](#ColorScale.labelMin) ↩︎
    * [.labelMax([*value*])](#ColorScale.labelMax) ↩︎
    * [.legendConfig([*value*])](#ColorScale.legendConfig) ↩︎
    * [.midpoint([*value*])](#ColorScale.midpoint) ↩︎
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





<a name="ColorScale.render" href="#ColorScale.render">#</a> ColorScale.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L118)

Renders the current ColorScale to the page. If a *callback* is specified, it will be called once the ColorScale is done drawing.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.axisConfig" href="#ColorScale.axisConfig">#</a> ColorScale.**axisConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L531)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.align" href="#ColorScale.align">#</a> ColorScale.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L541)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.buckets" href="#ColorScale.buckets">#</a> ColorScale.**buckets**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L551)

The number of discrete buckets to create in a bucketed color scale. Will be overridden by any custom Array of colors passed to the `color` method. Optionally, users can supply an Array of values used to separate buckets, such as `[0, 10, 25, 50, 90]` for a percentage scale. This value would create 4 buckets, with each value representing the break point between each bucket (so 5 values makes 4 buckets).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.bucketAxis" href="#ColorScale.bucketAxis">#</a> ColorScale.**bucketAxis**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L561)

Determines whether or not to use an Axis to display bucket scales (both "buckets" and "jenks"). When set to `false`, bucketed scales will use the `Legend` class to display squares for each range of data. When set to `true`, bucketed scales will be displayed on an `Axis`, similar to "linear" scales.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.bucketFormat" href="#ColorScale.bucketFormat">#</a> ColorScale.**bucketFormat**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L571)

A function for formatting the labels associated to each bucket in a bucket-type scale ("jenks", "quantile", etc). The function is passed four arguments: the start value of the current bucket, it's index in the full Array of buckets, the full Array of buckets, and an Array of every value present in the data used to construct the buckets. Keep in mind that the end value for the bucket is not actually the next bucket in the list, but includes every value up until that next bucket value (less than, but not equal to). By default, d3plus will make the end value slightly less than it's current value, so that it does not overlap with the start label for the next bucket.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.bucketJoiner" href="#ColorScale.bucketJoiner">#</a> ColorScale.**bucketJoiner**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L581)

A function that receives the minimum and maximum values of a bucket, and is expected to return the full label.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.centered" href="#ColorScale.centered">#</a> ColorScale.**centered**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L592)

Determines whether or not to display a midpoint centered Axis. Does not apply to quantile scales.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.color" href="#ColorScale.color">#</a> ColorScale.**color**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L602)

Overrides the default internal logic of `colorMin`, `colorMid`, and `colorMax` to only use just this specified color. If a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.colorMax" href="#ColorScale.colorMax">#</a> ColorScale.**colorMax**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L612)

Defines the color to be used for numbers greater than the value of the `midpoint` on the scale (defaults to `0`). Colors in between this value and the value of `colorMid` will be interpolated, unless a custom Array of colors has been specified using the `color` method.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.colorMid" href="#ColorScale.colorMid">#</a> ColorScale.**colorMid**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L622)

Defines the color to be used for the midpoint of a diverging scale, based on the current value of the `midpoint` method (defaults to `0`). Colors in between this value and the values of `colorMin` and `colorMax` will be interpolated, unless a custom Array of colors has been specified using the `color` method.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.colorMin" href="#ColorScale.colorMin">#</a> ColorScale.**colorMin**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L632)

Defines the color to be used for numbers less than the value of the `midpoint` on the scale (defaults to `0`). Colors in between this value and the value of `colorMid` will be interpolated, unless a custom Array of colors has been specified using the `color` method.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.data" href="#ColorScale.data">#</a> ColorScale.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L642)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.domain" href="#ColorScale.domain">#</a> ColorScale.**domain**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L652)

In a linear scale, this Array of 2 values defines the min and max values used in the color scale. Any values outside of this range will be mapped to the nearest color value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.duration" href="#ColorScale.duration">#</a> ColorScale.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L662)

If *value* is specified, sets the transition duration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.height" href="#ColorScale.height">#</a> ColorScale.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L672)

If *value* is specified, sets the overall height of the ColorScale and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.labelConfig" href="#ColorScale.labelConfig">#</a> ColorScale.**labelConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L682)

A pass-through for the [TextBox](http://d3plus.org/docs/#TextBox) class used to style the labelMin and labelMax text.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.labelMin" href="#ColorScale.labelMin">#</a> ColorScale.**labelMin**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L692)

Defines a text label to be displayed off of the end of the minimum point in the scale (currently only available in horizontal orientation).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.labelMax" href="#ColorScale.labelMax">#</a> ColorScale.**labelMax**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L702)

Defines a text label to be displayed off of the end of the maximum point in the scale (currently only available in horizontal orientation).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.legendConfig" href="#ColorScale.legendConfig">#</a> ColorScale.**legendConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L712)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.midpoint" href="#ColorScale.midpoint">#</a> ColorScale.**midpoint**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L722)

The number value to be used as the anchor for `colorMid`, and defines the center point of the diverging color scale.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.orient" href="#ColorScale.orient">#</a> ColorScale.**orient**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L732)

Sets the flow of the items inside the ColorScale. If no value is passed, the current flow will be returned.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.outerBounds" href="#ColorScale.outerBounds">#</a> ColorScale.**outerBounds**() [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L742)

If called after the elements have been drawn to DOM, will returns the outer bounds of the ColorScale content.


This is a static method of [<code>ColorScale</code>](#ColorScale).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```


<a name="ColorScale.padding" href="#ColorScale.padding">#</a> ColorScale.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L752)

If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.rectConfig" href="#ColorScale.rectConfig">#</a> ColorScale.**rectConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L762)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Rect](http://d3plus.org/docs/#Rect). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.scale" href="#ColorScale.scale">#</a> ColorScale.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L772)

If *value* is specified, sets the scale of the ColorScale and returns the current class instance. If *value* is not specified, returns the current scale value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.select" href="#ColorScale.select">#</a> ColorScale.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L782)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.size" href="#ColorScale.size">#</a> ColorScale.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L792)

The height of horizontal color scales, and width when positioned vertical.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.value" href="#ColorScale.value">#</a> ColorScale.**value**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L806)

If *value* is specified, sets the value accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


```js
function value(d) {
  return d.value;
}
```


<a name="ColorScale.width" href="#ColorScale.width">#</a> ColorScale.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L816)

If *value* is specified, sets the overall width of the ColorScale and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.

---

<a name="Legend"></a>
#### **Legend** [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L16)


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





<a name="Legend.render" href="#Legend.render">#</a> Legend.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L121)

Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.active" href="#Legend.active">#</a> Legend.**active**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L380)

If *value* is specified, sets the active method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.align" href="#Legend.align">#</a> Legend.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L391)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.data" href="#Legend.data">#</a> Legend.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L401)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.direction" href="#Legend.direction">#</a> Legend.**direction**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L411)

Sets the flow of the items inside the legend. If no value is passed, the current flow will be returned.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.duration" href="#Legend.duration">#</a> Legend.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L421)

If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.height" href="#Legend.height">#</a> Legend.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L431)

If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.hover" href="#Legend.hover">#</a> Legend.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L441)

If *value* is specified, sets the hover method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.id" href="#Legend.id">#</a> Legend.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L456)

If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


```js
function value(d) {
  return d.id;
}
```


<a name="Legend.label" href="#Legend.label">#</a> Legend.**label**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L466)

If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.outerBounds" href="#Legend.outerBounds">#</a> Legend.**outerBounds**() [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L476)

If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.


This is a static method of [<code>Legend</code>](#Legend).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```


<a name="Legend.padding" href="#Legend.padding">#</a> Legend.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L486)

If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.select" href="#Legend.select">#</a> Legend.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L496)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.shape" href="#Legend.shape">#</a> Legend.**shape**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L506)

If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.shapeConfig" href="#Legend.shapeConfig">#</a> Legend.**shapeConfig**([*config*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L516)

If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.title" href="#Legend.title">#</a> Legend.**title**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L526)

If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.titleConfig" href="#Legend.titleConfig">#</a> Legend.**titleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L536)

If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.verticalAlign" href="#Legend.verticalAlign">#</a> Legend.**verticalAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L546)

If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.width" href="#Legend.width">#</a> Legend.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L556)

If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.

---



###### <sub>Documentation generated on Tue, 08 Feb 2022 23:04:03 GMT</sub>
