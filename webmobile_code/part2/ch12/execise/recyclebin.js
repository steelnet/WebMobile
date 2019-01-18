
//dataTransfer对象 : 连接拖拽细节的 ，在event对象下面的  
  
window.onload = function(){  
    var aLi = document.getElementsByTagName('li');  
    var oDiv = document.getElementById('div1');  
    var iNow = 0;  
      
    var targetLi = null;  
      
    for(var i=0;i<aLi.length;i++){  
      
        aLi[i].ondragstart = function(ev){ //拖拽前触发  
          
            this.style.background = 'yellow';  
              
            ev.dataTransfer.setData('text',this.innerHTML);  //存储一个键值对 : value值必须是字符串  
              
            targetLi = this;  
          
        };  
          
        aLi[i].ondragend = function(){  //拖拽结束触发  
          
            this.style.background = '';  
          
        };  
    }  
      
    oDiv.ondragenter = function(){  //相当于onmouseover  
          
        this.style.background = 'green';  
          
    };  
      
    oDiv.ondragleave = function(){  //相当于onmouseout  
          
        this.style.background = 'red';  
          
    };  
      
    oDiv.ondragover = function(ev){ //进入目标、离开目标之间，连续触发  
          
        ev.preventDefault();  //阻止默认事件：元素就可以释放了  
          
          
    };  
      
    oDiv.ondrop = function(ev){  //释放鼠标的时候触发  
      
        this.style.background = 'red';    
      
        var oText = ev.dataTransfer.getData('text');  
      
        if(targetLi){  
            targetLi.parentNode.removeChild(targetLi);  
            this.innerHTML = '删除的是:'+oText;  
        }  
      
    };  
      
};  
