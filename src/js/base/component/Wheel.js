define([
    '../core/Setting',
    './Number'
],function(ui, Number){
    var Wheel = function(context){
        
        var self = this;

        var _dom = null;

        //单个滚轮上的所有数字
        var _numbers = Array(10).fill(0).map(function(item,idx){
            let number = new Number(self);
            number.initialize(idx);
            return number;
        });

        this.initialize = function(){
            
        }

        this.createDOM = function(){
            if (!_dom) {
                _dom = ui.createWheel();
            }
        }

        this.startRoll = function(){
            //number一个接一个从底向上滑动
        }

        this.stopRollWithNumber = function(stop_number){
            //stop with number
        }
    };

    return Wheel;
});