define([
    'jquery',
    './component/SlotMachine'
],function($, SlotMachine){
    var Context = function($node){
        
        var self = this;

        this.slot = null;

        this.initialize = function(options){
            self.slot = new SlotMachine(self);
            self.slot.initialize(options);

            self.slot.render($node);
        }

        this.start = function(){
            self.slot.startRoll();
        }

        this.stop = function(){
            self.slot.stopRollWithNumber(12);
        }

    };

    return Context;
});