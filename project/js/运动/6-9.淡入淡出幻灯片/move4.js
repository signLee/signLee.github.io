

function move(obj,attr,iTarget,time){
	var start=parseFloat(getStyle(obj,attr));
	var dis=iTarget-start;
	var count=Math.round(time/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		//办事
		var cur=start+n*dis/count;
		if(attr=='opacity'){
			obj.style.opacity=cur;
			obj.style.filter='alpha(opacity:'+cur*100+')';
		}else{
			obj.style[attr]=start+n*dis/count+'px';
		}
		
		
		
		if(n==count){
			clearInterval(obj.timer);
		}
	},30);
}

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
}