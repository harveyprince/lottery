define([
    'jquery',
    './ui'
],function($, ui){
    var Setting = {
        version: '1.0.0',
        ui: ui,
        animation: {
            TO_TOP: 'toTop',
            FROM_BOTTOM: 'fromBottom'
        }
    }
    
    return Setting;
});