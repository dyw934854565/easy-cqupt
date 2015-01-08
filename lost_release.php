<?php
    require_once 'mydatabase.class.php';
    date_default_timezone_set('prc');
    $name=$_GET['name'];
    $value=$_GET['values'];
    $type=$_GET['type'];
    $color=$_GET['color'];
    $about=$_GET['about'];
    $ifreadtel=$_GET['ifreadtel'];
    $item=$_GET['item'];
    $imageurl=$_GET['imageurl'];
    $time=time();
    $database=new mydatabase();
    $state="遗失中";
    if ($type=='found'){
    	$state='待领取';
    }
    $sql="insert into easy_$type value('$value','$item','$color','$about','$imageurl','$time','','$name',$ifreadtel,'$state',null)";
    $res = $database->execule_dql($sql);
    if ($res==1){
    	echo '发布成功';
    }else{
    	echo '发布失败';
    }
    $database->close_connet();
?>