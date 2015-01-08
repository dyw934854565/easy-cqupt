<?php
    	date_default_timezone_set('prc');
    	require_once 'mydatabase.class.php';
        $database=new mydatabase();
    	$name=$_GET['name'];
    	$password=md5($_GET['password']);
    	$imageurl=$_GET['imageurl'];
    	$qq=$_GET['qq'];
    	$ifreadtel=$_GET['ifreadtel'];
    	$tel=$_GET['tel'];
    	$yikatong=$_GET['yikatong'];
    	$time=date("y-m-d D H:i",time());
    	$sql="select * from easy_user where username='$name'";
        $res = $database->execule_dql($sql);
        if($row=mysql_fetch_assoc($res)){
   	        $database->close_connet();
    	    echo "4";
     	    exit();
        }else{
           $sql="insert into easy_user values('$name','$password','$imageurl','$time','$yikatong','$tel',$ifreadtel,'$qq')";
           $res2=$database->execute_dml($sql);
           if($res2==1){
        	echo "1";
           }
        }  
        $database->close_connet();
?>