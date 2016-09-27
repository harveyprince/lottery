define([
    'jquery',
    './module/number'
], function($, Number) {
    console.log('worked');
    $.fn.extend({
        lottery: function() {
            console.log('lottery');
            var number = new Number();
            number.talk();
            return this;
        }
    });
});