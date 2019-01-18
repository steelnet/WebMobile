window.onload=change;

function change() {
var tag=document.getElementsByTagName("h1"); //tag是h1标签数组
tag[0].onclick=n1;
tag[1].onclick=n2;
function n1() 
		{
			tag[0].style.color="red";}
				
function n2() 
			{
			tag[1].style.color="blue";}





//Tag[0].style.color=“red”; //给第一个p标签文本设置红色

//var h1=document.getElementById("myMessage"); 
//h1.onclick=function() {
//alert("Hi");
//h1.style.color="red";}
}
