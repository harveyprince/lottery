define(function(){
    var ui = {
        createNumber: function(number){
            const numbers = Array(10).fill(0).map((_,i)=>i);
            return $('<div>').addClass('num').addClass('num'+numbers.indexOf(number)>-1?number:0);
        },
        createWheel: function(){
            return $('<div>').addClass('wheel');
        },
        createRocker: function(){
            //
        },
        createSlotMachine: function(){
            return $('<div>').addClass('slotMachine');
        }
        
    };

    return ui;
});