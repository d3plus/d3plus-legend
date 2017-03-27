# d3plus-legend

[![NPM Release](http://img.shields.io/npm/v/d3plus-legend.svg?style=flat)](https://www.npmjs.org/package/d3plus-legend)
[![Build Status](https://travis-ci.org/d3plus/d3plus-legend.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-legend)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-legend.svg?style=flat)](https://david-dm.org/d3plus/d3plus-legend)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

An easy to use javascript chart legend.

## Installing

If you use NPM, `npm install d3plus-legend`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-legend/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-legend.v0.8.full.min.js"></script>
```


## API Reference
### Classes

<dl>
<dt><a href="#ColorScale">ColorScale</a> ⇐ <code><a href="https://github.com/d3plus/d3plus-common#BaseClass">BaseClass</a></code></dt>
<dd></dd>
<dt><a href="#Legend">Legend</a> ⇐ <code><a href="https://github.com/d3plus/d3plus-common#BaseClass">BaseClass</a></code></dt>
<dd></dd>
</dl>

<a name="ColorScale"></a>

### ColorScale ⇐ <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>
**Kind**: global class  
**Extends**: <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>  

* [ColorScale](#ColorScale) ⇐ <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>
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

<a name="new_ColorScale_new"></a>

#### new ColorScale()
Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

<a name="ColorScale.render"></a>

#### ColorScale.render([*callback*]) ↩︎
Renders the current ColorScale to the page. If a *callback* is specified, it will be called once the ColorScale is done drawing.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="ColorScale.axisConfig"></a>

#### ColorScale.axisConfig([*value*]) ↩︎
If *value* is specified, sets the axis configuration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current axis configuration.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="ColorScale.align"></a>

#### ColorScale.align([*value*]) ↩︎
If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="ColorScale.color"></a>

#### ColorScale.color([*value*]) ↩︎
Defines the color or colors to be used for the scale. If only a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> &#124; <code>Array</code> | <code>&quot;#0C8040&quot;</code> | 

<a name="ColorScale.data"></a>

#### ColorScale.data([*data*]) ↩︎
If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="ColorScale.duration"></a>

#### ColorScale.duration([*value*]) ↩︎
If *value* is specified, sets the transition duration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current duration.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>600</code> | 

<a name="ColorScale.height"></a>

#### ColorScale.height([*value*]) ↩︎
If *value* is specified, sets the overall height of the ColorScale and returns the current class instance. If *value* is not specified, returns the current height value.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>100</code> | 

<a name="ColorScale.orient"></a>

#### ColorScale.orient([*value*]) ↩︎
Sets the flow of the items inside the ColorScale. If no value is passed, the current flow will be returned.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;bottom&quot;</code> | 

<a name="ColorScale.outerBounds"></a>

#### ColorScale.outerBounds()
If called after the elements have been drawn to DOM, will returns the outer bounds of the ColorScale content.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Example**  
```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="ColorScale.padding"></a>

#### ColorScale.padding([*value*]) ↩︎
If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="ColorScale.rectConfig"></a>

#### ColorScale.rectConfig([*value*]) ↩︎
Provides access to the config method of the Rect class used to create the different rectangle color buckets.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="ColorScale.scale"></a>

#### ColorScale.scale([*value*]) ↩︎
If *value* is specified, sets the scale of the ColorScale and returns the current class instance. If *value* is not specified, returns the current scale value.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | Can either be "linear", "jenks", or "buckets". |

<a name="ColorScale.select"></a>

#### ColorScale.select([*selector*]) ↩︎
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="ColorScale.size"></a>

#### ColorScale.size([*value*]) ↩︎
The height of horizontal color scales, and width when positioned vertical.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="ColorScale.value"></a>

#### ColorScale.value([*value*]) ↩︎
If *value* is specified, sets the value accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current value accessor.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

**Example**  
```js
function value(d) {
  return d.value;
}
```
<a name="ColorScale.width"></a>

#### ColorScale.width([*value*]) ↩︎
If *value* is specified, sets the overall width of the ColorScale and returns the current class instance. If *value* is not specified, returns the current width value.

**Kind**: static method of <code>[ColorScale](#ColorScale)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>400</code> | 

<a name="Legend"></a>

### Legend ⇐ <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>
**Kind**: global class  
**Extends**: <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>  

* [Legend](#Legend) ⇐ <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>
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

<a name="new_Legend_new"></a>

#### new Legend()
Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

<a name="Legend.render"></a>

#### Legend.render([*callback*]) ↩︎
Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Legend.active"></a>

#### Legend.active([*value*]) ↩︎
If *value* is specified, sets the active method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Legend.align"></a>

#### Legend.align([*value*]) ↩︎
If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="Legend.data"></a>

#### Legend.data([*data*]) ↩︎
If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="Legend.direction"></a>

#### Legend.direction([*value*]) ↩︎
Sets the flow of the items inside the legend. If no value is passed, the current flow will be returned.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;row&quot;</code> | 

<a name="Legend.duration"></a>

#### Legend.duration([*value*]) ↩︎
If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>600</code> | 

<a name="Legend.height"></a>

#### Legend.height([*value*]) ↩︎
If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>100</code> | 

<a name="Legend.hover"></a>

#### Legend.hover([*value*]) ↩︎
If *value* is specified, sets the hover method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Legend.id"></a>

#### Legend.id([*value*]) ↩︎
If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function value(d) {
  return d.id;
}
```
<a name="Legend.label"></a>

#### Legend.label([*value*]) ↩︎
If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="Legend.outerBounds"></a>

#### Legend.outerBounds()
If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Example**  
```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="Legend.padding"></a>

#### Legend.padding([*value*]) ↩︎
If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="Legend.select"></a>

#### Legend.select([*selector*]) ↩︎
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="Legend.shape"></a>

#### Legend.shape([*value*]) ↩︎
If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;Rect&quot;</code> | 

<a name="Legend.shapeConfig"></a>

#### Legend.shapeConfig([*config*]) ↩︎
If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*config*] | <code>Object</code> | <code>{}</code> | 

<a name="Legend.title"></a>

#### Legend.title([*value*]) ↩︎
If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>String</code> | 

<a name="Legend.titleConfig"></a>

#### Legend.titleConfig([*value*]) ↩︎
If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Legend.verticalAlign"></a>

#### Legend.verticalAlign([*value*]) ↩︎
If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;middle&quot;</code> | Supports `"top"` and `"middle"` and `"bottom"`. |

<a name="Legend.width"></a>

#### Legend.width([*value*]) ↩︎
If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.

**Kind**: static method of <code>[Legend](#Legend)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>400</code> | 



###### <sub>Documentation generated on Mon, 27 Mar 2017 23:36:39 GMT</sub>
