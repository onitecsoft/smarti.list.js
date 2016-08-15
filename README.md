# smarti.list.js `Development`

JQuery list/grid tool. Provides behaviours for any kind of items iterating controls

Automatically initializes when page is loaded. If content was loaded within ajax request, call JQuery extension method `smarti()` on container: `$(container).smarti();`

<b>Dependencies:</b> [smarti.data.js](https://github.com/onitecsoft/smarti.data.js), [smarti.to.js](https://github.com/onitecsoft/smarti.to.js)

<b>Structure:</b>
```html
<div data-name="..." data-smarti="list" ...> <!--container-->
  ...
  <... data-item="true"> <!--this element will be repeated for each dataItem-->
    ...
  </...>
  ...
</div>
```
<b>Container html attribute reference:</b>

<table>
  <thead>
    <tr>
      <th>attribute</th>
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
    <td>Toggles sorting. Accept values: <code>true|false|multi</code>. Default: <code>true</code></td>
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
  <tr>
    <td><b>data-selectable</b></td>
    <td>Toggles selecting. Accept values: <code>true|false|multi</code>. Default: <code>false</code></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-smarti="list" data-name="list" data-selectable="true"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-select-class</b></td>
    <td>Defines css class name for selected item. Default: <code>selected</code></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-smarti="list" data-name="list" data-selectable="true" data-select-class="selected-item"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
</table>

<b>Inner elements html attribute reference:</b>

<table>
  <thead>
    <tr>
      <th>attribute</th>
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
&lt;td data-expr="item.Amount"&gt;Total: {0:n2}&lt;/td&gt;
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
  <tr>
    <td><b>data-group-(field|expr|method)</b></td>
    <td>Defines grouping (element will be repeated for each group)</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-group-expr="smarti.to('yyyy',item.Date)"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-sort</b></td>
    <td>Defines default sorting. Accept values: <code>asc|desc</code>. Used with <code>data-sort-...</code> or <code>data-group-...</code> attributes</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;th data-sort-field="Date" data-sort="asc"&gt;Date&lt;/th&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-select-all</b></td>
    <td>Defines "sellect all items" behaviour on element mouseclick</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;th data-select-all="true"&gt;&lt;input type="checkbox" /&gt;&lt;/th&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-select</b></td>
    <td>Defines "sellect item" behaviour on element mouseclick</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;td data-select="true"&gt;&lt;input type="checkbox" /&gt;&lt;/td&gt;
&lt;tr data-select="true"&gt;
...
&lt;/tr&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-show-(field|expr|method)</b></td>
    <td>Defines condition if element can be rendered. Supposed return value type: <code>bool</code></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-show-expr="item.Name!=null"&gt;
...
&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-attr-&lt;attribute name&gt;-(field|expr|method)</b></td>
    <td>Defines html attributes that depend on data.</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;div data-field="Amount" data-attr-style-expr="item.Amount &gt; 999 ? 'color:red' : ''"&gt;n2&lt;/div&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-aggr-(sum|avg|min|max|first|last)-(field|expr|method)</b></td>
    <td>Defines aggregate to be calculated for current group or total summary and displays it<br/><code>first</code>, <code>last</code> and <code>count</code> aggregates already exists in summary/group (can be displayed with <code>data-(field|expr|method)</code> attribute)<br/><b>Aggregates are supposed to be used outside <code>data-item="true"</code> element</b></td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;td data-field="first.Name"&gt;&lt;/td&gt;
&lt;td data-aggr-sum-field="Amount"&gt;n2&lt;/td&gt;
&lt;td data-field="count"&gt;Total rows: {0}&lt;/td&gt;
</pre>
    </td>
  </tr>
  <tr>
    <td><b>data-aggr-custom-method</b></td>
    <td>Defines custom aggregate method with arguments: <code>index</code>, <code>dataItem</code> and <code>group</code><br/>Calculated with every iterated dataItem value should be assigned to custom property of <code>group</code><br/>Use <code>data-(field|expr|method)</code> attribute to display calculated value</td>
  </tr>
  <tr>
    <td colspan="2">
<pre lang="html">
&lt;script&gt;
  var custom_method = function(i, item, group) {
    group.custom_field = group.custom_field || 0;
    group.custom_field += item.Amount;
  }
&lt;/script&gt;
&lt;td data-aggr-custom-method="custom_method" data-field="custom_field"&gt;Total: {0:n2}&lt;/td&gt;
</pre>
    </td>
  </tr>
</table>
