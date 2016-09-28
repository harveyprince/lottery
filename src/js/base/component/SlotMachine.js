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

        this.isRunning = function(){
            return $wheels.every(t=>t.isRunning());
        }

        this.startRoll = function(){
            if (!self.isRunning()) {
                $wheels.forEach((wheel)=>{
                    wheel.startRoll(_options.delay);
                });
            }
            
        }

        this.stopRoll = function(){
            $wheels.forEach((wheel)=>{
                wheel.stopRoll();
            })
        }

        this.stopRollWithNumber = function(stop_number){
            //进行数字拆分
            let s_num = stop_number.toString();
            if (s_num.length > _options.width) {
                //长度与预设不符，无响应
                return ;
            }
            var list = s_num.split('');
            var res = [];
            Array(_options.width).fill(0).forEach(()=>{
                var c = list.pop();
                //补位
                res.push(c?c:'0');
            });
            //倒序合并
            s_num = res.reverse().join('');
            console.log(s_num);
            $wheels.forEach((wheel,idx)=>{
                const num = parseInt(s_num[idx]);
                setTimeout(()=>{
                    wheel.stopRollWithNumber(num);
                }, 1000*idx);
                
            })
        }
    };

    return SlotMachine;
});