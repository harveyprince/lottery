define(function(){
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