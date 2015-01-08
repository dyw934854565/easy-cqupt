<?php
    require_once 'mydatabase.class.php';
    $database=new mydatabase();
    date_default_timezone_set('prc');
    $time=time();
    $name=$_GET['name'];
    $content=$_GET['coment'];
    $newsid=$_GET['newsid'];
    $sql="insert into easy_news_coment_list values('$newsid','$name','$content','$time',null,null)";
    $res = $database->execule_dql($sql);
    if ($res==1){
    	echo "跟帖成功";
    }else {
    	echo "erro";
    }
    $database->close_connet();
?>