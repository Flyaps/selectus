require('./main.styl');

import $ from 'jquery';

const selectedItemClass = 'selectus__selected-item';
const dropdownOpenClass = 'selectus_dropdown-open';
const tabSelectedClass = 'selectus__tab_selected';
const listSelectedClass = 'selectus__list_selected';
const itemSelectedClass = 'selectus__item_selected';

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
         $currentType: $element.find('.selectus__current-type'),
         $tabs: $element.find('.selectus__tabs'),
         $lists: $element.find('.selectus__lists'),
         $input
      };

      const {
              elements: {
                $dropdown,
                $window
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

         const $currentList = $element.find('.selectus__list').eq(index);

         $currentList.siblings().removeClass(listSelectedClass);

         $currentList.show();

         $currentList.height();

         $currentList.addClass(listSelectedClass);

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

      });

      $element.on('click', '.selectus__selected-item-remove', e => {

         setTimeout(() => {
            const $item = $(e.currentTarget).parent();

            self.removeSelectedItem($item.data('id'));
         });

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
            console.log('hideDropdown');

            self.hideDropdown();
         }

      });
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

   updateHTMLData() {

      const {
              options,
              elements: {
                $element,
                $title,
                $currentType,
                $tabs,
                $lists
              }
            } = this;

      $title.html(options.typesName);

      $currentType.html(options.data[0].name);

      options.data.forEach((o, i) => {

         const $tab = $(`<a class="selectus__tab" href>${o.name}</a>`);

         const $list = $('<div class="selectus__list" style="display: none;">\
                             <div class="selectus__search">\
                                <input class="selectus__search-input">\
                             </div>\
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

         const $items = $list.find('.selectus__items');

         o.items.forEach(item => {

            $items.append(`<p class="selectus__item" data-id="${item.id}">${item.name}</p>`);

         });

      });

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
   speed: 500,
   mainHTML: '<div class="selectus__brief">\
                 <p class="selectus__current">\
                    <a href class="selectus__current-type"></a>\
                    <span class="selectus__num-wrap">(<span class="selectus__num"></span>):</span>\
                 </p>\
                 <div class="selectus__selected-items"></div>\
                 <a class="selectus__more" href></a>\
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

      console.log(typeof option);

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