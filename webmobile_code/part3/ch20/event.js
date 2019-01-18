$(document).on("pageinit","#page1",function(){
	$("p").on("swiperight",function(){alert("向右滑动!");});
	$("p").on("tap",function(){alert("点击事件!");});
	$("p").on("taphold",function(){alert("长按事件!");});
	});
//滚动事件，滚动事件和滑动事件有冲突
//$(document).on("scrollstart",function(){alert("开始滚动！");}); 
//方向事件 
$(window).on("orientationchange",function(event)
	{ if (event.orientation == 0 || event.orientation == 180){
        Alert( 'portrait');}
    else if (event.orientation == 90 || event.orientation == -90){
        alert( 'landscape');}});
//页面事件
$(document).on("pagebeforecreate",function(event){
	alert("触发 pagebeforecreate 事件！");
	}); 
$(document).on("pagecreate",function(event){
	alert("触发 pagecreate 事件！");
	});
$(document).on("pageinit",function(event){
	alert("触发 pageinit 事件！")
	});

