# d3plus-legend

[![NPM Release](http://img.shields.io/npm/v/d3plus-legend.svg?style=flat-square)](https://www.npmjs.org/package/d3plus-legend)
[![Build Status](https://travis-ci.org/d3plus/d3plus-legend.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-legend)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-legend.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-legend)

A collection of chart legends/keys.

## Installation Options

* [NPM](#install.npm)
* [Browser](#install.browser)
* [AMD and CommonJS](#install.amd)
* [Custom Builds](#install.custom)

<a name="install.npm"></a>
### NPM
```sh
npm install d3plus-legend
```

<a name="install.browser"></a>
### Browser
In a vanilla environment, a `d3plus_legend` global is exported. To use a compiled version hosted on [d3plus.org](https://d3plus.org) that includes all dependencies:

```html
<script src="https://d3plus.org/js/d3plus-legend.v0.2.full.min.js"></script>
```

Otherwise, [click here](https://github.com/d3plus/d3plus-legend/releases/latest) to download the latest release.

<a name="install.amd"></a>
### AMD and CommonJS
The released bundle natively supports both AMD and CommonJS, in addition to vanilla environments.

<a name="install.custom"></a>
### Custom Builds
The source code is written using standard `import` and `export` statements. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. Take a look at the [index.js](https://github.com/d3plus/d3plus-legend/blob/master/index.js) file to see the modules exported.

---

# API Reference
<a name="shape"></a>

## shape([data])
Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Array</code> | <code>[]</code> | 

**Example** *(a sample dataset)*  
```js
var data = [
  {"id": 0, "color": "brickred"},
  {"id": 1, "color": "cornflowerblue"}
];
```
**Example** *(passed to the generator)*  
```js
shape([data]);
```
**Example** *(creates the following)*  
```js
<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
</g>
```
**Example** *(this is shorthand for the following)*  
```js
shape().data([data])();
```
**Example** *(which also allows a post-draw callback function)*  
```js
shape().data([data])(function() { alert("draw complete!"); })
```

* [shape([data])](#shape)
    * [.align([*value*])](#shape.align)
    * [.backgroundColor([*color*])](#shape.backgroundColor)
    * [.data([*data*])](#shape.data)
    * [.fill([*value*])](#shape.fill)
    * [.fontColor([*value*])](#shape.fontColor)
    * [.fontFamily([*value*])](#shape.fontFamily)
    * [.fontResize([*value*])](#shape.fontResize)
    * [.fontSize([*value*])](#shape.fontSize)
    * [.height([*value*])](#shape.height)
    * [.id([*value*])](#shape.id)
    * [.label([*value*])](#shape.label)
    * [.labelBounds([*bounds*])](#shape.labelBounds)
    * [.on([*typenames*], [*listener*])](#shape.on)
    * [.orient([*orient*])](#shape.orient)
    * [.outerBounds()](#shape.outerBounds)
    * [.padding([*value*])](#shape.padding)
    * [.select([*selector*])](#shape.select)
    * [.shapeImage([*value*])](#shape.shapeImage)
    * [.size([*value*])](#shape.size)
    * [.verticalAlign([*value*])](#shape.verticalAlign)
    * [.width([*value*])](#shape.width)
    * [.x([*value*])](#shape.x)
    * [.y([*value*])](#shape.y)

<a name="shape.align"></a>

### shape.align([*value*])
If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="shape.backgroundColor"></a>

### shape.backgroundColor([*color*])
If a valid CSS *color* is specified, sets the overall background color to the specified value and returns this generator. If *color* is not specified, returns the current background color.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*color*] | <code>String</code> | <code>[]</code> | 

<a name="shape.data"></a>

### shape.data([*data*])
If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="shape.fill"></a>

### shape.fill([*value*])
If *value* is specified, sets the fill accessor to the specified function and returns this generator. If *value* is not specified, returns the current fill accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function value(d) {
  return d.color;
}
```
<a name="shape.fontColor"></a>

### shape.fontColor([*value*])
If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="shape.fontFamily"></a>

### shape.fontFamily([*value*])
If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="shape.fontResize"></a>

### shape.fontResize([*value*])
If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#shape.label) will be resized the best fit the rectangle.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Boolean</code> | 

<a name="shape.fontSize"></a>

### shape.fontSize([*value*])
If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="shape.height"></a>

### shape.height([*value*])
If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>100</code> | 

<a name="shape.id"></a>

### shape.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function value(d) {
  return d.id;
}
```
<a name="shape.label"></a>

### shape.label([*value*])
If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="shape.labelBounds"></a>

### shape.labelBounds([*bounds*])
If *bounds* is specified, sets the inner bounds to the specified function and returns this legend generator. If *bounds* is not specified, returns the current inner bounds accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [*bounds*] | <code>function</code> | Given a shape's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`. |

**Example**  
```js
function(w, h) {
  return {
    "width": w,
    "height": h,
    "x": -w / 2,
    "y": -h / 2
  };
}
      
```
<a name="shape.on"></a>

### shape.on([*typenames*], [*listener*])
Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*typenames*] | <code>String</code> | 
| [*listener*] | <code>function</code> | 

<a name="shape.orient"></a>

### shape.orient([*orient*])
If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*orient*] | <code>String</code> | <code>&quot;horizontal&quot;</code> | Supports `"horizontal"` and `"vertical"` orientations. |

<a name="shape.outerBounds"></a>

### shape.outerBounds()
If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.

**Kind**: static method of <code>[shape](#shape)</code>  
**Example**  
```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="shape.padding"></a>

### shape.padding([*value*])
If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="shape.select"></a>

### shape.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3Select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="shape.shapeImage"></a>

### shape.shapeImage([*value*])
If *value* is specified, sets the shape background image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current shape background image accessor, which by default returns a color that contrasts the fill color.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="shape.size"></a>

### shape.size([*value*])
If *value* is specified, sets the size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current size accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | <code>20</code> | 

<a name="shape.verticalAlign"></a>

### shape.verticalAlign([*value*])
If *value* is specified, sets the vertical alignment to the specified value and returns this generator. If *value* is not specified, returns the current vertical alignment.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;middle&quot;</code> | Supports `"top"` and `"middle"` and `"bottom"`. |

<a name="shape.width"></a>

### shape.width([*value*])
If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>400</code> | 

<a name="shape.x"></a>

### shape.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="shape.y"></a>

### shape.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[shape](#shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

