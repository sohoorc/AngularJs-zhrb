<?php
	$url='http://news-at.zhihu.com/api/4/news/latest';
	$html = file_get_contents($url);
	//echo json_encode($html);
	echo $html;
?>

