/**
 * Created by Administrator on 2016/7/12 0012.
 */
function getEle(str,aParent){
    var arr=str.match(/\S+/g);//['#div1','ul','li','.box']
    var aParent=aParent||[document];//初始默认的父
    var aChild=[];	//存返回来的子

    for(var i=0;i<arr.length;i++){
        aChild = getByStr(aParent,arr[i]);
        aParent = aChild;
    }

    return aChild;
}
function getByStr(aParent,str){
    var aChild=[];//存抓到的子
    //父抓子
    for(var j=0;j<aParent.length;j++){
        //aParent[j]	==	每一个父
        switch(str.charAt(0)){//子有几种情况id class tagname
            case '#'://id	==	#div1
                var obj = document.getElementById(str.substring(1));
                obj && aChild.push(obj);
                break
            case '.'://class
                var aEle=getByClass(aParent[j],str.substring(1));
                for(var i=0;i<aEle.length;i++){
                    aChild.push(aEle[i]);
                }
                break
            default://tagname
                if(/\w+#\w+/.test(str)){//div#div1
                    var arr=str.split('#');//['div','div3']
                    var aEle=aParent[j].getElementsByTagName(arr[0]);
                    for(var i=0;i<aEle.length;i++){
                        if(aEle[i].id==arr[1]){
                            aChild.push(aEle[i]);
                        }
                    }
                }else if(/\w+\.\w+/.test(str)){//div.box
                    var arr=str.split('.');//[div,box]
                    var aEle=aParent[j].getElementsByTagName(arr[0]);
                    var re = new RegExp('\\b'+arr[1]+'\\b');
                    for(var i=0;i<aEle.length;i++){
                        if(re.test(aEle[i].className)){
                            aChild.push(aEle[i]);
                        }
                    }
                }else if(/\w+\[\w+=\w+\]/.test(str)){//div[title=test]
                    var arr=str.split(/\[|=|\]/g);//[div,title,test]
                    var aEle=aParent[j].getElementsByTagName(arr[0]);
                    for(var i=0;i<aEle.length;i++){
                        if(aEle[i].getAttribute(arr[1])==arr[2]){
                            aChild.push(aEle[i]);
                        }
                    }
                }else if(/\w+\:\w+(\(.\))?/.test(str)){
                    //	div:first/last/odd/even/div:eq(n)/lt(n)/gt(n)
                    var arr=str.split(/\:|\(|\)/g)//['div','lt','3']
                    var aEle=aParent[j].getElementsByTagName(arr[0]);
                    if(aEle.length==0) return [];
                    switch(arr[1]){
                        case 'first':
                            aChild.push(aEle[0]);
                            break;
                        case 'last':
                            aChild.push(aEle[aEle.length-1]);
                            break;
                        case 'odd':
                            for(var i=0;i<aEle.length;i++){
                                if(i%2==1){
                                    aChild.push(aEle[i]);
                                }
                            }
                            break;
                        case 'even':
                            for(var i=0;i<aEle.length;i+=2){
                                aChild.push(aEle[i]);
                            }
                            break;
                        case 'eq':
                            aEle[arr[2]] && aChild.push(aEle[arr[2]]);
                            break;
                        case 'lt':
                            for(var i=0;i<arr[2];i++){
                                aChild.push(aEle[i]);
                            }
                            break;
                        case 'gt':
                            if(parseInt(arr[2])<0) return [];
                            for(var i=parseInt(arr[2])+1;i<aEle.length;i++){
                                aChild.push(aEle[i]);
                            }
                            break;
                    }
                }else{
                    var aEle=aParent[j].getElementsByTagName(str);
                    for(var i=0;i<aEle.length;i++){
                        aChild.push(aEle[i]);
                    }
                }
        }
    }

    return aChild;
}
function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return 	oParent.getElementsByClassName(sClass);
    }

    var aEle=oParent.getElementsByTagName('*');
    var result=[];
    var re=new RegExp('\\b'+sClass+'\\b');
    for(var i=0;i<aEle.length;i++){
        if(re.test(aEle[i].className)){
            result.push(aEle[i]);
        }
    }
    return result;
}
function ready(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',fn,false);
    }else{
        document.attachEvent('onreadystatechange',function(){
            if(document.readyState=='complete'){
                fn();
            }
        });
    }
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
function addEvent(obj,sEvt,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEvt,function(ev){
            if(fn.call(obj,ev)==false){  //绑定时间的时候看是否需要阻止冒泡和默认
                ev.cancelBubble=true;//阻止冒泡
                ev.preventDefault();//阻止默认 for FF
            }
        },false);
    }else{
        //obj.attachEvent('on'+sEvt,fn.call(obj));//call会马上执行
        obj.attachEvent('on'+sEvt,function(){
            if(fn.call(obj,event)==false){
                event.cancelBubble=true;//阻止冒泡for IE,chorm
                return false;//阻止默认
            }
        });
    }
}
function move(obj,json,opational){

    opational=opational||{};
    opational.time=opational.time||300;
    opational.fn=opational.fn||null;
    opational.type=opational.type||'ease-out';
    var start={};
    var dis={};
    for(var key in json){
        start[key]=parseFloat(getStyle(obj,key));
        dis[key]=parseFloat(json[key])-start[key];
    }

    var count=Math.round(opational.time/30);
    var n=0;

    clearInterval(obj.timer);
    obj.timer=setInterval(function(){

        n++;

        for(var key in json){

            //var cur=start[key]+n*dis[key]/count;
            switch(opational.type){
                case 'linear':
                    var a=n/count;
                    var cur=start[key]+dis[key]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[key]+dis[key]*a*a*a;
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[key]+dis[key]*(1-a*a*a);
                    break;
            }


            if(key=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity='+cur*100+')';
            }else{
                obj.style[key]=cur+'px';
            }
        }


        if(n==count){
            clearInterval(obj.timer);
            opational.fn && opational.fn();
        }

    },30);
}
function ajax(options){
    options=options||{};
    if (!options.url) {return};
    options.data=options.data||{};
    options.type=options.type||'get';
    options.timeout=options.timeout||0;
    options.success=options.success||null;
    options.error=options.error||null;


    options.data.t=Math.random();

    //0.整理接口
    var arr=[];
    for(var key in options.data){
        arr.push(key+'='+encodeURIComponent(options.data[key]))
    }
    var str=arr.join('&');


    //1创建ajax对象
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }
    if(options.type=='get'){
        //2.连接
        oAjax.open('get',options.url+'?'+str,true);
        //3.请求
        oAjax.send();
    }else{
        //2.连接
        oAjax.open('post',options.url,true); //true 异步加载
        //oAjax.setRequestHeader('属性',值)
        oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');	//设定头信息
        //3.请求
        oAjax.send(str);		//post在这里传数据
    }
    //4.接收
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            clearTimeout(timer);
            if(oAjax.status>=200&oAjax.status<300||oAjax.status==304){
                options.success&&options.success(oAjax.responseText);
            }else{
                options.error && options.error(oAjax.status);
            }

        }
    };
    if(options.timeout){
        var timer=setTimeout(function(){
            alert('超时了');
            oAjax.abort();	//中断加载

        },options.timeout);
    }
}
//构造函数		创建	o 	o
function zQuery(args){

    this.elements=[];//给o o 对象做了一个elements属性，装元素
    switch(typeof args){
        case 'function':
            ready(args);  // jq里$表示ready状态
            break;
        case 'string': //如果传的是字符就获取元素
            this.elements=getEle(args);
            break;
        case 'object':
            if('length' in args){//判断传过来的对象是一个还是多个
                this.elements=args;//包装this.elements引用args
            }else{
                this.elements.push(args);//包装
            }
            break;
    }
}
function $(args){
    return new zQuery(args);
}

//原型
zQuery.prototype.css=function(ar1,ar2){
    if(arguments.length==2){//2
        //修改
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style[ar1]=ar2;
        }
    }else{//1
        if(typeof ar1=='string'){//获取
            return getStyle(this.elements[0],ar1);
        }else if(typeof ar1=='object'){//批量设置
            for(var i=0;i<this.elements.length;i++){
                for(var key in ar1){
                    this.elements[i].style[key]=ar1[key];
                }
            }
        }
    }
};
zQuery.prototype.attr=function(ar1,ar2){
    if(arguments.length==2){//2
        //修改
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].setAttribute(ar1,ar2);
        }
    }else{//1
        if(typeof ar1=='string'){//获取
            return this.elements[0].getAttribute(ar1);
        }else if(typeof ar1=='object'){//批量设置
            for(var i=0;i<this.elements.length;i++){
                for(var key in ar1){
                    this.elements[i].setAttribute(key,ar1[key]);
                }
            }
        }
    }
};
'click/mouseover/mouseout/contextmenu'.replace(/\w+/g,function(sEvt){
    zQuery.prototype[sEvt]=function(fn){//sEvt----符合规则的字符 click  mouseover ……
        for(var i=0;i<this.elements.length;i++){
            addEvent(this.elements[i],sEvt,fn);
        }
    };
});
zQuery.prototype.toggle=function(){
    //arguments	[fn0	fn1	fn2	]
    //arguments[0]()
    //arguments[当前按钮被点击的次数%arguments.length]()
    var args=arguments;
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].count=0;
        addEvent(this.elements[i],'click',function(ev){
            if(args[this.count%args.length].call(this,ev)==false){
                this.count++;
                return false;
            }else{
                this.count++;
            }

        })
    }
};
zQuery.prototype.mouseenter=function(fn){
    for(var i=0;i<this.elements.length;i++){
        addEvent(this.elements[i],'mouseover',function(ev){
            //来自哪？是自己，或子集--return
            var oFrom=ev.fromElement||ev.relatedTarget;
            if(oFrom && this.contains(oFrom)) return;
            fn && fn();
        });
    }
};
zQuery.prototype.mouseleave=function(fn){
    for(var i=0;i<this.elements.length;i++){
        addEvent(this.elements[i],'mouseout',function(ev){
            //来自哪？是自己，或子集--return
            var oTo=ev.toElement||ev.releatedTarget;
            if(oTo && this.contains(oTo)) return;
            fn && fn();
        });
    }
};
zQuery.prototype.hover=function(fn1,fn2){
    this.mouseenter(fn1);
    this.mouseleave(fn2);
};
zQuery.prototype.eq=function(n){
    return $(this.elements[n])//返回oo对象
};
zQuery.prototype.get=function(n){
    return this.elements[n] //返回原生对象
};
zQuery.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';
    }
};
zQuery.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
};
zQuery.prototype.find=function(str){//在当前元素下继续找 $('#div').find('ul li.active')
    return $(getEle(str,this.elements));//修改getEle
};
zQuery.prototype.index=function(){
    //this.elements[0]	==	div
    //this.get(0)		==	div
    var oParent = this.elements[0].parentNode;//找父级，是一个
    var aChild = oParent.children;	//找一级子，是一堆
    for(var i=0;i<aChild.length;i++){//遍历判断每个子是不是
        if(aChild[i]==this.elements[this.elements.length-1]){
            return i;
        }
    }
};
zQuery.prototype.addClass=function(sClass){
    var re = new RegExp('\\b'+sClass+'\\b');
    for(var i=0;i<this.elements.length;i++){
        if(!re.test(this.elements[i].className)){
            this.elements[i].className=this.elements[i].className+' '+sClass;
        }
        this.elements[i].className=this.elements[i].className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');//整理格式
    }

};
zQuery.prototype.removeClass=function(sClass){
    var re = new RegExp('\\b'+sClass+'\\b');
    for(var i=0;i<this.elements.length;i++){
        if(re.test(this.elements[i].className)){
            this.elements[i].className=this.elements[i].className.replace(re,'');
        }
        this.elements[i].className=this.elements[i].className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
        if(!this.elements[i].className){
            this.elements[i].removeAttribute('class');
        }
    }

};
zQuery.prototype.hasClass=function(sClass){
    var re = new RegExp('\\b'+sClass+'\\b');
    var bl=false;
    for(var i=0;i<this.elements.length;i++){
        if(re.test(this.elements[i].className)){
            return true;
        };
    }
    return false;
};
zQuery.prototype.toggleClass=function(sClass){
    for(var i=0;i<this.elements.length;i++){
        if($(this.elements[i]).hasClass(sClass)){
            $(this.elements[i]).removeClass(sClass);
        }else{
            $(this.elements[i]).addClass(sClass);
        }
    }
};
zQuery.prototype.each=function(fn){
    for(var i=0;i<this.elements.length;i++){
        fn.call(this.elements[i],i,this.elements[i]);
    }
};
$.fn=zQuery.prototype;	//把往ZQ里新增的函数引用指向原型
zQuery.prototype.extend=function(json){//$().extend({key:fn})
    for(var key in json){
        zQuery.prototype[key]=json[key];
    }
};
zQuery.prototype.animate=function(json,opational){
    for(var i=0;i<this.elements.length;i++){
        move(this.elements[i],json,opational);
    }
};

$.ajax=ajax;

