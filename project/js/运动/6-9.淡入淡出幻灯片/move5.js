
function move(obj,json,time){
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		//办事
		for(var key in json){
			var cur=start[key]+n*dis[key]/count;//每次运动到哪
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=start[key]+n*dis[key]/count+'px';
			}
		}
		
		if(n==count){//停止条件
			clearInterval(obj.timer);
		}
	},30);
}

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
}