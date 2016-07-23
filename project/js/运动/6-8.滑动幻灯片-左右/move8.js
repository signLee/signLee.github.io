
//time,fn		--	>optional
function move(obj,json,optional){

	optional = optional || {};//整理可选参数
	optional.time = optional.time || 300;
	optional.fn = optional.fn || null;
	optional.type = optional.type||'ease-out';
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(optional.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		//办事
		for(var key in json){
			
			switch(optional.type){//计算运动到哪
				case 'linear'://匀速
					var cur=start[key]+n*dis[key]/count;
					break;	
				case 'ease-in'://加速
					var a=n/count;
					var cur=start[key]+dis[key]*(a*a*a);	//加速
					break;	
				case 'ease-out'://减速
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a);	//减速
					break;	
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}
		}
		
		if(n==count){//停止条件
			clearInterval(obj.timer);
			optional.fn  && optional.fn();
		}
	},30);
}

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
}