require.config({
  baseUrl: 'src/js',
  name: 'lottery',
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery'
  },
  shim: {
    
  },
  out: 'dist/lottery-release.js'
});

require(['jquery', 'lottery'], function ($) {
  $('#root').lottery();
});
