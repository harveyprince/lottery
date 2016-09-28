define([
    'jquery',
    './base/Context'
], function($, Context) {
    console.log('worked');
    $.fn.extend({
        lottery: function() {
            var context = new Context(this);
            context.initialize();
            return this;
        }
    });
});