<?php 
	header("Content-Type:application/json");
	@$themesId=$_REQUEST['themesId'];
	
	if ($themesId==null) {
		$url="http://news-at.zhihu.com/api/4/themes";
	}else{
		$url="http://news-at.zhihu.com/api/4/theme/$themesId";
	}
	$html= file_get_contents($url);
	echo $html;
 ?>