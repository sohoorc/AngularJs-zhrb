<?php 
	header("Content-Type:application/json");
	@$dateId=$_REQUEST['dateId'];
	$url="http://news-at.zhihu.com/api/4/news/before/$dateId";
	$html= file_get_contents($url);
	echo $html;
 ?>