define([
    '../core/Setting'
],function(ui){
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
                _dom = ui.createNumber(_number);
            }
        }
    }

    return Number;
});