define([
    '../core/Setting'
],function(Setting){
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
            console.log('number','render');
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

        /**
         * animate
         * 动画分为两个阶段，从底部隐藏位置到中间位置，从中间位置到顶部隐藏位置
         */
        this.animateUpToTop = function(delay, callback){
            const h = _dom.height();
            _dom.animate({
                marginTop: -h
            }, delay, callback);
            return self;
        }

        this.animateUpFromBottom = function(delay, callback){
            _dom.animate({
                marginTop: 0
            }, delay, callback);
            return self;
        }

    }

    return Number;
});