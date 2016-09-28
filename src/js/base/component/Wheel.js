define([
    '../core/Setting',
    './Number'
],function(Setting, Number){
    var Wheel = function(context){
        
        var self = this;

        //数字集
        const numbers = Array(10).fill(0).map((_,i)=>i);

        var _dom = null;
        var _isRunning = false;
        var _toStop = false;

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
            if (_toStop) {
                now.animateUp(delay, Setting.animation.TO_TOP, true, function(){
                    prev.unrender();
                });
                next.animateUp(delay, Setting.animation.FROM_BOTTOM, true, function(){
                    _pos = next_pos();
                    _isRunning = false;
                    _toStop = false;
                });
                _dom.removeClass('gradient');
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

        this.startRoll = function(delay){
            //number一个接一个从底向上滑动
            console.log('wheel','roll');
            _dom.addClass('gradient');
            if (_isRunning) {
                return ;
            } else {
                _roll(delay, _pos);
            }
            _dom.addClass('rolling');
        }

        this.stopRollWithNumber = function(stop_number){
            //stop with number
            console.log('wheel','stop roll');
            _toStop = true;
            _dom.removeClass('rolling');
        }

        this.render = function($parent){
            $parent.append(_dom);
        }
    };

    return Wheel;
});