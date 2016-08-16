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
<dt><a href="#BaseClass">BaseClass</a></dt>
<dd></dd>
<dt><a href="#ScaleLegend">ScaleLegend</a> ⇐ <code>BaseLegend</code></dt>
<dd></dd>
<dt><a href="#ShapeLegend">ShapeLegend</a> ⇐ <code>BaseLegend</code></dt>
<dd></dd>
</dl>

<a name="BaseClass"></a>

### BaseClass
**Kind**: global class  
<a name="new_BaseClass_new"></a>

#### new BaseClass()
Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

<a name="ScaleLegend"></a>

### ScaleLegend ⇐ <code>BaseLegend</code>
**Kind**: global class  
**Extends:** <code>BaseLegend</code>  

* [ScaleLegend](#ScaleLegend) ⇐ <code>BaseLegend</code>
    * [new ScaleLegend()](#new_ScaleLegend_new)
    * [.render([*callback*])](#ScaleLegend.render)
    * [.align([*value*])](#ScaleLegend.align)
    * [.domain([*value*])](#ScaleLegend.domain)
    * [.orient([*orient*])](#ScaleLegend.orient)
    * [.range([*value*])](#ScaleLegend.range)
    * [.scale([*value*])](#ScaleLegend.scale)
    * [.tickLabels([*value*])](#ScaleLegend.tickLabels)
    * [.ticks([*value*])](#ScaleLegend.ticks)
    * [.tickSize([*value*])](#ScaleLegend.tickSize)

<a name="new_ScaleLegend_new"></a>

#### new ScaleLegend()
Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

<a name="ScaleLegend.render"></a>

#### ScaleLegend.render([*callback*])
Renders the current ScaleLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="ScaleLegend.align"></a>

#### ScaleLegend.align([*value*])
If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="ScaleLegend.domain"></a>

#### ScaleLegend.domain([*value*])
If *value* is specified, sets the scale domain of the legend and returns the current class instance. If *value* is not specified, returns the current scale domain.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Array</code> | <code>[0, 10]</code> | 

<a name="ScaleLegend.orient"></a>

#### ScaleLegend.orient([*orient*])
If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*orient*] | <code>String</code> | <code>&quot;bottom&quot;</code> | Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations. |

<a name="ScaleLegend.range"></a>

#### ScaleLegend.range([*value*])
If *value* is specified, sets the scale range (in pixels) of the legend and returns the current class instance. If *value* is not specified, returns the current scale range.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="ScaleLegend.scale"></a>

#### ScaleLegend.scale([*value*])
If *value* is specified, sets the scale of the legend and returns the current class instance. If *value* is not specified, returns the current this._d3Scale

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | 

<a name="ScaleLegend.tickLabels"></a>

#### ScaleLegend.tickLabels([*value*])
If *value* is specified, sets the visible tick labels of the legend and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="ScaleLegend.ticks"></a>

#### ScaleLegend.ticks([*value*])
If *value* is specified, sets the tick values of the legend and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#ScaleLegend.domain) and the available [width](#ScaleLegend.width).

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="ScaleLegend.tickSize"></a>

#### ScaleLegend.tickSize([*value*])
If *value* is specified, sets the tick size of the legend and returns the current class instance. If *value* is not specified, returns the current tick size.

**Kind**: static method of <code>[ScaleLegend](#ScaleLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>5</code> | 

<a name="ShapeLegend"></a>

### ShapeLegend ⇐ <code>BaseLegend</code>
**Kind**: global class  
**Extends:** <code>BaseLegend</code>  

* [ShapeLegend](#ShapeLegend) ⇐ <code>BaseLegend</code>
    * [new ShapeLegend()](#new_ShapeLegend_new)
    * [.textBoxConfig([*config*])](#ShapeLegend.textBoxConfig)
    * [.render([*callback*])](#ShapeLegend.render)
    * [.align([*value*])](#ShapeLegend.align)
    * [.data([*data*])](#ShapeLegend.data)
    * [.id([*value*])](#ShapeLegend.id)
    * [.label([*value*])](#ShapeLegend.label)
    * [.orient([*orient*])](#ShapeLegend.orient)
    * [.shape([*value*])](#ShapeLegend.shape)
    * [.shapeConfig([*config*])](#ShapeLegend.shapeConfig)
    * [.verticalAlign([*value*])](#ShapeLegend.verticalAlign)

<a name="new_ShapeLegend_new"></a>

#### new ShapeLegend()
Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.

<a name="ShapeLegend.textBoxConfig"></a>

#### ShapeLegend.textBoxConfig([*config*])
If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.

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
If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;center&quot;</code> | Supports `"left"` and `"center"` and `"right"`. |

<a name="ShapeLegend.data"></a>

#### ShapeLegend.data([*data*])
If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="ShapeLegend.id"></a>

#### ShapeLegend.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.

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
If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="ShapeLegend.orient"></a>

#### ShapeLegend.orient([*orient*])
If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*orient*] | <code>String</code> | <code>&quot;horizontal&quot;</code> | Supports `"horizontal"` and `"vertical"` orientations. |

<a name="ShapeLegend.shape"></a>

#### ShapeLegend.shape([*value*])
If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;Rect&quot;</code> | 

<a name="ShapeLegend.shapeConfig"></a>

#### ShapeLegend.shapeConfig([*config*])
If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*config*] | <code>Object</code> | <code>{}</code> | 

<a name="ShapeLegend.verticalAlign"></a>

#### ShapeLegend.verticalAlign([*value*])
If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.

**Kind**: static method of <code>[ShapeLegend](#ShapeLegend)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;middle&quot;</code> | Supports `"top"` and `"middle"` and `"bottom"`. |



###### <sub>Documentation generated on Tue, 16 Aug 2016 22:04:25 GMT</sub>
