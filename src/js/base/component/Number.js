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

    return Number;
});