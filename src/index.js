require('./main.styl');

import {debounce, throttle} from 'lodash';
import $ from 'jquery';

const selectedItemClass = 'selectus__selected-item';
const dropdownOpenClass = 'selectus_dropdown-open';
const tabSelectedClass = 'selectus__tab_selected';
const listSelectedClass = 'selectus__list_selected';
const itemSelectedClass = 'selectus__item_selected';
const manySelectedItemsExpandClass = 'selectus_many-selected-items_expand';
const moreLoaderClass = 'selectus__more_loader';

class Selectus {

   constructor(element, options) {

      const self = this;

      self.options = options;

      let $element = $(element);

      let $input;

      if ($element.is('input[type="hidden"]')) {

         $input = $element;

         $element = $(`<div class="selectus">${options.mainHTML}<div>`);

         $input.before($element);

         $element.append($input);

      } else {

         $element
           .addClass('selectus')
           .append(options.mainHTML);

         $input = $('<input type="hidden">');

         $element.append($input);

      }

      self.elements = {
         $element,
         $window: $(window),
         $selectedItems: $element.find('.selectus__selected-items'),
         $dropdown: $element.find('.selectus__dropdown'),
         $title: $element.find('.selectus__title'),
         $numWrap: $element.find('.selectus__num-wrap'),
         $num: $element.find('.selectus__num'),
         $currentType: $element.find('.selectus__current-type'),
         $tabs: $element.find('.selectus__tabs'),
         $lists: $element.find('.selectus__lists'),
         $input
      };

      const {
              elements: {
                $window,
                $dropdown,
                $currentType
              }
            } = self;

      self.updateHTMLData();

      // dropdown

      $element.on('click', '.selectus__current-type', (e) => {
         e.preventDefault();

         if ($element.hasClass(dropdownOpenClass)) {

            self.hideDropdown();

         } else {

            self.showDropdown();

         }

      });

      // tabs

      $element.on('click', '.selectus__tab', (e) => {

         e.preventDefault();

         const $self = $(e.target);

         if ($self.hasClass(tabSelectedClass)) {
            return;
         }

         $self
           .addClass(tabSelectedClass)
           .siblings()
           .removeClass(tabSelectedClass);

         const index = $self.index();

         $currentType.html($self.html());

         const $list = $element.find('.selectus__list').eq(index);

         $list.siblings().removeClass(listSelectedClass);

         $list.show();

         $list.height();

         $list.addClass(listSelectedClass);

         self.setSelectedItemsOfCurrentTab();

      });

      $element.on('click', '.selectus__item', (e) => {

         const $self = $(e.currentTarget);

         $self.toggleClass(itemSelectedClass);

         if ($self.hasClass(itemSelectedClass)) {
            self.addSelectedItem($self.data('id'), $.trim($self.html()));
         } else {
            self.removeSelectedItem($self.data('id'));
         }

         self.setNumSelectedItems();

      });

      $element.on('click', '.selectus__selected-item-remove', e => {

         setTimeout(() => {
            const $item = $(e.currentTarget).parent();

            self.removeSelectedItem($item.data('id'));

            self.setNumSelectedItems();
         });

      });

      $element.on('click', '.selectus__expand', e => {

         e.preventDefault();

         $element.addClass(manySelectedItemsExpandClass);

      });

      $element.on('click', '.selectus__collapse', e => {

         e.preventDefault();

         $element.removeClass(manySelectedItemsExpandClass);

      });

      $window.on('transitionend webkitTransitionEnd  MSTransitionEnd', e => {

         const $self = $(e.target);

         // dropdown

         if ($self.is($dropdown)) {
            if (!$element.hasClass(dropdownOpenClass)) {
               $self.hide();
            }
         }

         // tabs

         if ($self.is('.selectus__list')) {
            if (!$self.hasClass(listSelectedClass)) {
               $self.hide();
            }
         }

      });

      $window.on('click', e => {

         if (!$(e.target).closest($element).length) {

            self.hideDropdown();

         }

      });

      $window.on('resize', debounce(self.updateSelectedItemsWidth.bind(self), 150));
   }

   setValuesToInput() {

      const {
              elements: {
                $lists,
                $input
              }
            } = this;

      const value = $lists
        .find(`.${listSelectedClass} .${itemSelectedClass}`)
        .map((i, el) => {
           return $(el).data('id');
        })
        .get()
        .join(',');

      $input.val(value);

   }

   addSelectedItem(id, name) {

      const {
              elements: {
                $selectedItems
              }
            } = this;


      if ($selectedItems.find(`.${selectedItemClass}[data-id="${id}"]`).length) {
         return;
      }

      const $item = `<span class="selectus__selected-item" data-id="${id}">${name}<span class="selectus__selected-item-remove fa fa-times"></span></span>`

      $selectedItems.append($item);

      this.setValuesToInput();
   }

   removeSelectedItem(id) {

      const {
              elements: {
                $selectedItems,
                $lists
              }
            } = this;


      const $item = $selectedItems.find(`.${selectedItemClass}[data-id="${id}"]`);

      if (!$item.length) {
         return;
      }

      $item.remove();

      $lists
        .find(`.${listSelectedClass} .${itemSelectedClass}[data-id="${id}"]`)
        .removeClass(itemSelectedClass);

      this.setValuesToInput();

   }

   setNumSelectedItems() {

      const {
              elements: {
                $numWrap,
                $num,
                $lists
              }
            } = this;

      let num = $lists.find(`.${listSelectedClass} .${itemSelectedClass}`).length;

      if (num) {

         $num.html(`${num}`);

         $numWrap.show();

      } else {

         $num.html(``);

         $numWrap.hide();

      }

   }

   setSelectedItemsOfCurrentTab() {

      const self = this;

      const {
              elements: {
                $selectedItems,
                $lists
              }
            } = this;

      $selectedItems.empty();

      $lists
        .find(`.${listSelectedClass} .${itemSelectedClass}`)
        .each((i, item) => {

           const $item = $(item);

           self.addSelectedItem($item.data('id'), $.trim($item.html()));

        });

      this.setValuesToInput();

      this.setNumSelectedItems();

   }

   updateSelectedItemsWidth() {

      const {
              elements: {
                $element,
                $selectedItems
              }
            } = this;


      const $item = $selectedItems.find('.selectus__selected-item:last-child');

      if (!$item.length) {
         return;
      }

      const rightВorderSelectusPosition = $element.offset().left + $element.innerWidth();

      const rightВorderSelectedLastItemPosition = $item.offset().left + $item.innerWidth() + 3;

      if (rightВorderSelectedLastItemPosition > rightВorderSelectusPosition) {

         $element.addClass('selectus_many-selected-items');

      } else {

         $element.removeClass('selectus_many-selected-items');

      }

   }

   showDropdown() {

      const {
              elements: {
                $element,
                $dropdown
              }
            } = this;

      if ($element.hasClass(dropdownOpenClass)) {
         return;
      }

      $dropdown.show();

      $element.addClass(dropdownOpenClass);

   }

   hideDropdown() {

      const {
              elements: {
                $element
              }
            } = this;

      if (!$element.hasClass(dropdownOpenClass)) {
         return;
      }

      $element.removeClass(dropdownOpenClass);

   }

   addItemsToList(items, $items) {

      if (!items.length) {
         return;
      }

      let html = '';

      items.forEach(item => {

         let additionalClass = '';

         if (item.selected) {
            additionalClass = ` ${itemSelectedClass}`;
         }

         html += `<p class="selectus__item${additionalClass}" data-id="${item.id}">${item.name}</p>`;

      });

      const $lastChild = $items.find('selectus__item:last-child');

      if ($lastChild.length) {

         $lastChild.append(html);

      } else {

         $items.prepend(html);

      }

   }

   getRemoteData(options, callbackBefore = () => {}, callbackAfter = () => {}) {

      let self = this;

      let data = {
         q: options.term,
         p: options.page,
         n: options.numPerPage
      };

      if (options.data) {
         data = options.data({
            term: options.term,
            page: options.page,
            num: options.numPerPage
         });
      }

      if (options.ajax && options.ajax.abort) {
         options.ajax.abort();
      }

      options.ajax = $.ajax({
         url: options.url,
         data
      });

      callbackBefore();

      options.ajax.then(data => {

         data = {
            items: [
               {
                  id: 10,
                  name: '12345677645345345',
                  selected: true
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 10,
                  name: '12345677645345345',
                  selected: true
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               },
               {
                  id: 12,
                  name: '12345'
               },
               {
                  id: 11,
                  name: '12345'
               }
            ]
         }

         if (options.processResults) {
            data = options.processResults(data)
         }

         self.addItemsToList(data, options.$items);

         callbackAfter(data);

      });

   }

   updateHTMLData() {

      const self = this;

      const {
              options,
              elements: {
                $title,
                $currentType,
                $tabs,
                $lists
              }
            } = self;

      $title.html(options.typesName);

      $currentType.html(options.data[0].name);

      options.data.forEach((o, i) => {

         const $tab = $(`<a class="selectus__tab" href>${o.name}</a>`);

         const $list = $('<div class="selectus__list" style="display: none;">\
                             <div class="selectus__items"></div>\
                          </div>');

         if (i === 0) {

            $tab.addClass('selectus__tab_selected');

            $list
              .addClass('selectus__list_selected')
              .removeAttr('style');

         }

         $tabs.append($tab);

         $lists.append($list);

         if (o.ajax) {

            const $search = $(`<div class="selectus__search">\
                                 <input class="selectus__search-input" placeholder="Start to type">\
                               </div>`);

            $list.prepend($search);

            const $searchInput = $search.find('.selectus__search-input');

            let options = {
               url: o.ajax.url,
               page: 1,
               numPerPage: o.ajax.numPerPage || 30,
               delay: o.ajax.delay || 150
            }

            if (o.ajax.data) {
               options.data = o.ajax.data
            }

            if (o.ajax.processResults) {
               options.processResults = o.ajax.processResults
            }

            const $more = $(`<div class="selectus__more"><a href class="selectus__show-more">Show more</a><span class="selectus__loader"></span></div>`);

            const $items = $list.find('.selectus__items');

            options.$items = $items;

            $searchInput.on('keyup', debounce(e => {

               const isLetter = (e.which >= 48 && e.which <= 90) || e.which === 8;

               if (!isLetter) {
                  return;
               }

               const val = $.trim($searchInput.val());

               $.extend(options, {
                  term: val,
                  page: 1
               });

               self.getRemoteData(
                 options,
                 ()=> {

                    $items.empty();

                 },
                 () => {

                    if ($items.get(0).scrollHeight > $items.innerHeight()) {

                       $items.append($more);

                    }

                 }
               );

            }, options.delay));

            const pointDistanceToBottom = 100;

            $items.on('scroll', throttle(() => {

               const correntDistanceToBottom = $items.get(0).scrollHeight - ($items.scrollTop() + $items.innerHeight());

               if (correntDistanceToBottom > pointDistanceToBottom) {
                  return;
               }

               $more.addClass(moreLoaderClass);

               if (options.ajax && options.ajax.readyState !== 4) {
                  return;
               }

               $.extend(options, {
                  page: options.page + 1
               });

               self.getRemoteData(
                 options,
                 ()=> {},
                 (data) => {

                    if (data.length < options.numPerPage) {

                       $more.remove();

                       $items.off('scroll');

                    } else {

                       $more.removeClass(moreLoaderClass);

                    }

                 }
               );
               
            }, self.options.loadingPointFromBottom));

         } else {

            self.addItemsToList(o.items, $list.find('.selectus__items'));

         }

      });

      self.setSelectedItemsOfCurrentTab();

   }

   getMoreInfo($items) {


   }

   val() {

      const {
              elements: {
                $input
              }
            } = this;

      return $input.val();

   }

}

Selectus.defaults = {
   offset: 100,
   loadingPointFromBottom: 150,
   mainHTML: '<div class="selectus__brief">\
                 <p class="selectus__current">\
                    <a href class="selectus__current-type"></a>\
                    <span class="selectus__num-wrap" style="display: none;">(<span class="selectus__num"></span>):</span>\
                 </p>\
                 <div class="selectus__selected-items"></div>\
                 <a class="selectus__expand" href>expand</a>\
                 <a class="selectus__collapse" href>collapse</a>\
              </div>\
              <div class="selectus__dropdown">\
                 <div class="selectus__head">\
                    <h3 class="selectus__title"></h3>\
                    <div class="selectus__tabs"></div>\
                 </div>\
                 <div class="selectus__lists"></div>\
              </div>'
};

const pluginName = 'selectus'

$.fn[pluginName] = function (option) {
   return this.each((i, el) => {

      let $this = $(el);
      let data = $this.data(`__${pluginName}`);

      if (!data) {
         let options = $.extend({}, $.fn[pluginName].defaults, typeof option === 'object' && option);

         $this.data(`__${pluginName}`, (data = new Selectus(el, options)));
      }

      if (typeof option === 'string') {
         data[option]();
      }

   });
};

$.fn[pluginName].defaults = Selectus.defaults;

// - No conflict
$.fn[pluginName].noConflict = () => $.fn[pluginName] = old;

export default Selectus;