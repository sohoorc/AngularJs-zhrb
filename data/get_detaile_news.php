<?php 
	header("Content-Type:application/json");
	@$newsId=$_REQUEST['newsId'];
	$url="http://news-at.zhihu.com/api/4/news/$newsId";
	$html= file_get_contents($url);
	echo $html;
 ?>