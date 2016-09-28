define([
    '../core/Setting',
    './Wheel',
    './Rocker'
],function(Setting, Wheel, Rocker){
    var SlotMachine = function(context){

        var self = this;

        var _dom = null;

        var $wheels = [];
        var rocker = null;

        var _options = {
            width: 3, //3位数
            tool: true,
            delay: 100
        }

        this.initialize = function(options){
            _options = $.extend(_options, options);
            //
            console.log('_options',_options);
            
            $wheels = Array(_options.width).fill(0).map(t=>{
                let wheel = new Wheel(context);
                wheel.initialize();
                return wheel;
            });
            console.log('$wheels',$wheels);
            self.createDOM();

            if (_options.tool) {
                if (!rocker) {
                    rocker = new Rocker(context);
                    rocker.initialize();
                    rocker.render(_dom);
                }
            }
        }

        this.createDOM = function(){
            if (!_dom) {
                _dom = Setting.ui.createSlotMachine();
                $wheels.forEach(t=>{
                    t.render(_dom);
                });
            }
        }

        this.render = function($parent){
            $parent.append(_dom);
        }

        this.startRoll = function(){
            $wheels.forEach((wheel)=>{
                wheel.startRoll(_options.delay);
            })
        }

        this.stopRollWithNumber = function(stop_number){
            $wheels.forEach((wheel)=>{
                wheel.stopRollWithNumber();
            })
        }
    };

    return SlotMachine;
});