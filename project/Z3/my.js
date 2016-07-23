$(document).ready(function() {
	

        	$(".work_bottom_c ul li a").hover(function() {
        		$(this).children('i').stop().animate({top:0},400)

        	}, function() {
        		$(this).children('i').stop().animate({top:"-200px"},400)
        	});

        	$(".zixun_buttom ul li a").hover(function() {
        		$(this).children('i').stop().animate({top:0},400);

         }, function() {
        		$(this).children('i').stop().animate({top:"-120px"},400);
        	});
  /*---------------------------偏移------------------------*/
         var $bannertop=$(".banner").height();
          var $ustop=$(".us").offset().top;
          var $worktop=$(".work").offset().top;
          var $servicetop=$(".service").offset().top;
          var $zixuntop=$(".zixun").offset().top;
          var $contacttop=$(".contact").offset().top;

          $(window).scroll(function(){
                var $pianyi=$(document).scrollTop();

                if($bannertop<=$pianyi)
                {
                    var $index=0;
                    $index++;
                                
                    $(".nav").css({position:"fixed",top:0});
                   /* $(".nav_content ul li.back").stop().animate({left:130*$index},500);
                      $(".nav_content ul li").eq($index).addClass('current').siblings().removeClass('current');
                   */
                    /*  $(".nav_content ul li a").each(function(index, event) {
             
                     
      

                      
                          
                        if($ustop<=$pianyi)
                        {  
                               
                                $(".nav_content ul li.back").stop().animate({left:130},500);
                                $(".nav_content ul li a").addClass('current').siblings().removeClass('current');
                        }

                       if($worktop<=$pianyi)
                        {  
                             $(".nav_content ul li.back").stop().animate({left:130},500);
                             $(".nav_content ul li a").addClass('current').siblings().removeClass('current');
                        }

                       if($servicetop<=$pianyi)
                        {
                          
                             $(".nav_content ul li.back").stop().animate({left:130},500);
                             $(".nav_content ul li a").addClass('current').siblings().removeClass('current');
                        }
                        if($zixuntop<=$pianyi)
                        {
                           
                             $(".nav_content ul li.back").stop().animate({left:130},500);
                             $(".nav_content ul li a").addClass('current').siblings().removeClass('current');
                        }
                    });*/
                      
                 }
                
              else{
                  $(".nav").css({position:"static"});
                  $(".nav_content ul li.back").stop().animate({left:0},500);
                  $(".nav_content ul li").eq(0).addClass('current').siblings().removeClass('current');
                }
               
          })

	/*---------------------------鼠标经过 导航栏时，跟随事件------------------------*/
               $(".nav_content ul li a").each(function(index, event) {
               		$(this).mouseover(function(event) {
               			$(".nav_content ul li.back").stop().animate({left:130*index},500);
               			$(this).parent().addClass('current').siblings().removeClass('current');
               		});

               });

                $(".nav_content ul li a").eq(0).click(function(){

                     var $backtop=$(".banner").offset().top;
                    $("html,body").animate({scrollTop:$backtop},1000);
                    $(".nav_content ul li.back").stop().animate({left:"130px"},500);
                    $(this).parent().addClass('current').siblings().removeClass('current');

               })

               $(".nav_content ul li a").eq(1).click(function(){
                    var $backtop=$(".us").offset().top;

                    $("html,body").animate({scrollTop:$backtop},1000);
                    $(".nav_content ul li.back").stop().animate({left:"130px"},500);
                    $(this).parent().addClass('current').siblings().removeClass('current');

               })
                $(".nav_content ul li a").eq(2).click(function(){
                    var $backtop=$(".work").offset().top;

                    $("html,body").animate({scrollTop:$backtop},1000);
                     $(".nav_content ul li.back").stop().animate({left:"130px"},500);
                    $(this).parent().addClass('current').siblings().removeClass('current');

               })
              $(".nav_content ul li a").eq(3).click(function(){
                    var $backtop=$(".service").offset().top;

                    $("html,body").animate({scrollTop:$backtop},1000);
                     $(".nav_content ul li.back").stop().animate({left:"130px"},500);
                    $(this).parent().addClass('current').siblings().removeClass('current');

               })
              $(".nav_content ul li a").eq(4).click(function(){
                    var $backtop=$(".zixun").offset().top;

                    $("html,body").animate({scrollTop:$backtop},1000);
                     $(".nav_content ul li.back").stop().animate({left:"130px"},500);
                    $(this).parent().addClass('current').siblings().removeClass('current');

               })
               $(".nav_content ul li a").eq(5).click(function(){
                    var $backtop=$(".contact").offset().top;

                    $("html,body").animate({scrollTop:$backtop},1000);
                    $(".nav_content ul li.back").stop().animate({left:"130px"},500);
                    $(this).parent().addClass('current').siblings().removeClass('current');

               }) 



/*---------------------------tab栏切换------------------------*/
        $(".us_right a").each(function(index, el) {
           $(this).click(function(event) {
             $(".us_left_co1").eq(index).fadeIn(600).siblings().fadeOut(600);
             $(".us_right a").eq(index).addClass('current_1').siblings().removeClass('current_1')
           });
        });


       $(".service_right a").each(function(index, el) {
           $(this).click(function(event) {
             $(".service_left_ds1").eq(index).fadeIn(200).siblings().fadeOut(200);
             $(".service_right a").eq(index).addClass('current').siblings().removeClass('current')
           });
        });
 	
/*------------------------------------------案例轮播----------------------------------*/
    var $index=0;
    $("#rightwork").click(function(event) {
           $index++;
           if($index>5)
           {
              $index=5;
           }
           $(".work_bottom_c ul").stop().animate({left:-980*$index},500);
           $(".title_right_l li").eq($index).addClass('red').siblings().removeClass('red');



     });

    $("#leftwork").click(function(event) {
       $index--;
       if($index<0)
       {
          $index=0;
       }
       $(".work_bottom_c ul").stop().animate({left:-980*$index},500);
       $(".title_right_l li").eq($index).addClass('red').siblings().removeClass('red');
    });


   $(".title_right_l li").click(function(event) {
         $num=$(this).index();
         $(".work_bottom_c ul").stop().animate({left:-980*$num},500);
         $(this).addClass('red').siblings().removeClass('red')
         $index=$num;
      });



/*------------------------------------------最新资讯----------------------------------*/
     $(".zixun_right .one").click(function(event) {
          var $index=$(this).index();
          $index--;
         
          $(".zixun_buttom ul").animate({left:-980*$index},500);
          $(this).addClass('red').siblings().removeClass('red');

          jj=$index;
      });

      var jj;
      var tt
      $(".zixun_right .two").click(function(){
           jj--;
           if(jj<0)
           {
              jj=0;
           }
          $(".zixun_buttom ul").animate({left:-980*jj},500);
          $(".zixun_right .one").eq(jj).addClass('red').siblings().removeClass('red');
          tt=jj;
      })
     $(".zixun_right .three").click(function(){
           tt++;
           if(tt>1)
           {
              tt=1;
           }
          $(".zixun_buttom ul").animate({left:-980*tt},500);
          $(".zixun_right .one").eq(tt).addClass('red').siblings().removeClass('red');
      })

/*------------------------------------------显示内容----------------------------------*/


      


   
 /*------------------------------------------返回顶部----------------------------------*/ 
      $(".back_top span").click(function(event) {
          $("html,body").stop().animate({scrollTop:0},800);
     });  
    

});

