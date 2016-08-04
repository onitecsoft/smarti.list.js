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
<pre lang="html">
&lt;div data-field="Name"&gt;&lt;/div&gt;
&lt;th data-sort-expr="smarti.to('yyyy', item.Date)"&gt;Year&lt;/th&gt;
&lt;script&gt;
var getAmount = function(e) { return e.Amount; }
&lt;/script&gt;
&lt;td data-method="getAmount"&gt;n2&lt;/td&gt;
</pre>
    </td>
  </tr>
</table>
