$(document).ready(function() {
	
	var shijian=1000  //呼吸速度
	var jiange=2000  //自动运行间隔时间


	var nowimg = 0;
    var mytimer = null;

    //设置定时器
    mytimer=window.setInterval(autoplay,jiange)

    $(".rightbut").click(autoplay);

    //设置鼠标进入离开定时器开关的
	$(".banner").mouseenter(
		function(){
			window.clearInterval(mytimer);
		}
	);
    $(".banner").mouseleave(
		function(){
			mytimer = window.setInterval(autoplay,jiange);
		}
	);


    function autoplay(){
					if(nowimg < $(".banner_img ul li").length - 1){
						nowimg = nowimg + 1;
					}else{
						nowimg = 0;
					}
					$(".banner_img ul li").eq(nowimg-1).animate({"opacity":0},shijian);
					$(".banner_img ul li").eq(nowimg).animate({"opacity":1},shijian);

					//设置小圆点的语句：
					$("#lvbodian a").eq(nowimg).addClass("current").siblings().removeClass("current");
				}
	$(".leftbut").click(function()
	{
			if(nowimg > 0){
				nowimg = nowimg - 1;
			}else{
				nowimg = $(".banner_img ul li").length - 1;
			}
			
			if(nowimg == $(".banner_img ul li").length - 1){
				$(".banner_img ul li").eq(0).animate({"opacity":0},shijian);
				$(".banner_img ul li").eq(nowimg).animate({"opacity":1},shijian);
			}else{
				$(".banner_img ul li").eq(nowimg + 1).animate({"opacity":0},shijian);
				$(".banner_img ul li").eq(nowimg).animate({"opacity":1},shijian);
			}

			//设置小圆点的语句：
			$("#lvbodian a").eq(nowimg).addClass("current").siblings().removeClass("current");

		}
	);
	$("#lvbodian a").click(
		function(){
			$(".banner_img ul li").eq(nowimg).animate({"opacity":0},shijian);
			nowimg = $(this).index();
			$(".banner_img ul li").eq(nowimg).animate({"opacity":1},shijian);

			//设置小圆点的语句：
			$("#lvbodian a").eq(nowimg).addClass("current").siblings().removeClass("current");
		}
	);
});