# BSSelect
A quick function to allow search in HTML select box.

```javascript
new BSSelect(selector, options);
```

* selector `(Selector|Node)`
* options `object`

### Deployment:
To use BSSelect you must include `Bootstrap 5 CSS & JS` files first  

Using BSSelect.js file

```html
<script src="BSSelect.min.js"></script>
```
Using jsDeliver CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@khairnar2960/bsselect@1.6.0/BSSelect.min.js"></script>
```
Using unpkg CDN

```html
<script src="https://unpkg.com/@khairnar2960/bsselect@1.6.0/BSSelect.min.js"></script>
```

### Uses:

**No option use**

```html
<select class="form-select" id="demo">
	<option>Select city</option>
	<option>Delhi</option>
	<option>Mumbai</option>
	<option>Kolkata</option>
	<option>Indore</option>
	<option>Chennai</option>
</select>
```
```html
<script>
window.addEventListener('load', function(e) {
	const select = new BSSelect('#demo');
});
</script>
```
#### Small variation

```html
<script>
window.addEventListener('load', function(e) {
	const select = new BSSelect('#demo', {size: 'sm'});
});
</script>
```

#### Large variation

```html
<script>
window.addEventListener('load', function(e) {
	const select = new BSSelect('#demo', {size: 'lg'});
});
</script>
```
### Author:
* [Harshal Khairnar](https://harshalkhairnar.com)