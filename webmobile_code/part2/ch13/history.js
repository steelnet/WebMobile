"use strict";
    // Goes back
function back () {
    history.back ();
}
// Goes forward
function ff () {
    history.forward ();
}

function start() {
  var pageUrl = document.getElementById('url');
  var innerPage=document.getElementById("content");
     // 在客户端模拟一些页面内容
 var  contentState = {
        "page1":  '这是第一页：historyAPI介绍页' ,
        "page2":  '这是第二页：演示history奇迹的地方' ,
       "page3":  '这是第三页：我的博客，介绍如何应用HTML5 的history API 技术',
        "page4": '这是第四页：请看看我的照片',
		"history": '这是我的网页首页'
		};
getContent(location.pathname);
    //更新页面
  function getContent(url) { 
      var page;
      var path=url.split('/')    
      if (path.length>=3)
      {page=path[2].split('.')[0];} else {page=path[1];}  
	var ct=contentState[page];	
    // Updating Content on Page
     pageUrl.innerHTML =url;
     innerPage.innerHTML=ct;	   
   };
    // This is fired when history.back or history.forward is called
    window.addEventListener ('popstate', function (event) {
        var hs = history.state;
        if (hs !== null) {getContent(location.pathname)} else {location.href='history.html';} //更新内容碎片或返回首页
    });

    $("a").click(function (event) {   
        // Prevents url reload
        event.preventDefault();
        // Gets url of the page
        var a = event.target;
        var url = a.getAttribute ('href');
        // Getting Content
        getContent(url);
        // Creates a new history instance and it saves state on it
        history.pushState (contentState[url], null, url);
    });
};