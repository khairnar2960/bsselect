/**
 * @package	BSSelect v1.6.0
 * @author	Harshal Khairnar
 * @link	https://harshalkhairnar.com
 * Copyright 2022 HitraA Technologies
 * Licensed under MIT
 **/
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BSSelect = factory());
})(this, (function() {
	'use strict';

	function BSSelect(selector, options = {}) {
		if (undefined === selector) { return; }
		let element;

		function isElement(selector) {
			if (selector && 'function' !== typeof selector && 'object' === typeof selector && selector.nodeType) {
				return true;
			}
			return false;
		}

		function hide() {
			element.style.display = 'none';
		};

		function show() {
			element.style.display = 'block';
		};
		if (isElement(selector)) {
			element = selector;
		} else if (typeof selector == 'string') {
			element = document.querySelector(selector);
			if (!isElement(element)) {
				return;
			}
		}
		let elementClass = element.getAttribute('class');
		if (elementClass) {
			if (elementClass.match(/sm/)) {
				options.size = 'sm';
			} else if (elementClass.match(/lg/)) {
				options.size = 'lg';
			}
		}
		let inputSize = '',
			selectSize = '',
			listSize = '';
		if (options.size) {
			if (options.size == 'sm') {
				inputSize = 'form-control-sm';
				selectSize = 'form-select-sm';
				listSize = 'rounded-1 p-1 small';
			} else if (options.size == 'lg') {
				inputSize = 'form-control-lg';
				selectSize = 'form-select-lg';
				listSize = 'rounded-2';
			} else {
				inputSize = '';
				selectSize = '';
				listSize = 'rounded-3 py-1';
			}
		} else {
			inputSize = '';
			selectSize = '';
			listSize = 'rounded-2';
		}
		this.option = element.options[element.selectedIndex];
		this.value = element.options[element.selectedIndex].value;
		const parent = this;
		const defaultOptions = element.options;
		if (!element.id) {
			element.id = `bs-select-${Math.random().toString(36).slice(2)}`;
		}
		const selectSearch = document.createElement('div');
		selectSearch.setAttribute('class', 'bs-select-container position-relative');
		selectSearch.setAttribute('data-bs-target', element.id);
		const select = document.createElement('div');
		select.setAttribute('class', `form-select ${selectSize}`);
		select.setAttribute('data-bs-toggle', 'collapse');
		select.setAttribute('data-bs-target', `#${element.id}-rendered`);
		select.type = 'button';
		const selected = document.createElement('div');
		selected.setAttribute('class', 'selected text-nowrap');
		selected.value = (this.value);
		selected.innerText = (this.option.innerText);
		selected.style.textOverflow = 'ellipsis';
		selected.style.overflowX = 'clip';
		select.append(selected);

		const collapse = document.createElement('div');
		collapse.setAttribute('class', 'collapse position-absolute mt-1 w-100');
		collapse.id = `${element.id}-rendered`;
		collapse.style.zIndex = 1;
		const card = document.createElement('div');
		card.setAttribute('class', 'px-2 small text-nowrap card card-body');
		const optionSearcher = document.createElement('input');
		optionSearcher.setAttribute('class', `form-control ${inputSize} bs-select-search`);
		optionSearcher.type = 'search';
		optionSearcher.placeholder = 'Search option';
		optionSearcher.addEventListener('input', function() {
			const text = this.value;
			if (text.length) {
				selectSearch.querySelectorAll('.bs-select-option').forEach(op => {
					if (!op.innerText.toLowerCase().includes(text.toLowerCase())) {
						op.style.display = 'none';
					} else {
						op.style.display = '';
					}
				});
			} else {
				selectSearch.querySelectorAll('.bs-select-option').forEach(op => {
					op.style.display = '';
				});
			}
		});
		card.append(optionSearcher);
		const optionsList = document.createElement('ul');
		optionsList.setAttribute('class', 'list-group list-group-flush mt-1 border-0 bs-selector');
		optionsList.style.maxHeight = '300px';
		optionsList.style.overflowY = 'auto';
		optionsList.style.overflowX = 'hidden';
		Object.values(defaultOptions).forEach(op => {
			let li = document.createElement('li');
			li.setAttribute('class', `list-group-item ${listSize} border-0 bs-select-option`);
			li.setAttribute('data-bs-value', op.value);
			li.style.textOverflow = 'ellipsis';
			li.style.overflowX = 'clip';
			li.style.cursor = 'pointer';
			li.innerText = op.innerText;
			li.addEventListener('click', function() {
				optionsList.querySelectorAll('.bs-select-option').forEach(o => {
					o.classList.remove('active');
				});
				this.classList.add('active');
				parent.value = element.value = op.value;
				parent.option = op;
				selected.value = op.value;
				selected.innerText = op.innerText;
				element.dispatchEvent(new Event('change'));
			});
			li.addEventListener('mouseover', function() {
				this.style.backgroundColor = 'rgb(69 144 255 / 70%)';
				this.style.color = 'rgb(255 255 255)';
			});
			li.addEventListener('mouseout', function() {
				this.style.backgroundColor = '';
				this.style.color = '';
			});
			optionsList.append(li);
		});
		if (undefined === globalThis.bootstrap) {
			throw new ReferenceError('bootstrap not defined');
		} else {
			card.append(optionsList);
			collapse.append(card);
			selectSearch.append(select);
			selectSearch.append(collapse);
			element.after(selectSearch);
			hide();
		}
		document.addEventListener("click", function(event) {
			if (!event.target.classList.contains('bs-select-search') && bootstrap.Collapse.getInstance(collapse)) {
				bootstrap.Collapse.getInstance(collapse).hide();
			}
		});
	}
	BSSelect.version = '1.6.0';
	return BSSelect;
}));