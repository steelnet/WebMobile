window.onload=change;

function change() {
	var tag=document.getElementsByTagName("p"); //tag是p标签数组
	tag[0].onclick=n1;
	tag[1].onclick=n2;
	function n1() 
			{
				tag[0].style.color="red";
			}
					
	function n2() 
			{
				tag[1].style.color="blue";
			}
}
