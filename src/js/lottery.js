define([
    'jquery',
    './base/Context'
], function($, Context) {
    console.log('worked');
    $.fn.extend({
        lottery: function(options) {
            var context = new Context(this);
            context.initialize(options);
            return context;
        }
    });
});