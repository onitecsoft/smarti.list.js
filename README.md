# smarti.list.js

JQuery list/grid tool. Provides behaviours for any kind of items iterating controls

Automatically initializes when page is loaded. If content was loaded within ajax request, call JQuery extension method `smarti()` on container: `$(container).smarti();`

<b>Dependencies:</b> [smarti.data.js](https://github.com/onitecsoft/smarti.data.js), [smarti.to.js](https://github.com/onitecsoft/smarti.to.js)

<b>Structure:</b>
```html
<div data-name="..." data-smarti="list" ...>
  ...
  <... data-item="true"> //this element will be repeated for each dataItem
    ...
  </...>
  ...
</div>
```
<b>Html attributes reference:</b>

<table>
  <thead>
    <tr>
      <th>attribute</th>
      <th>description</th>
    </tr>
  </thead>
  <tr>
    <td><b>data-...-field</b><br/><b>data-...-expr</b><br/><b>data-...-method</b></td>
    <td>Most attributes can have suffixes <code>-field</code>, <code>-expr</code> or <code>-method</code><br/><code>-field</code> - defines dataItem property name to be used<br/><code>-expr</code> - defines inline expression of dataItem<br/><code>-method</code> - defines external method name with dataItem as argument and return primitive value</td>
  </tr>
  <tr>
    <td colspan="2">
<xmp>
<div data-field="Name"></div>
<th data-sort-expr="smarti.to('yyyy', item.Date)">Year</th>
<script>
var getAmount = function(e) { return e.Amount; }
</script>
<td data-method="getAmount">n2</td>
</xmp>
    </td>
  </tr>
</table>
