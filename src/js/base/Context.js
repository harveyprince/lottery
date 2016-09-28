define([
    'jquery',
    './component/SlotMachine'
],function($, SlotMachine){
    var Context = function($node){
        
        var self = this;

        var _slot = null;

        this.initialize = function(options){
            _slot = new SlotMachine(self);
            _slot.initialize(options);

            _slot.render($node);
        }

        this.start = function(){
            _slot.startRoll();
        }

        this.stop = function(){
            _slot.stopRollWithNumber();
        }

    };

    return Context;
});