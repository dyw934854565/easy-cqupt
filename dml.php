<?php
    date_default_timezone_set('prc');
    require_once 'mydatabase.class.php';
    $database=new mydatabase();
    $type = $_GET['type'];
    if($type=='change_tel'){
    	$tel = $_GET['tel'];
    	$qq = $_GET['qq'];
    	$yikatong = $_GET['yikatong'];
    	$name = $_GET['name'];
    	$ifreadtel = $_GET['ifreadtel'];
    	$sql="update easy_user set yikatong='$yikatong',tel='$tel',qq='$qq',ifreadtel=$ifreadtel where username='$name'";
    }else if ($type=='second_hand_release'){
    	$value=$_GET['values'];
    	$item=$_GET['item'];
    	$about=$_GET['about'];
    	$price=$_GET['price'];
    	$url1=$_GET['imageurl1'];
    	$url2=$_GET['imageurl2'];
    	$name=$_GET['name'];
    	$time=time();
    	$sql="insert into easy_second_hand value('$value','$item','$url1','$url2','$about','$time','$price','等待买家','$name',null)";
    }else if ($type=='yikatong_release'){
		$username = $_GET['username'];
    	$name=$_GET['name'];
    	$state=$_GET['state'];
    	$tongyi=$_GET['tongyi'];
    	$time=time();
    	$sql="insert into easy_yikatong value('$tongyi','$name','$username','$time','$state',null)";
    }else if($type=='create_interest'){
		$value=$_GET['values'];
		$sql="select * from easy_interest_list where interest_name='$value'";
		$res = $database->execule_dql($sql);
		if($row=mysql_fetch_assoc($res)){
			echo '1';
			exit();
		}
		$about=$_GET['about'];
		$notice=$_GET['notice'];
		$name=$_GET['name'];
		$time=date("y-m-d",time());
		$sql="insert into easy_interest_list value('$value','$name','$time','$about','$notice',0,null)";
	}else if($type=='interest_release'){
		$theme=$_GET['theme'];
		$content=$_GET['content'];
		$name=$_GET['name'];
		$id=$_GET['id'];
		$about=$_GET['about'];
		$time=time();
		$sql="insert into easy_interest_article_list value($id,'$theme','$about','$content','$time',0,0,0,'$name',null)";
	}else if($type=='join_interest'){
		$name=$_GET['name'];
		$id=$_GET['id'];
		$sql="select * from easy_interest_member_list where interest_id=$id and username='$name'";
		$res = $database->execule_dql($sql);
		if($row=mysql_fetch_assoc($res)){
			$sql="delete from easy_interest_member_list where interest_id=$id and username='$name'";
		}else{
			$sql="insert into easy_interest_member_list value($id,'$name')";
		}
	}else if($type=='interest_article_coment'){
		$content = $_GET['content'];
		$id = $_GET['id'];
		$name = $_GET['name'];
		$time = time();
		$sql = "insert into easy_interest_article_coment_list value('$id','$content','$name','$time',null)";
	}else if($type=='interest_article_zan'){
		$row = $_GET['row'];
		$id = $_GET['id'];
		$sql = "update easy_interest_article_list set $row=$row+1 where id=$id";
	}
    $res = $database->execute_dml($sql);
    if($res==1){
    	echo '操作成功';
    }
    $database->close_connet();
?>