require('./main.styl');

import $ from 'jquery';

class Selectus {

   constructor(element, options) {

      const $element = $(element);

      $element.append(options.mainHTML)

      // dropdown

      const $dropdown = $('.selectus__dropdown');

      const dropdownOpenClass = 'selectus_dropdown-open';

      $element.on('click', '.selectus__current-type', (e) => {
         e.preventDefault();

         if (!$element.hasClass(dropdownOpenClass)) {
            $dropdown.show();
         }

         $element.toggleClass(dropdownOpenClass);
      });

      // tabs

      const tabSelectedClass = 'selectus__tab_selected';
      const listSelectedClass = 'selectus__list_selected';

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

      });

      $(document).on('transitionend webkitTransitionEnd  MSTransitionEnd', (e) => {

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

   }

   static staticMethod() {
      return 'staticMethod';
   }

   prototypeMethod() {
      return 'prototypeMethod';
   }

}

Selectus.defaults = {
   offset: 100,
   speed: 500,
   mainHTML: '<div class="selectus">\
                 <div class="selectus__brief">\
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
                 </div>\
             </div>'
};

const pluginName = 'selectus'

$.fn[pluginName] = function (option) {
   return this.each((i, el) => {

      console.log(arguments);

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