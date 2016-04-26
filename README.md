# d3plus-project-template

[![NPM Release](http://img.shields.io/npm/v/d3plus-project-template.svg?style=flat-square)](https://www.npmjs.org/package/d3plus-project-template)
[![Build Status](https://travis-ci.org/d3plus/d3plus-project-template.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-project-template)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-project-template.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-project-template)
[![Dependency Status](http://img.shields.io/david/dev/d3plus/d3plus-project-template.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-project-template#info=devDependencies)

A starter environment for D3plus modules.

## Installation Options

* [NPM](#install.npm)
* [Browser](#install.browser)
* [AMD and CommonJS](#install.amd)
* [Custom Builds](#install.custom)

<a name="install.npm"></a>
### NPM
```sh
npm install d3plus-project-template
```

<a name="install.browser"></a>
### Browser
In a vanilla environment, a `d3plus_project-template` global is exported. To use a compiled version hosted on [d3plus.org](https://d3plus.org) that includes all dependencies:

```html
<script src="https://d3plus.org/js/d3plus-project-template.v0.1.full.min.js"></script>
```

For development purposes, you can also load all dependencies separately:

```html
<script src="exteral-dependencies-go-here"></script>

<script src="https://d3plus.org/js/d3plus-project-template.v0.1.min.js"></script>
```

Otherwise, [click here](https://github.com/d3plus/d3plus-project-template/releases/latest) to download the latest release.

<a name="install.amd"></a>
### AMD and CommonJS
The released bundle natively supports both AMD and CommonJS, and vanilla environments.

<a name="install.custom"></a>
### Custom Builds
The source code is written using standard `import` and `export` statements. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. Take a look at the  [index.js](https://github.com/d3plus/d3plus-project-template/blob/master/index.js) file to see the modules exported.

---

# API Reference
<a name="sample"></a>

## sample([data])
A sample chainable function. If *data* is specified, immediately draws and returns this sample generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#sample.data) method.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Array</code> | <code>[]</code> | 

**Example** *(a sample row of data)*  
```js
var data = {"id": "sample"};
```
**Example** *(passed to the generator)*  
```js
sample([data]);
```
**Example** *(creates the following)*  
```js
<html code goes here>
```
**Example** *(this is shorthand for the following)*  
```js
sample().data([data])();
```
**Example** *(which also allows a post-draw callback function)*  
```js
sample().data([data])(function() { alert("draw complete!"); })
```

* [sample([data])](#sample)
    * [.id([*value*])](#sample.id)
    * [.sampleConstant([*value*])](#sample.sampleConstant)

<a name="sample.id"></a>

### sample.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.

**Kind**: static method of <code>[sample](#sample)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function(d) {
  return d.id;
}
```
<a name="sample.sampleConstant"></a>

### sample.sampleConstant([*value*])
If *value* is specified, sets the accessor to the specified function or value and returns this generator. If *value* is not specified, returns the current accessor.

**Kind**: static method of <code>[sample](#sample)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>String</code> | <code>&quot;sample&quot;</code> | 

