<?php
    if(empty($_GET['items'])){
    	exit();
    }else{
        $item=$_GET['items'];
        $nowpage=$_GET['page'];
        require_once 'mydatabase.class.php';
        $database=new mydatabase();      
        if($item=="news"){
        	$sql="update easy_news_list set readcount=readcount+1 where id=$nowpage";
        	$database->execute_dml($sql);
        	$sql="select content,readcount,count,title,id from easy_news_list where id=$nowpage";
        }else if($item=="easy_shop_list"){
        	$pagecount=10;
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
        	$sql="select * from $item where state=1 order by id desc limit $low,$high";
        }else if($item=="mypage"){
        	$sql="select * from easy_user where username='$nowpage'";
        }else if($item=="easy_news_coment_list"){
        	$id=$_GET['count'];
        	$pagecount=10;
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
        	$sql="select * from $item where toid='$id' order by id desc limit $low,$high";
        }else if($item=="lost_found"){
        	$pagecount=10;
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
            $select=$_GET['selects'];
            $check=$_GET['check'];
            $form="";
            if ($check=="true"){
            	$form="easy_found";
            }else {
            	$form="easy_lost";
            }
            $txt=$_GET['txt'];
            if ($txt==null||$txt==""){
            	if ($select=="all"){
            		$sql="select * from $form order by id desc limit $low,$high";
            	}else{
            		$sql="select * from $form  where item='$select' order by id desc limit $low,$high";
            	}         	
            }else {
                if ($select=="all"){
            		$sql="select * from $form where value like '%$txt%'
            		      union
            		      select * from $form where color like '%$txt%'
            		      union
            		      select * from $form where about like '%$txt%' order by id desc limit $low,$high
            		";
            	}else{
            		$sql="select * from $form where item='$select' and value like '%$txt%'
            		      union
            		      select * from $form where item='$select' and color like '%$txt%'
            		      union
            		      select * from $form where item='$select' and about like '%$txt%' order by id desc limit $low,$high
            		      ";
            	}
            }
        }else if($item=="my_interest"){
        	$check = $_GET['count'];
        	$form="easy_interest_list";
        	$sql="select $form.* from $form,easy_interest_member_list where $form.id=easy_interest_member_list.interest_id and easy_interest_member_list.username='$check'";
        }else if($item=="interest_view"){
        	$name=$_GET['name'];
        	$form="easy_interest_list";
        	$sql="select * from $form where id=$nowpage";
        }else if($item=="yikaton_res"){
        	$tongyi=$_GET['count'];
        	$sql="select username,tel,qq from easy_user where yikatong='$tongyi'";
        }else if($item=="yikatong_search"){
        	$count=$_GET['count'];
			$page=$_GET['page'];
        	$sql="select * from easy_yikatong where $page='$count'";
        }else if($item=="easy_interest_article_coment_list"){
			$id = $_GET['count'];
			$pagecount=10;
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
			$sql="select * from easy_interest_article_coment_list where article_id='$id' order by id desc limit $low,$high";
		}else if($item=="interest_article_view"){
			$id=$_GET['id'];
			$sql="select theme,content,username,coment,time from easy_interest_article_list where id=$id";
		}else if($item=="easy_interest_article_list"){
			$id=$_GET['count'];
			$pagecount=10;
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
        	$sql="select * from $item where interest_id=$id order by id desc limit $low,$high";
		}else if($item=="interest"){
        	$pagecount=10;
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
            $select=$_GET['selects'];
            $form="easy_interest_list";
            $txt=$_GET['txt'];
            $check=$_GET['check'];
               if ($txt==null||$txt==""){
            	  if ($select=="all"){
            		  $sql="select * from $form order by id desc limit $low,$high";
            	  }else{
            		  $sql="select * from $form  where item='$select' order by id desc limit $low,$high";
            	  }         	
               }else {
                  if ($select=="all"){
            		  $sql="select * from $form where interest_name like '%$txt%'
            		        union
            		        select * from $form where description like '%$txt%' order by id desc limit $low,$high
            		  ";
            	   }else{
            		  $sql="select * from $form where item='$select' and interest_name like '%$txt%'
            		        union
            		        select * from $form where item='$select' and description like '%$txt%' order by id desc limit $low,$high
            		        ";
            	   }
               }
        }else if($item=="second_hand"){
        	$pagecount=10;
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
            $select=$_GET['selects'];
            $form="easy_second_hand";
            $txt=$_GET['txt'];
            if ($txt==null||$txt==""){
            	if ($select=="all"){
            		$sql="select * from $form order by id desc limit $low,$high";
            	}else{
            		$sql="select * from $form  where item='$select' order by id desc limit $low,$high";
            	}         	
            }else {
                if ($select=="all"){
            		$sql="select * from $form where value like '%$txt%'
            		      union
            		      select * from $form where description like '%$txt%' order by id desc limit $low,$high
            		";
            	}else{
            		$sql="select * from $form where item='$select' and value like '%$txt%'
            		      union
            		      select * from $form where item='$select' and description like '%$txt%' order by id desc limit $low,$high
            		      ";
            	}
            }
        }else {
        	$pagecount=$_GET['count'];
        	$low=$nowpage*$pagecount-$pagecount;
            $high=$pagecount;
        	$sql="select * from $item order by id desc limit $low,$high";
        }
        $res = $database->execule_dql($sql);
        $order=array();
        while ($row=mysql_fetch_assoc($res)){
        	if ($item=="lost_found"||$item=="easy_lost"){
        		if ($row['ifreadtel']==1){
        			$name=$row['username'];
        			$sql="select tel from easy_user where username='$name'";
        			$res2=$database->execule_dql($sql);
        			$row2=mysql_fetch_assoc($res2);
        			$row['tel']=$row2['tel'];
        		}
        	}else if ($item=="easy_second_hand"||$item=='second_hand'||$item=='easy_shop_list'||'yikatong_search'){
        			$name=$row['username'];
        			$sql="select tel from easy_user where username='$name'";
        			$res2=$database->execule_dql($sql);
        			$row2=mysql_fetch_assoc($res2);
        			$row['tel']=$row2['tel'];
        	}else if($item=="interest_view"){
        		    $sql="select * from easy_interest_member_list where username='$name' and interest_id='$nowpage'";
        		    $res2=$database->execule_dql($sql);
        		    if ($row2=mysql_fetch_assoc($res2)){
        		   	    $row['ifjoin']='取消关注';
        		    }else{
        		   	    $row['ifjoin']='关注';
        		    }
        	}else if($item=="easy_interest_article_coment_list"){
				$toid = "to".$row['id'];
				$sql = "select * from $item where article_id='$toid'";
				$res2=$database->execule_dql($sql);
				$coments = array();
				while ($row2=mysql_fetch_assoc($res2)){
					$coments[]=$row2;
				}
				$row['coments']=$coments;
			}
           $order[]=$row;
        }
        echo json_encode($order);
        $database->close_connet();
    }
?>