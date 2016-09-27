define([], function(){
    var Number = function(){
        var self = this;
        this.talk = function(){
            console.log('talk');
        }
    }

    return Number;
});