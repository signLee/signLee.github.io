jsonp(
    'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    {wd:'迅雷'},
    function(json){
        alert(json.s);
    },
    function(){
        alert('超时了');
    },
    'cb',
    1000
);
function jsonp(url,data,success,error,cbKey,timeout){  //核心思想，本地请求跨域的后台数据后，后台会传值 并调用本地的函数
    //整理data
    var cbValue='jsonp'+Math.random();  //生成一个随机的函数名
    data[cbKey]=cbValue.replace('.','');//去掉随机数里的点  定义cb里的value
    window[data[cbKey]]=function(a){   //创建名字为随机的函数  服务器调用的本地函数是这个 a传为全局变量后用于接收从服务器返回的 json
        success(a);// 在success后要清空自己 所以把回调的success放进一个函数里 success(a)相当于闭包
        clearInterval(timer);  //成功了就清除失败的函数的定时器
        document.getElementsByTagName('head')[0].removeChild(oSc);//去除创建的script
        window[data[cbKey]]=null;//清空函数  为了提升性能
    }
    var arr=[];
    for(var key in data){
        arr.push(key+'='+encodeURIComponent(data[key]));  //取出后 arr  key=value
    }
    url=url+'?'+arr.join('&'); //url : http://www.baidu.com?key=value
    //创建script标签丢到head里
    var oSc=document.createElement('script');
    oSc.src=url;
    document.getElementsByTagName('head')[0].appendChild(oSc);//页面script创建后会去找网络上的src地址   接口返回的值会回调成功函数
    //超时
    if(timeout){
        var timer=setTimeout(function(){
            error();
            window[data[cbKey]]=function(){};  //清除成功函数 如果设为null  接口回调会失败，函数置为空后依然会回调  因为src更新后请求就发发出
        },timeout);
    }
}

