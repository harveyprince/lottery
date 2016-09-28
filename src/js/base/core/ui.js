define([
    'jquery'
], function($){
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

    return ui;
});