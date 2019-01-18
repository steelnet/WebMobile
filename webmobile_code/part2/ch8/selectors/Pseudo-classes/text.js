window.onload=show;

function show() {
var tt=document.getElementById("tt");
tt.onmouseover=function () {tt.className="";}
tt.onmouseout=function () {tt.className="tshadow";}
}