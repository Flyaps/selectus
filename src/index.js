require('./main.styl');

import $ from 'jquery';


console.log('$', $);

let plugin = (pluginName, className, shortHand = false) => {
   let dataName = `__${pluginName}`;
   let old = $.fn[pluginName];


   $.fn[pluginName] = function (option) {
      return this.each(function () {
         let $this = $(this);
         let data = $this.data(dataName);
         let options = $.extend({}, className.DEFAULTS, $this.data(), typeof option === 'object' && option);

         if (!data) {
            $this.data(dataName, (data = new className(this, options)));
         }

         if (typeof option === 'string') {
            data[option]();
         }
      });
   };

   // - Short hand
   if (shortHand) {
      $[pluginName] = (options) => $({})[pluginName](options);
   }

   // - No conflict
   $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}

class Selectus {

   constructor(element, options) {

      const $element = $(element);

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

Selectus.DEFAULTS = {
   offset: 100,
   speed: 500,
};

plugin('selectus', Selectus);

export default Selectus;