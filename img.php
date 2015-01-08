<?php
  if (is_uploaded_file($_FILES['file']['tmp_name'])){
   	  $UploadUrl = $_FILES['file']['tmp_name'];
   	  $name=$_FILES['file']['name'];
   	  $MoveToUrl = $_SERVER['DOCUMENT_ROOT']."/Easy-CQUPT/img/".$name;
   	  if(move_uploaded_file($UploadUrl, iconv("utf-8", "gb2312", $MoveToUrl))){
   	  	echo "上传成功！！！"."</br>";
   	  }else{
   	  	echo "上传失败！！！</br>";
   	  }
  }
?>