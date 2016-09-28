(function (factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {
  'use strict';

    //Required easing functions
	if( typeof $.easing.easeOutBounce!=="function" ){
		//From jQuery easing, extend jQuery animations functions
		$.extend( $.easing, {
			easeOutBounce: function (x, t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
		});
	}
    
    var ui = {
        createNumber: function(number){
            const numbers = Array(10).fill(0).map((_,i)=>i);
            let num = numbers.indexOf(number)>-1?number:0;
            return $('<div>').addClass('num').addClass('num'+num);
        },
        createWheel: function(){
            return $('<div>').addClass('wheel');
        },
        createRocker: function(){
            return $('<div>').addClass('rocker');
        },
        createSlotMachine: function(){
            return $('<div>').addClass('slotMachine');
        },
        createButton: function(name, tag, click){
            return $('<button>').addClass('btn-'+tag).text(name).click(click);
        }
        
    };

    var Setting = {
        version: '1.0.0',
        ui: ui,
        animation: {
            TO_TOP: 'toTop',
            FROM_BOTTOM: 'fromBottom'
        }
    }

    var Number = function(wheel){

        var self = this;

        var _number = 0;

        var _dom = null;

        this.initialize = function(number){
            _number = number;
            self.createDOM();
        }
        
        this.createDOM = function(){
            if (!_dom) {
                _dom = Setting.ui.createNumber(_number);
            }
        }

        this.render = function($parent){
            $parent.append(_dom);
            return self;
        }

        this.unrender = function(){
            _dom.remove();
        };

        //展现之前的隐藏处理
        this.setTop = function(top){
            _dom.css('margin-top',top);
            return self;
        }

        this.check = function(num){
            return _number === num;
        }

        /**
         * animate
         * 动画分为两个阶段，从底部隐藏位置到中间位置，从中间位置到顶部隐藏位置
         * type:
         *      toTop
         *      fromBottom
         * bouncable
         *      是否回弹
         *  
         */
        this.animateUp = function(delay, type, bouncable, callback){
            switch(type){
                case Setting.animation.TO_TOP://to top
                    const h = _dom.height();
                    if (bouncable) {
                        _dom.animate({
                            marginTop: -h
                        }, delay*5, 'easeOutBounce', callback);
                    } else {
                        _dom.animate({
                            marginTop: -h
                        }, delay, callback);
                    }
                    
                    break;
                case Setting.animation.FROM_BOTTOM://from bottom
                    if (bouncable) {
                        _dom.animate({
                            marginTop: 0
                        }, delay*5, 'easeOutBounce', callback);
                    } else {
                        _dom.animate({
                            marginTop: 0
                        }, delay, callback);
                    }
                    break;
                default:
                    break;
            }
            
            return self;
        }

    }

    var Wheel = function(context){
        
        var self = this;

        //数字集
        const numbers = Array(10).fill(0).map((_,i)=>i);

        var _dom = null;
        var _isRunning = false;
        var _toStop = false;
        var _stopNum = -1;

        //数字集指针
        var _pos = 0;

        //单个滚轮上的所有数字对象
        var $numbers = numbers.map(function(item){
            let number = new Number(self);
            number.initialize(item);
            return number;
        });

        var prev_pos = function(){
            return (_pos - 1 + 10)%10;
        };

        var next_pos = function(){
            return (_pos + 1)%10;
        };

        this.initialize = function(number){
            self.createDOM();
            if (typeof number === 'number') {
                _pos = numbers.indexOf(number);
                _pos = _pos>-1?_pos:0;
            }
            
            $numbers[_pos].render(_dom);
        }

        this.createDOM = function(){
            if (!_dom) {
                _dom = Setting.ui.createWheel();
            }
        }

        var _roll = function(delay, pos){
            _isRunning = true;
            var prev = $numbers[prev_pos()];
            var now = $numbers[pos];
            var next = $numbers[next_pos()];
            next.setTop(_dom.height()).render(_dom);
            if (_toStop && (_stopNum === -1 || next.check(_stopNum))) {
                _dom.removeClass('rolling');
                now.animateUp(delay, Setting.animation.TO_TOP, true, function(){
                    prev.unrender();
                });
                next.animateUp(delay, Setting.animation.FROM_BOTTOM, true, function(){
                    _pos = next_pos();
                    _isRunning = false;
                    _toStop = false;
                    _stopNum = -1;
                    now.unrender();
                    _dom.removeClass('gradient');
                    
                });
                return ;
            }
            now.animateUp(delay, Setting.animation.TO_TOP, false, function(){
                prev.unrender();
            });
            next.animateUp(delay, Setting.animation.FROM_BOTTOM, false, function(){
                _pos = next_pos();
                _roll(delay, _pos);
            });
            
        };

        this.isRunning = function(){
            return _isRunning;
        }

        this.startRoll = function(delay){
            //number一个接一个从底向上滑动
            _dom.addClass('gradient');
            if (_isRunning) {
                return ;
            } else {
                _roll(delay, _pos);
            }
            _dom.addClass('rolling');
        }

        this.stopRoll = function(){
            if (_isRunning) {
                _stopNum = -1;
                _toStop = true;
            }
            
        }

        this.stopRollWithNumber = function(stop_number){
            //stop with number
            if (_isRunning) {
                _stopNum = stop_number;
                _toStop = true;
            }
        }

        this.render = function($parent){
            $parent.append(_dom);
        }
    };

    var Rocker = function(context){

        var self = this;

        var _dom = null;
        var _button = null;

        var _isRunning = false;

        const toggleBeginConf = [
            '开始',//name
            'begin',//tag
            function(){//click
                if (!context.slot.isRunning()) {
                    context.start();
                    console.log('begin');
                    _isRunning = true;
                    self.renderButton();
                }
            }
        ];

        const toggleStopConf = [
            '结束',//name
            'end',//tag
            function(){//click
                if (context.slot.isRunning()) {
                    context.stop();
                    console.log('end');
                    _isRunning = false;
                    self.renderButton();
                }
            }
        ];

        this.initialize = function(){
            self.createDOM();
        }

        this.createDOM = function(){
            if (!_dom) {
                _dom = Setting.ui.createRocker();
                self.renderButton();
            }
        }

        this.renderButton = function(){
            let btn = Setting.ui.createButton.apply(Setting.ui, _isRunning?toggleStopConf:toggleBeginConf);
            if (!_button) {
                _dom.append(btn);
            }else{
                _button.replaceWith(btn);
            }
            _button = btn;
        }

        this.render = function($parent){
            $parent.append(_dom);
        }
    };

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
            
            $wheels = Array(_options.width).fill(0).map(t=>{
                let wheel = new Wheel(context);
                wheel.initialize();
                return wheel;
            });

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
            return $wheels.some(t=>t.isRunning());
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
                }, 700*idx);
                
            })
        }
    };

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

    };

    console.log('worked');
    $.fn.extend({
        lottery: function(options) {
            var context = new Context(this);
            context.initialize(options);
            return context;
        }
    });

}));
