//url,data,type,timeout,success,error	-->	options
function ajax(options){
	
	//-1.	整理options
	options	=	options || {};
	if(!options.url) return;
	options.data = options.data || {};
	options.type = options.type || 'get';
	options.timeout = options.timeout || 0;
	
	//0.整理data
	options.data.t=Math.random();
	
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));//解决中文乱码问题
	}
	var str = arr.join('&');
	
	//1.创建ajax
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');//for IE
	}
	
	if(options.type=='get'){//根据type建立连接，发送请求
		//2.
		oAjax.open('get',options.url+'?'+str,true);//true 是否异步加载
		//3.
		oAjax.send();	
	}else{
		//2.
		oAjax.open('post',options.url,true);
		//设置请求头信息
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		//3.
		oAjax.send(str);	
	}
	
	
	//4.接收
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				
				options.success && options.success(oAjax.responseText);
			}else{
				options.error && options.error(oAjax.status);	
			}
		}
	};
	
	//5.超时
	if(options.timeout){
		var timer=setTimeout(function(){
			alert('超时了');
			oAjax.abort();//中断ajax请求
		},options.timeout);
	}
	
	
}







