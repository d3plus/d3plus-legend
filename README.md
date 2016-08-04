# d3plus-legend

[![NPM Release](http://img.shields.io/npm/v/d3plus-legend.svg?style=flat)](https://www.npmjs.org/package/d3plus-legend)
[![Build Status](https://travis-ci.org/d3plus/d3plus-legend.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-legend)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-legend.svg?style=flat)](https://david-dm.org/d3plus/d3plus-legend)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

A collection of chart legends and keys.

## Installing

If you use NPM, `npm install d3plus-legend`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-legend/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-legend.v0.4.full.min.js"></script>
```


## API Reference
### Classes

<dl>
<dt><a href="#ScaleLegend">ScaleLegend</a></dt>
<dd></dd>
<dt><a href="#ShapeLegend">ShapeLegend</a></dt>
<dd></dd>
</dl>

<a name="ScaleLegend"></a>

### ScaleLegend
**Kind**: global class  

* [ScaleLegend](#ScaleLegend)
    * [new ScaleLegend()](#new_ScaleLegend_new)
    * [.render([*callback*])](#ScaleLegend.render)
    * [.align([*value*])](#ScaleLegend.align)
    * [.config([*value*])](#ScaleLegend.config)
    * [.domain([*value*])](#ScaleLegend.domain)
    * [.height([*value*])](#ScaleLegend.height)
    * [.orient([*orient*])](#ScaleLegend.orient)
    * [.outerBounds()](#ScaleLegend.outerBounds)
    * [.padding([*value*])](#ScaleLegend.padding)
    * [.scale([*value*])](#ScaleLegend.scale)
    * [.select([*selector*])](#ScaleLegend.select)
    * [.ticks([*value*])](#ScaleLegend.ticks)
    * [.tickSize([*value*])](#ScaleLegend.tickSize)
    * [.width([*value*])](#ScaleLegend.width)

<a name="new_ScaleLegend_new"></a>

#### new ScaleLegend()
Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

<a name="ScaleLegend.render"></a>

#### ScaleLegend.render([*callback*])
Renders the current ScaleLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="ScaleLegend.align"></a>

#### ScaleLegend.align([*value*])
If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="ScaleLegend.config"></a>

#### ScaleLegend.config([*value*])
If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="ScaleLegend.domain"></a>

#### ScaleLegend.domain([*value*])
If *value* is specified, sets the scale domain of the legend and returns this generator. If *value* is not specified, returns the current scale domain.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Array</code> | <code>[0, 10]</code> | 

<a name="ScaleLegend.height"></a>

#### ScaleLegend.height([*value*])
If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>100</code> | 

<a name="ScaleLegend.orient"></a>

#### ScaleLegend.orient([*orient*])
If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*orient*] | <code>String</code> | <code>&quot;bottom&quot;</code> | Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations. |

<a name="ScaleLegend.outerBounds"></a>

#### ScaleLegend.outerBounds()
If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  
**Example**  
```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="ScaleLegend.padding"></a>

#### ScaleLegend.padding([*value*])
If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="ScaleLegend.scale"></a>

#### ScaleLegend.scale([*value*])
If *value* is specified, sets the scale of the legend and returns this generator. If *value* is not specified, returns the current this._d3Scale

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | 

<a name="ScaleLegend.select"></a>

#### ScaleLegend.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="ScaleLegend.ticks"></a>

#### ScaleLegend.ticks([*value*])
If *value* is specified, sets the tick values of the legend and returns this generator. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#ScaleLegend.domain) and the available [width](#ScaleLegend.width).

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="ScaleLegend.tickSize"></a>

#### ScaleLegend.tickSize([*value*])
If *value* is specified, sets the tick size of the legend and returns this generator. If *value* is not specified, returns the current tick size.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>5</code> | 

<a name="ScaleLegend.width"></a>

#### ScaleLegend.width([*value*])
If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>400</code> | 

<a name="ShapeLegend"></a>

### ShapeLegend
**Kind**: global class  

* [ShapeLegend](#ShapeLegend)
    * [new ShapeLegend()](#new_ShapeLegend_new)
    * [.textBoxConfig([*config*])](#ShapeLegend.textBoxConfig)
    * [.render([*callback*])](#ShapeLegend.render)
    * [.align([*value*])](#ShapeLegend.align)
    * [.config([*value*])](#ShapeLegend.config)
    * [.data([*data*])](#ShapeLegend.data)
    * [.height([*value*])](#ShapeLegend.height)
    * [.id([*value*])](#ShapeLegend.id)
    * [.label([*value*])](#ShapeLegend.label)
    * [.orient([*orient*])](#ShapeLegend.orient)
    * [.outerBounds()](#ShapeLegend.outerBounds)
    * [.padding([*value*])](#ShapeLegend.padding)
    * [.select([*selector*])](#ShapeLegend.select)
    * [.shape([*value*])](#ShapeLegend.shape)
    * [.shapeConfig([*config*])](#ShapeLegend.shapeConfig)
    * [.verticalAlign([*value*])](#ShapeLegend.verticalAlign)
    * [.width([*value*])](#ShapeLegend.width)

<a name="new_ShapeLegend_new"></a>

#### new ShapeLegend()
Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

<a name="ShapeLegend.textBoxConfig"></a>

#### ShapeLegend.textBoxConfig([*config*])
If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns this generator. If *config* is not specified, returns the current shape configuration.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*config*] | <code>Object</code> | <code>{}</code> | 

<a name="ShapeLegend.render"></a>

#### ShapeLegend.render([*callback*])
Renders the current ShapeLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="ShapeLegend.align"></a>

#### ShapeLegend.align([*value*])
If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="ShapeLegend.config"></a>

#### ShapeLegend.config([*value*])
If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="ShapeLegend.data"></a>

#### ShapeLegend.data([*data*])
If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="ShapeLegend.height"></a>

#### ShapeLegend.height([*value*])
If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>100</code> | 

<a name="ShapeLegend.id"></a>

#### ShapeLegend.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function value(d) {
  return d.id;
}
```
<a name="ShapeLegend.label"></a>

#### ShapeLegend.label([*value*])
If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="ShapeLegend.orient"></a>

#### ShapeLegend.orient([*orient*])
If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*orient*] | <code>String</code> | <code>&quot;horizontal&quot;</code> | Supports `"horizontal"` and `"vertical"` orientations. |

<a name="ShapeLegend.outerBounds"></a>

#### ShapeLegend.outerBounds()
If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  
**Example**  
```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="ShapeLegend.padding"></a>

#### ShapeLegend.padding([*value*])
If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="ShapeLegend.select"></a>

#### ShapeLegend.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="ShapeLegend.shape"></a>

#### ShapeLegend.shape([*value*])
If *value* is specified, sets the shape accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current shape accessor.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;Rect&quot;</code> | 

<a name="ShapeLegend.shapeConfig"></a>

#### ShapeLegend.shapeConfig([*config*])
If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns this generator. If *config* is not specified, returns the current shape configuration.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*config*] | <code>Object</code> | <code>{}</code> | 

<a name="ShapeLegend.verticalAlign"></a>

#### ShapeLegend.verticalAlign([*value*])
If *value* is specified, sets the vertical alignment to the specified value and returns this generator. If *value* is not specified, returns the current vertical alignment.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;middle&quot;</code> | Supports `"top"` and `"middle"` and `"bottom"`. |

<a name="ShapeLegend.width"></a>

#### ShapeLegend.width([*value*])
If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>400</code> | 



###### <sub>Documentation generated on Thu, 04 Aug 2016 19:01:00 GMT</sub>
