// event listener
this.onmessage = function (event) {
var result,data = event.data;
var a=parseFloat(data.num1);
var b=parseFloat(data.num2);
switch(data.op) {
case '+':
result=a+b;
break;
case '-':
result=a-b;
break;
case '*':
result=a*b;
break;
case '/':
result=a/b;
break;
default:
result="出错了！";
};
self.postMessage(result);
}
