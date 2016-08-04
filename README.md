# smarti.list.js

JQuery list/grid tool. Provides behaviours for any kind of items iterating controls

Automatically initializes when page is loaded. If content was loaded within ajax request, call JQuery extension method `smarti()` on container: `$(container).smarti();`

<b>Dependencies:</b> [smarti.data.js](https://github.com/onitecsoft/smarti.data.js), [smarti.to.js](https://github.com/onitecsoft/smarti.to.js)

<b>Structure:</b>
```html
<div data-name="..." data-smarti="list" ...> //container
  ...
  <... data-item="true"> //this element will be repeated for each dataItem
    ...
  </...>
  ...
</div>
```
<b>Html attribute reference:</b>

<table>
  <thead>
    <tr>
      <th>container attribute</th>
      <th>description</th>
    </tr>
  </thead>
  <tr>
    <td><b>data-name</b></td>
    <td>Defines javascript instance name of type <code>smarti.list</code></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-smarti="list" data-name="list"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-data</b></td>
    <td>Defines javascript variable name that contains array of data being populated (global scope)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var data = [{...}, {...}, ...];
&lt;/script&gt;
&lt;div data-smarti="list" data-name="list" data-data="data"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-sortable</b></td>
    <td>Defines sorting. Accept values: <code>true|false|multi</code>. Default: <code>true</code></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-smarti="list" data-name="list" data-sortable="multi"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <thead>
    <tr>
      <th>inner element attribute</th>
      <th>description</th>
    </tr>
  </thead>
  <tr>
    <td><b>data-...-field</b><br/><b>data-...-expr</b><br/><b>data-...-method</b></td>
    <td>Most attributes can have suffixes <code>-field</code>, <code>-expr</code> or <code>-method</code><br/><code>-field</code> - defines dataItem property name to be used<br/><code>-expr</code> - defines inline expression (dataItem is accessible by <code>item</code> variable)<br/><code>-method</code> - defines external method name with dataItem as argument and return primitive value</td>
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
  <tr>
    <td><b>data-(field|expr|method)</b></td>
    <td>Displays defined value of dataItem inside element (innerHtml represents format pattern)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;td data-field="Amount"&gt;n2&lt;/td&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-sort-(field|expr|method)</b></td>
    <td>Defines sorting behaviour on element mouseclick</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;th data-sort-field="Date"&gt;Date&lt;/th&gt;
</pre>
    </td>
  </tr>
</table>
