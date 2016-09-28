#Lottery
---
jq plugin version

这边放一个base版本的示例，用这个插件版本完全可以做到，而且更轻松

[演示](http://harveyprince.github.io/lottery/)

#编译项目
	npm install
	bower install
	gulp build

#API
---
项目依赖`JQuery`

	样式
	<link rel="stylesheet" type="text/css" href="lottery.css"  />

	脚本
	<script src='bower_components/jquery/dist/jquery.js'></script>
	<script src='lottery.js'></script>


使用方式如下

	var $lottery = $('#root').lottery({
    	width: 2,//位数
	    tool: true,//是否使用插件自带控件（开始停止
	    delay: 100 //轮转的速度延迟
	});
	也可以缺省使用默认设置
	var $lottery = $('#root').lottery();

然后可以使用`$lottery`对象进行一系列操作
##context
---
在表层可以直接进行启动、停止的操作
###start()
	$lottery.start();
	启动
###stop()
	$lottery.stop();
	停止，随机数
###stopWithNumber()
	$lottery.stopWithNumber();
	以给定的数值停止
	用这个方法就可以个人随意设置数值范围，随机的逻辑，基本上没有扩展插件的必要

##slot-machine
---
以防万一，可以进一步操作内部控件$lottery.slot对象，但是不推荐，按个人喜好扩展吧
