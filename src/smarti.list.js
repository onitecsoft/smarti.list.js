var smarti = window['smarti'] || {};

$(function () {
	if (!smarti.initialized) {
		smarti.initialized = true;
		$('[data-smarti]').smarti();
	}
})

$.fn.smarti = function () {
	$.each(this.selector == '[data-smarti]' ? this : this.find('[data-smarti]'), function () {
		var jq = $(this);
		var opts = jq.data();
		window[opts.name] = new smarti[opts['smarti']](jq, opts);
	});
}

smarti.ico = {
	desc: '<svg style="{0}" width="6" height="6"><path d="M3,0 L6,6 L0,6 Z" /></svg>',
	asc: '<svg style="{0}" width="6" height="6"><path d="M3,6 L0,0 L6,0 Z" /></svg>'
}

smarti.list = function (jq, opts) {
	var that = this;
	this.sortable = true;
	$.extend(that, opts);
	this.data = this.data ? smarti.data.get(this.data, window) || [] : [];
	this.selectClass = this.selectClass || 'selected';
	this.container = jq;
	this.template = this.container.children().remove();
	this.container.on('click', '[data-sort-field]', function (e) {
		if (that.sortable) {
			var f = $(this).data('sortField');
			for (var i = 0; i < that.sorting.length; i++) {
				var s = that.sorting[i];
				if (s.field == f) s.dir = s.dir == 'asc' ? 'desc' : (s.dir == 'desc' && that.sortable == 'multi' ? null : 'asc');
				else if (that.sortable != 'multi') s.dir = null;
			}
			smarti.data.sort(that.sorting, { method: function (e) { return e.dir == null } });
			that.load();
		}
	}).on('click', '[data-select-all]', function (e) {
		if (that.selectable) {
			var c = $(this).children(':checkbox')[0] || this;
			if (!$(e.target).is(':checkbox')) c.checked = !c.checked;
			that.selectAll(c.checked);
		}
	}).on('click', '[data-select]', function (e) {
		if (that.selectable) {
			var i = that.container.find('[data-i=' + $(this).closest('[data-i]').data('i') + ']');
			that.select(i, that.selectable == 'multi');
		}
	}).on('click', '[data-toggler]', function (e) {
		that.container.find('[data-toggled=' + $(this).data('toggler') + ']').toggle();
	});

	this.init = function () {
		that.sorting = [];
		that.gsorting = [];
		that.grouping = [null];
		that.aggregates = {};
		that.filters = [];
		that._list = that._template(that.template);
	}
	this.load = function (data) {
		if (arguments.length > 0) that.data = data || [];
		that.viewData = smarti.data.filter(that.data, that.filters);
		smarti.data.sort(that.viewData, that.gsorting.concat(smarti.data.filter(that.sorting, function (e) { return e.dir })));
		that.container.html(that._list(0, smarti.data.group(that.viewData, that.grouping, that.aggregates, that._item)[0]));
	}
	this.sort = function (options) {
		if (options) {
			if (typeof options == 'string') options = { field: options, method: smarti.data.getter(options) };
			else if (typeof options == 'function') options = { field: '', method: options };
			that.sorting = [].concat(options);
		}
		that.load();
	}
	this.selectAll = function (select) {
		that.container.find('[data-i]').toggleClass(that.selectClass, select);
		that.container.find('[data-select]').children(':checkbox,:radio').prop('checked', select);
	}
	this.select = function (jq, toggle) {
		if (!toggle) that.selectAll(false);
		jq.toggleClass(that.selectClass);
		var c = jq.is('[data-select]') ? jq : jq.find('[data-select]');
		c.children(':checkbox,:radio').prop('checked', jq.hasClass(that.selectClass));
	}
	this.selectedItems = function () {
	}
	this.filter = function (filters) {
		that.filters = [].concat(filters);
		that.load();
	}
	this._template = function (jq) {
		var p = [];
		var s = '\u000B';
		jq = $('<div></div>').append(jq);
		jq.find('*').each(function () {
			var e = $(this);
			var d = e.data();
			var c = this.innerHTML;
			/*if (d.toggler || d.toggled) {
				e.attr('data-toggle' + (d.toggler ? 'r' : 'd'), s + p.length + s);
				p.push(function (k, v) { return (v.level || '') + k });
			}*/
			if (d.groupField || d.groupExpr || d.groupMethod) {
				e.replaceWith(s + p.length + s);
				var g = that._getter(d.groupField, d.groupExpr, d.groupMethod, e, 'group');
				var t = that._template(e);
				that.grouping.push(g);
				if (d.sort) that.gsorting.push({ method: g, dir: d.sort });
				p.push(function (k, v) {
					var b = '';
					for (var i = 0, l = v.items.length; i < l; i++) b += t(i, v.items[i]);
					return b;
				});
				return;
			}
			if (d.item) {
				e.replaceWith(s + p.length + s);
				e.removeAttr('data-item').attr('data-i', 'true');
				var t = that._template(e);
				that._item = function (i, d, g) { g.body = (g.body || '') + t(i, d) }
				p.push(function (k, v) { return v.body });
				return;
			}
			if (d.showField || d.showExpr || d.showMethod) {
				e.replaceWith(s + p.length + s);
				var g = that._getter(d.showField, d.showExpr, d.showMethod, e, 'show');
				var t = that._template(e);
				p.push(function (k, v) { return g(v) ? t(k, v) : '' });
				return;
			}
			if (d.i) {
				e.attr('data-i', s + p.length + s);
				p.push(function (k, v) { return k });
			}
			if (d.sortExpr || d.sortMethod || d.sortField) {
				if (!d.sortField) d.sortField = that.sorting.length;
				var so = { field: d.sortField, method: that._getter(d.sortField, d.sortExpr, d.sortMethod), dir: d.sort };
				that.sorting.push(so);
				e.attr('data-sort-field', d.sortField);
				if (e.css('position') != 'absolute') e.css({ position: 'relative' });
				this.innerHTML = c + s + p.length + s;
				p.push(function (k, v) { return so.dir ? smarti.to(smarti.ico[so.dir], 'position:absolute;top:3px;left:3px') : '' });
			}
			for (var i in d) {
				if (smarti.data.starts(i, 'aggr')) {
					i = i.substr(4).replace(/(field|expr|method)$/i, '');
					var a = i.toLowerCase();
					that.aggregates[a] = that.aggregates[a] || [];
					var gg = that._getter(d['aggr' + i + 'Field'], d['aggr' + i + 'Expr'], d['aggr' + i + 'Method'], e, 'aggr-' + a);
					if (!d.field) d.field = d['aggr' + i + 'Field'] || 'a' + that.aggregates[a].length;
					if (d['aggr' + i + 'Field']) that.aggregates[a].push(d['aggr' + i + 'Field']);
					else that.aggregates[a].push(a == 'custom' ? gg : that._kvo(d.field, gg));
					if (a != 'custom') d.field = a + '.' + d.field;
				}
				if (smarti.data.starts(i, 'attr')) {
					i = i.substr(4).replace(/(field|expr|method)$/i, '');
					var a = i.toLowerCase();
					var ag = that._getter(d['attr' + i + 'Field'], d['attr' + i + 'Expr'], d['attr' + i + 'Method'], e, 'attr-' + a);
					var av = e.attr(a);
					e.attr(a, (av ? av + ';' : '') + s + p.length + s);
					p.push(function (k, v) { return ag(v) });
				}
			}
			if (d.method || d.expr || d.field) {
				var g = that._getter(d.field, d.expr, d.method, e);
				this.innerHTML = s + p.length + s;
				p.push(function (k, v) { return smarti.to(c, g(v)) });
			}
		});
		var t = jq.length > 0 ? jq[0].innerHTML.split(s) : [''];
		//todo eval
		return function (k, v) {
			var s = '';
			for (var i = 0; i < t.length; i++) s += i % 2 == 0 ? t[i] : p[t[i]](k, v);
			return s;
		};
	}
	this._getter = function (f, e, m, jq, s) {
		if (m) {
			if (jq) jq.removeAttr('data-' + (s ? s + '-' : '') + 'method');
			return smarti.data.get(m, window);
		}
		else if (e) {
			if (jq) jq.removeAttr('data-' + (s ? s + '-' : '') + 'expr');
			return new Function("item", "return " + e);
		}
		else if (f) {
			if (jq) jq.removeAttr('data-' + (s ? s + '-' : '') + 'field');
			return smarti.data.getter(f);
		}
	}
	this._kvo = function (k, v) {
		var o = {};
		o[k] = v;
		return o;
	}
	this.init();
	this.load();
}
