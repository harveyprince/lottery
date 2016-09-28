define([
    '../core/Setting'
],function(Setting){
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

    return Rocker;
});