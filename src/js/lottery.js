define([
    'jquery',
    './base/Context'
], function($, Context) {
    console.log('worked');
    $.fn.extend({
        lottery: function() {
            
            return this;
        }
    });
});