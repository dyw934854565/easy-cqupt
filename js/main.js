// JavaScript Document
function gettime(time){
	var date = new Date();
	var txt='';
	var range = date.getTime()/1000-parseInt(time);
	if(range>60*60*24*365){
	    var n = parseInt(range/(60*60*24*365));
		txt = n+"年前"
	}else if(range>60*60*24*30){
		var n = parseInt(range/(60*60*24*30));
		txt = n+"月前"
	}else if(range>60*60*24){
		var n = parseInt(range/(60*60*24));
		txt = n+"天前"
	}else if(range>60*60){
		var n = parseInt(range/(60*60));
		txt = n+"小时前"
	}else if(range>60){
		var n = parseInt(range/(60));
		txt = n+"分钟前"
	}else{
		txt = "刚刚";
	}
	return txt;
}
function imgload(url,ele){
	var img = new Image();
 
   // 改变图片的src
   img.src = url;
   if(img.width>img.height){
	  $(ele).css('width','100%');
	  $(ele).css('margin-top',($(ele).parent().height()-$(ele).height())/2+'px');
   }else{
	  $(ele).css('height','100%');
   }
}
//-------------------------主页面-------------------------------------------------------
function mainloaded(){   //主页面加载
	//alert(hehe);
	loadlocal('news_list','easy_news_list');
	loadlocal('lost_found_list','easy_lost');
	loadlocal('second_hand_list','easy_second_hand');
	loadlocal('interest_list','easy_interest');
	loadlocal('tao_cqupt_list','easy_shop');
	var time=new Date();
	if((time.getTime()-parseInt(localStorage.getItem('main_refresh')))<1000){
	     
	}else{
	        loadlist('news_list','easy_news_list','5','1',true,true,'easy_news_list');
	        loadlist('lost_found_list','easy_lost','5','1',true,true,'easy_lost');
			loadlist('second_hand_list','easy_second_hand','5','1',true,true,'easy_second_hand');
	        loadlist('tao_cqupt_list','easy_shop_list','5','1',true,true,'easy_shop');
	        loadlist('interest_list','easy_interest_list','5','1',true,true,'easy_interest');
			localStorage.setItem('main_refresh',time.getTime()+"");
	}
}
function loadlocal(listid,key){
	if(localStorage.getItem(key)){
		var txt=localStorage.getItem(key);
        $('#'+listid).empty();
        $('#'+listid).append(txt);
	}
}
function loadlist(listid,items,count,page,isclear,local,key){
	var hehe=items;
	if(items=='my_interest')items='easy_interest_list';
	$.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/loadajax.php",
             data: {items:hehe, count:count, page:page},
             dataType: "json",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				         var res="";
						 var json=data;
				         switch(items){
							 case "easy_news_list":
							         for(var i in json)
									 {
										 res+="<li onclick=newsclick('"+json[i].id+"',this)>";
										 var imageuri='images/noimage.jpg';
										 var txt="<img src='"+imageuri+"' />";
						                 if(json[i].imageurl){
							                 imageuri='http://127.0.0.1/Easy-CQUPT/news/'+json[i].imageurl;
											 txt="onload=imgload('"+imageuri+"',this);";
											 txt="<img "+txt+" src='"+imageuri+"' />";
						                 }
										 res+="<div class='img_div'>"+txt+"</div><p><strong>"+json[i].title+"</strong><span>"+json[i].time+"</span></p><div class='about'>&nbsp;&nbsp;"+json[i].about+"</div><p>"+json[i].readcount+"阅读<span>"+json[i].count+"跟帖</span></p>";
										 res+="</li>";
									 }
									  if(json.length<10){
									      $("#news_next_btn").html("没有更多了");
									  }
							         break;
							 case "easy_lost":
							         for(var i in json)
									 {
										 res+="<li>";
						                 var imageuri='images/noimage.jpg';
										 var txt="<img src='"+imageuri+"' />";
						                 if(json[i].imageurl){
							                 imageuri='http://127.0.0.1/Easy-CQUPT/news/'+json[i].imageurl;
											 txt="onload=imgload('"+imageuri+"',this);";
											 txt="<img "+txt+" src='"+imageuri+"' />";
						                 }
						                  var smstxt="onclick=$.ui.popup('该用户没留号码，请发站内消息')";
						                  var teltxt=smstxt;
						                  if(json[i].ifreadtel=='1'){
							                      smstxt="href='sms:"+json[i].tel+"'";
							                      teltxt="href='tel:"+json[i].tel+"'";
						                  }
						                  var color="";
						                  if(json[i].color){
							                  color=json[i].color;
						                  }
						                  var about="没有先详细介绍";
						                  if(json[i].about){
							                 about=json[i].about;
						                  }
						                  res+="<div class='img_div'>"+txt+"</div><p><strong>"+json[i].value+"</strong><span>"+gettime(json[i].releasetime)+"</span></p><div class='about'>&nbsp;&nbsp;"+color+"</br>"+about+"</div><p>失主：<strong onclick=view_user('"+json[i].username+"')>"+json[i].username+"</strong>&nbsp;"+json[i].state+"<span><a class='icon chat' href='#' onclick=sendMessage('"+json[i].username+"')></a>&nbsp;<a class='icon message' "+smstxt+"></a>&nbsp;<a class='icon phone' "+teltxt+"></a></span></p>";
						res+="</li>";
						     }
							              break;
							 case "easy_second_hand":
							          for(var i in json)
									  {
										 res+="<li onclick=load_second_hand_item('"+json[i].id+"')>";
										 var imageuri='images/noimage.jpg';
										 var txt="<img src='"+imageuri+"' />";
						                 if(json[i].imageurl){
							                 imageuri='http://127.0.0.1/Easy-CQUPT/news/'+json[i].imageurl;
											 txt="onload=imgload('"+imageuri+"',this);";
											 txt="<img "+txt+" src='"+imageuri+"' />";
						                 }
										 res+="<div class='img_div'>"+txt+"</div><p><strong>"+json[i].value+"</strong><span>"+gettime(json[i].time)+"</span></p><div class='about'>价格："+json[i].price+"</br>"+json[i].description+"</div><p>物主：<strong onclick=view_user('"+json[i].username+"')>"+json[i].username+"</strong>&nbsp;"+json[i].state+"<span><a class='icon chat' href='#' onclick=sendMessage('"+json[i].username+"')></a>&nbsp;<a class='icon message' href='sms:"+json[i].tel+"'></a>&nbsp;<a class='icon phone' href='tel:"+json[i].tel+"'></a></span></p>";
										 res+="</li>";
									  }
							         break;
							 case "easy_shop_list":
							          for(var i in json)
									  {
										  res+="<li>";
										  var imageuri='images/noimage.jpg';
										  var txt="<img src='"+imageuri+"' />";
						                  if(json[i].imageurl){
							                 imageuri='http://127.0.0.1/Easy-CQUPT/news/'+json[i].imageurl;
											 txt="onload=imgload('"+imageuri+"',this);";
											 txt="<img "+txt+" src='"+imageuri+"' />";
						                  }
										  res+="<div class='img_div'>"+txt+"</div><p><strong>"+json[i].shop_name+"</strong><span>"+gettime(json[i].time)+"</span></p><div class='about'>&nbsp;&nbsp;"+json[i].description+"</div><p>店主：<strong onclick=view_user('"+json[i].username+"')>"+json[i].username+"</strong><span><a class='icon chat' href='#' onclick=sendMessage('"+json[i].username+"')></a>&nbsp;<a class='icon message' href='sms:"+json[i].tel+"'></a>&nbsp;<a class='icon phone' href='tel:"+json[i].tel+"'></a></span></p>";
										  res+="</li>";
									  }
							         break;
							 case "easy_interest_list":
							         for(var i in json)
									 {
										 res+="<li>";
										 res+="<p onclick=interest_view('"+json[i].id+"')><strong>"+json[i].interest_name+"</strong><span>"+json[i].time+"</span></p>";
										 res+="<div onclick=interest_view('"+json[i].id+"') class='about'>&nbsp;&nbsp;"+json[i].description+"</div>";
										 res+="<p>圈主：<strong onclick=view_user('"+json[i].username+"')>"+json[i].username+"</strong><span>已有"+json[i].count+"人</span></p>";
										 res+="</li>";
									 }
							         break;
							 case "easy_news_coment_list":
							         for(var i in json)
									 {
										 res+="<li>";
										 res+="<p>"+json[i].fromuser+"<span>"+gettime(json[i].time)+"</span></p>";
										 res+="<div class='about'>"+json[i].content+"</div>";
										 res+="</li>";
									 }
									 if(json.length<10){
										 $("#news_next_btn").html("没有更多了"); 
									 }else{
										 $("#news_next_btn").html("加载下一页");
									 }
							         break;
									 default:
						 }
						 if(local)localStorage.setItem(key,res);
				         if(isclear)$('#'+listid).empty();
                         $('#'+listid).append(res);
                      }
         });
}


//-----------------------重邮头条------------------------------------
function newsload(){
	loadlocal('news_lists','easy_news');
	var time=new Date();
	if((time.getTime()-parseInt(localStorage.getItem('news_refresh')))<1000*60*60){
	     
	}else{
	   loadlist('news_lists','easy_news_list','10','1',true,true,'easy_news');
	   localStorage.setItem('news_refresh',time.getTime())
	}
}
function newfresh(){
	loadlist('news_lists','easy_news_list','10','1',true,true,'easy_news');
	localStorage.setItem('news_refresh',time.getTime())
}
function loadmorenews(id){
	if($("#news_next_btn").html()=="加载下一页"){
		var page=(parseInt($("#"+id).html()));
        loadlist('coment_lists','easy_news_coment_list','10',page+"",false,false,'');
		$("#"+id).html((page+1).toString());
		}
}
function newsclick(id,a){
	$(a).css('background-color','#DFE0E2');
	localStorage.setItem('newsid',id);
	$.ui.loadContent("#news_view", false, false, "right");
}
//加载新闻内容
function loadnews(){
	id=localStorage.getItem('newsid');
	if(id==localStorage.getItem('news_id')){
		$("#news_title").html(localStorage.getItem('news_title'));
		$("#news_content").html(localStorage.getItem('news_content'));
		$("#news_count").html(localStorage.getItem('news_count'));
	}else{
	  $.ui.showMask("loading");
	  $.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/loadajax.php",
             data: {items:'news', page:''+id},
             dataType: "json",
			 async:false,
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				         var json=data;
						 $("#news_title").html(json[0].title);
						 localStorage.setItem('news_title',json[0].title);
	                     $("#news_content").html(json[0].content);
						 localStorage.setItem('news_content',json[0].content);
						 $("#news_count").html(json[0].count+'跟帖');
						 localStorage.setItem('news_count',json[0].count+'跟帖');
						 localStorage.setItem('news_id',json[0].id);
                      }
         });
	}
}
function oncoment(){
	  var iflogin=localStorage.getItem("iflogin");
	  if(iflogin==null||username==""){
		  function oncomentcheck(button){
			  if(button=="2"){
				  localStorage.setItem("prepanle","#news_view");
				  $.ui.loadContent("#login", false, false, "right");
			  }
		  }
		    navigator.notification.confirm(
			'先登录',  // 显示信息
			oncomentcheck,              // 按下按钮后触发的回调函数，返回按下按钮的索引	
			'登录后才能发帖',            // 标题
			'不了,去登录'          // 按钮标签
		);
	  }else{
      var txt=$("#coment_input").val();
	  if(txt==null||txt==""){
		    $.ui.popup("先输入跟帖内容");
	  }else{
		var username=localStorage.getItem("username");
	    var newsid=localStorage.getItem("newsid");
	    $.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/coment.php",
             data: {newsid:newsid, coment:txt, name:username},
             dataType: "text",
			 async:false,
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				         $("#coment_input").val("");
				         $.ui.popup(data);
                      }
           });
		 }
	  }
}
function loadcoment(){
	var id=localStorage.getItem('newsid');
	$("#coment_btn").html("加载更多");
    loadlist('coment_list','easy_news_coment_list',id,'1',true,false,'');
}
function loadmorecoment(id){
	if($("#coment_btn").html()=="加载更多"){
		var page=(parseInt($("#"+id).html()));
		var newsid=localStorage.getItem('newsid');
        loadlist('coment_list','easy_news_coment_list',newsid,page+"",false,false,'');
		$("#"+id).html((page+1).toString());
		}
}


//----------------------------------------------其他-----------------------------
function checklogin(now,goto){
	var b = localStorage.getItem("iflogin");
	if(b==null||b==""){
		localStorage.setItem("prepanle",now);
		$.ui.loadContent("#login", false, false, "right");
	}else{
		$.ui.loadContent(goto, false, false, "right");
	}
}
function mypageload(){
	var name=localStorage.getItem('username');
	$("#mypage_name").html(name);
	items="mypage";
	$.ui.showMask('加载中');
	$.ajax({
	         type: "GET",
             url: "http://127.0.0.1/camera/admin/loadajax.php",
             data: {items:items, page:name},
             dataType: "json",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				 $("#mypage_tel").val(data[0].tel);
				 $("#mypage_qq").val(data[0].qq);
				 var is=true;
				 if(data[0].ifreadtel=='0'){
					 is=false;
				 }
				 $("#mypage_read_tel").prop("checked",is);
			 }
	
	});
	
}
function change_tel(formid){
	var type='change_tel';
	var name=localStorage.getItem('username');
	var tel=$("#mypage_tel").val();
	var qq=$("#mypage_qq").val();
	var ifreadtel='0';
	if($("#mypage_read_tel").prop("checked"))ifreadtel='1';
	$.ui.showMask('修改中');
	$.ajax({
	         type: "GET",
             url: "http://127.0.0.1/camera/admin/dml.php",
             data: {type:type, name:name, tel:tel, qq:qq, ifreadtel:ifreadtel},
             dataType: "text",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				 $.ui.popup(data); 
			 }
	
	});
}
function loginout(){
	localStorage.removeItem("iflogin");
	localStorage.removeItem("myinterest");
	$.ui.loadContent("#main", false, false, "right");
}
function login(formid){
	var myform=document.getElementById(formid);
	if(myform.name.value==""||myform.name.value==null){
		$('.login_res').html("用户名不能为空");
	}else if(myform.password.value==null||myform.password.value==""){
		$('.login_res').html("密码不能为空");
	}else{
		$.ui.showMask("登录中");
	    $.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/login.php?name="+myform.name.value+"&password="+myform.password.value,
             dataType: "text",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
　　　              $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				 if(data=="3"){
					 $('.login_res').html("用户名不存在");
				}else if(data=="1"){
					localStorage.setItem("username",myform.name.value);
					var autologin="false";
					var remember="false";
					if($("#autologin").prop('checked')){autologin='true';}
					if($("#remember").prop('checked')){remember='true';}
					localStorage.setItem('autologin',autologin);
					localStorage.setItem('remember',remember);
					if($("#remember").prop('checked')){
						localStorage.setItem("password",myform.password.value);
					}
					localStorage.setItem("iflogin","true");
					var pre = localStorage.getItem("prepanle");
					if(pre==""||pre==null){
						$.ui.loadContent("#main", false, false, "right");
					 }else{
						$.ui.loadContent(localStorage.getItem("prepanle"), false, false, "right");
					 }
					 $.ui.popup("登录成功");
				}else if(data=="2"){
					$('.login_res').html("用户或密码错误");
				}
			 }
         });
	}
	
}
function loginload(){
	if(localStorage.getItem('username')){
		$("#loginname").val(localStorage.getItem('username'));
	}
	if(localStorage.getItem('autologin')=='true'){
	   $("#autologin").prop('checked',true);
	}else{
		$("#autologin").prop('checked',false);
	}
	if(localStorage.getItem('remember')=='true'){
		$("#loginpsw").val(localStorage.getItem('password'));
	   $("#remember").prop('checked',true);
	}else{
		$("#loginpsw").val('');
		$("#remember").prop('checked',false);
	}
}
function register(formid){
	var myform=document.getElementById(formid);
	if(myform.name.value==""||myform.name.value==null){
		$('.register_res').html("用户名不能为空");
	}else if(myform.password.value==null||myform.password.value==""){
		$('.register_res').html("密码不能为空");
	}else if(myform.password.value!=myform.password2.value){
		$('.register_res').html("两次密码输入不相同");
	}else if(myform.tel.value==null||myform.tel.value==""){
		$('.register_res').html("手机号不能为空");
	}else if(myform.tel.value.length!=11){
	    $('.register_res').html("你输入的手机号可能有误手机号");
	}else{      //发送ajax请求注册
	    $.ui.showMask("注册提交中");
		$.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/register.php?name="+myform.name.value+"&password="+myform.password.value+"&imageurl="+myform.imageurl.value+"&tel="+myform.tel.value+"&qq="+myform.qq.value+"&ifreadtel="+myform.ifreadtel.value,
             dataType: "text",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				 if(data=="4"){
					 $('.register_res').html("用户名已存在")
				 }else if(data=="1"){
					 $.ui.popup("注册成功");
					 $.ui.loadContent("#login", false, false, "right");
				}
			}
         });
	}
}
function sendMessage(toname){
	$.ui.popup('你想给'+toname+',该功能还在开发中');
}
function view_user(username){
	$.ui.popup('你想看'+username+'的个人资料,该功能还在开发中');
}

//---------------------------------二手交易-------------------------------
function load_second_hand(){
	load_search('second_hand_lists','second_hand','','1',true);
}
function second_hand_release(formid){
	var myform = document.getElementById(formid);
	if(myform.values.value==null||myform.values.value==""){
		$(".second_hand_res").html("物品名不能为空");
	}else if(myform.price.value==null||myform.price.value==""){
		$(".second_hand_res").html("价格不能为空");
	}else if(myform.about.value==null||myform.about.value==""){
		$(".second_hand_res").html("介绍不能为空");
	}else if(myform.second_image1_input.value==null||myform.second_image1_input.value==""){
		//$(".second_hand_res").html("至少传一张照片");
	}
	var name=localStorage.getItem('username');
	$.ui.showMask("发布中");
		$.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/dml.php?type="+"second_hand_release"+"&values="+myform.values.value+"&imageurl1="+myform.imageurl1.value+"&imageurl2="+myform.imageurl2.value+"&item="+myform.items.value+"&about="+myform.about.value+"&name="+name+"&price="+myform.price.value,
             dataType: "text",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				 $.ui.popup(data);
			}
         });
}

//------------------------兴趣圈-----------------------------------
function interestload(){
	if(localStorage.getItem('myinterest')){
	    loadlocal('my_interest_list','myinterest');
	}else{
		my_interest();
	}
	load_search('interest_lists','interest','','1',true);
}
function my_interest(){
	check = localStorage.getItem('username');
	loadlist('my_interest_list','my_interest',check,'1',true,true,'myinterest');
}
function interest_view(id){
	localStorage.setItem('interest_id',id);
	$.ui.loadContent("#interest_view", false, false, "right");
}
function interestviewload(){
	var id=localStorage.getItem('interest_id');
	var name=localStorage.getItem('username');
	$.ui.showMask("loading");
	$.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/loadajax.php",
             data: {items:'interest_view',name:name, page:''+id},
             dataType: "json",
			 async:false,
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				         var json=data;
						 $("#interest_name").html(json[0].interest_name);
						 //localStorage.setItem('news_title',json[0].interest_name);
	                     $("#interest_notice").html(json[0].notice);
						 $("#ifjoin_interest").html(json[0].ifjoin);
						 //localStorage.setItem('news_content',json[0].content);
						// $("#news_count").html(json[0].count+'跟帖');
						 //localStorage.setItem('news_count',json[0].count+'跟帖');
						 //localStorage.setItem('news_id',json[0].id);
                      }
         });
}
//---------------------------------失物招领-------------------------------
function search_btn(id){
	var txt=$("#"+id).val();
	if(txt==null||txt==""){
		$.ui.popup("请先输入关键字");
	}else{
		if(id=='second_search_input'){
			load_search('second_hand_lists','second_hand',txt,'1',true);
		}else if(id=='search_input'){
		    load_search('main_lost_found_list','lost_found',txt,'1',true);
		}else if(id=='interest_search_input'){
		    load_search('interest_lists','interest',txt,'1',true);
		}
	}
}
function loadmore(id,items){
	if($("#"+id+"_btn").html()=="加载下一页"){
		var page=(parseInt($("#"+id).html()));
        if(items=='lost_found'){
			var txt=$("#search_input").val();
	        load_search('main_lost_found_list','lost_found',txt,page,true);
		}else if(items=='second_hand'){
			var txt=$("#second_search_input").val();
			load_search('second_hand_lists','second_hand',txt,page,true);
		}else if(items=='interest'){
			var txt=$("#interest_search_input").val();
			load_search('interest_lists','interest',txt,page,true);
		}
		$("#"+id).html((page+1).toString());
		}
}
function change_lost(){
	var txt=$("#search_input").val();
	load_search('main_lost_found_list','lost_found',txt,'1',true);
}
function load_lost(){
    load_search('main_lost_found_list','lost_found','','1',true);
}
function load_search(listid,items,inputtxt,page,isempty){
	if(items=='lost_found'){
		var selects=$("#lost_items").val();
	    var check=$("#toggle1").prop("checked");
	}else if(items=='second_hand'){
	    var selects='all';
		var check='';
	}else if(items=='interest'){
	    var selects='all';
		var check='';
	}
	$.ui.showMask("加载中");
	$.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/loadajax.php",
			 data: {txt:inputtxt, items:items, page:page, selects:selects, check:check},
             dataType: "json",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				 $.ui.hideMask();
				 var res="";
				 var json = data;
				 if(items=='lost_found'){
				      for(var i in json)
				      {
						  res+="<li>";
						  var imageuri='images/noimage.jpg';
						  var txt="<img src='"+imageuri+"' />";
						  if(json[i].imageurl){
							    imageuri='http://127.0.0.1/Easy-CQUPT/news/'+json[i].imageurl;
								txt="onload=imgload('"+imageuri+"',this);";
								txt="<img "+txt+" src='"+imageuri+"' />";
						  }
						  var smstxt="onclick=$.ui.popup('该用户没留号码，请发站内消息')";
						  var teltxt=smstxt;
						  if(json[i].ifreadtel=='1'){
							  smstxt="href='sms:"+json[i].tel+"'";
							  teltxt="href='tel:"+json[i].tel+"'";
						  }
						  var color="";
						  if(json[i].color){
							  color=json[i].color;
						  }
						  var about="没有先详细介绍";
						  if(json[i].about){
							  about=json[i].about;
						  }
						  res+="<div class='img_div'>"+txt+"</div><p><strong>"+search_red(inputtxt, json[i].value)+"</strong><span>"+gettime(json[i].releasetime)+"</span></p><div class='about'>&nbsp;&nbsp;"+search_red(inputtxt, color)+"</br>"+search_red(inputtxt, about)+"</div><p>失主：<strong onclick=view_user('"+json[i].username+"')>"+json[i].username+"</strong>&nbsp;"+json[i].state+"<span><a class='icon chat' href='#' onclick=sendMessage('"+json[i].username+"')></a>&nbsp;<a class='icon message' "+smstxt+"></a>&nbsp;<a class='icon phone' "+teltxt+"></a></span></p>";
						  res+="</li>";
				      }
					  if (json.length<10){
						  $("#lost_found_page_btn").html('没有更多了');
					  }else{
						  $("#lost_found_page_btn").html('加载下一页');
					  }
				 }else if(items=='second_hand'){
					 for(var i in json)
					{
						res+="<li onclick=load_second_hand_item('"+json[i].id+"')>";
						var imageuri='images/noimage.jpg';
					    var txt="<img src='"+imageuri+"' />";
					   if(json[i].imageurl){
		                    imageuri='http://127.0.0.1/Easy-CQUPT/news/'+json[i].imageurl;
			     		    txt="onload=imgload('"+imageuri+"',this);";
						    txt="<img "+txt+" src='"+imageuri+"' />";
                       }
						res+="<div class='img_div'>"+txt+"</div><p><strong>"+search_red(inputtxt, json[i].value)+"</strong><span>"+gettime(json[i].time)+"</span></p><div class='about'>价格："+json[i].price+"</br>"+search_red(inputtxt, json[i].description)+"</div><p>物主：<strong onclick=view_user('"+json[i].username+"')>"+json[i].username+"</strong>&nbsp;"+json[i].state+"<span><a class='icon chat' href='#' onclick=sendMessage('"+json[i].username+"')></a>&nbsp;<a class='icon message' href='sms:"+json[i].tel+"'></a>&nbsp;<a class='icon phone' href='tel:"+json[i].tel+"'></a></span></p>";
						res+="</li>";
					 }
					 if (json.length<10){
						  $("#second_hand_page_btn").html('没有更多了');
					  }else{
						  $("#second_hand_page_btn").html('加载下一页');
					  }
				  }else if(items=='interest'){
					 for(var i in json)
					{
						    res+="<li>";
							res+="<p onclick=interest_view('"+json[i].id+"')><strong>"+search_red(inputtxt, json[i].interest_name)+"</strong><span>"+json[i].time+"</span></p>";
							res+="<div onclick=interest_view('"+json[i].id+"') class='about'>&nbsp;&nbsp;"+search_red(inputtxt, json[i].description)+"</div>";
							res+="<p>圈主：<strong onclick=view_user('"+json[i].username+"')>"+json[i].username+"</strong><span>已有"+json[i].count+"人</span></p>";
							res+="</li>";
					}
					if (json.length<10){
						  $("#interest_page_btn").html('没有更多了');
					  }else{
						  $("#interest_page_btn").html('加载下一页');
					  }
				  }
				 
				 if(isempty)$("#"+listid).empty();
				 $('#'+listid).append(res);
			     }

         });
}
function search_red(inputtxt, txt){
	if(inputtxt){
		var rex = new RegExp(inputtxt, 'g');
	    txt=txt.replace(rex,"<font>"+inputtxt+"</font>");
	}
	return txt;
}
function lost_found_release(formid){
	var myform = document.getElementById(formid);
	if(myform.values.value==""||myform.values.value==null){
		$(".lost_release_res").html('物品名不能为空');
	}else{  //发布
	    release(myform);
	}
	function release(myform){
		var name = localStorage.getItem('username');
		$.ui.showMask("发布中");
		$.ajax({
             type: "GET",
             url: "http://127.0.0.1/camera/admin/lost_release.php?type="+myform.type.value+"&values="+myform.values.value+"&imageurl="+myform.imageurl.value+"&item="+myform.items.value+"&color="+myform.color.value+"&about="+myform.about.value+"&ifreadtel="+myform.ifreadtel.value+"&name="+name,
             dataType: "text",
			 timeout:3000,
			 complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			       $.ui.hideMask();
　　　              if(status=='timeout'){//超时,status还有success,error等值的情
                         window.plugins.toast.show('超时，请检查网络连接', 'short', 'bottom');
　　　               }else if(status=='error'){
	                     window.plugins.toast.show('网络错误', 'short', 'bottom');
                    }
　             },
             success: function(data){
				 $.ui.popup(data);
			}
         });
	}
	
}
function onCamera(button){
	if(button=='1'){  //照片库选择
	    var pictureSource=navigator.camera.PictureSourceType;
		getPhoto(pictureSource.PHOTOLIBRARY);
		//getPhoto(pictureSource.SAVEDPHOTOALBUM);
	}else if(button=='2'){
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType : Camera.DestinationType.DATA_URL,
sourceType : Camera.PictureSourceType.CAMERA,encodingType: Camera.EncodingType.JPEG, targetWidth: 1000,targetHeight: 1000});//targetWidth: 200,targetHeight: 200,
	}
}
function getPhoto(source) {
   		// 从设定的来源处获取图像文件URI
		var destinationType=navigator.camera.DestinationType;
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50, destinationType: destinationType.FILE_URI,sourceType: source, targetWidth: 1000,targetHeight: 1000});
}
	// 当成功获得一张照片的Base64编码数据后被调用
	function onPhotoDataSuccess(imageData) {	
		var imageURL="data:image/jpeg;base64," + imageData;
		var type = localStorage.getItem('imagesource');
		var smallImage;
		if(type=='lost_found'){
		    smallImage = document.getElementById('lost_image_bar');
		}else if(type='second_hand'){
			smallImage = document.getElementById('second_image_bar');
		}
		localStorage.setItem("userimg",imageURL);
		smallImage.src = imageURL;
		$('.hide').show();
	 
}
 // 当成功得到一张照片的URI后被调用
function onPhotoURISuccess(imageURI) {
	    var type = localStorage.getItem('imagesource');
		var smallImage;
		if(type=='lost_found'){
		    smallImage = document.getElementById('lost_image_bar');
		}else if(type=='second_hand'){
			smallImage = document.getElementById('second_image_bar');
		}
		
		// 显示拍摄的照片
		// 使用内嵌CSS规则来缩放图片
		smallImage.src = imageURI;
//		imageURI=imageURI.substring(0,imageURI.lastIndexOf('?'));
		localStorage.setItem("userimg",imageURI);
		$('.hide').show();
}
function getpicture(type){   //上传头像
    localStorage.setItem('imagesource',type);
	navigator.notification.confirm(
			'选择你要获取方式',  // 显示信息
			onCamera,              // 按下按钮后触发的回调函数，返回按下按钮的索引	
			'获取头像',            // 标题
			'照片库选择,拍照'          // 按钮标签
		);
}
 // 当有错误发生时触发此函数
   function onFail(mesage) {
		alert('Failed because: ' + message);
   }
   //产生随机数
   function generateMixed(n){
	    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}
   //上传头像
   function uploadtx(){
	   var filename='';
	   var imageurl=localStorage.getItem("userimg");
//	   var houzui=imageurl.substr(imageurl.lastIndexOf('.'),4);
//	   if(imageurl.length>2000)
	   houzui='.jpg';
	   var date=new Date();
	   filename=date.getTime().toString()+generateMixed(5)+houzui;
	   var image_input_bar='';
	   var type = localStorage.getItem('imagesource');
	   if(type=='lost_found'){
		    image_input_bar="#lost_image_url";
		}else if(type=='second_hand'){
			image_input_bar="#second_image2_input";
			if($(image_input_bar).val()==null||$(image_input_bar).val()==''){
				image_input_bar="#second_image1_input";
			}
		}
	   var win=function(){alert("上传成功");$.ui.hideMask();$(image_input_bar).val(filename);};
	   var fail=function(){alert("上传失败");$.ui.hideMask();};
	   var uri="http://127.0.0.1/camera/admin/img.php";
	   uploadfile(imageurl,uri,filename,win,fail,"image/jpeg","test","hhee");
	   $.ui.showMask("图片上传中");
   }
   //上传文件api
   function uploadfile(fileURL,server,filename,win,fail,type,value1,value2){
   var options = new FileUploadOptions();
   options.fileKey = "file";
   options.fileName = filename;
   options.mimeType = type;
   options.chunkedMode = false;

   var params = {};
   params.value1 = value1;
   params.value2 = value2;
   options.params = params;

   var ft = new FileTransfer();
   ft.upload(fileURL, encodeURI(server), win, fail, options);
}