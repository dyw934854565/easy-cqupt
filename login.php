<?php
   if (empty($_GET['name'])||empty($_GET['password'])){
   	   exit();
   }else {
   	$name = $_GET['name'];
   	$psw = $_GET['password'];
    require_once 'mydatabase.class.php';
    $database=new mydatabase();
    $sql="select password from easy_user where username='$name'";
    $res = $database->execule_dql($sql);
        if($row=mysql_fetch_assoc($res)){  //如果存在用户
        	if(md5($psw)==$row['password']){
        		echo "1";
        	}else {
        		echo "2";
        	}
        }else{
        	echo "3";
        }
    
    $database->close_connet();
   }
?>