define([
    'jquery',
    './component/SlotMachine'
],function($, SlotMachine){
    var Context = function($node){
        
        var self = this;

        this.slot = null;

        var _min = 0;
        var _max = 999;

        this.initialize = function(options){
            self.slot = new SlotMachine(self);
            self.slot.initialize(options);
            if (options && options.width) {
                _max = 10*options.width - 1;
            }
            self.slot.render($node);
        }

        this.start = function(){
            self.slot.startRoll();
        }

        this.stop = function(){
            var number = _min + Math.floor(Math.random()*(_max-_min+1));
            self.slot.stopRollWithNumber(number);
        }

        this.stopWithNumber = function(number){
            self.slot.stopRollWithNumber(number);
        }

    };

    return Context;
});