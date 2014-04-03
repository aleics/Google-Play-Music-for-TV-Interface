<?php
	include 'functions.php';
	
	require '../Lib/Guzzle/aws-autoloader.php';
        use Guzzle\Http\Client;
        use Guzzle\Http\EntityBody;
        use Guzzle\Http\Message\Response;
        use Guzzle\Common\Event;
        use Guzzle\Http\IoEmittingEntityBody;

	
	$base_url = "https://play.google.com/music/";
	$service_url = $base_url + "services/";

	$songids = array();
	$songids = GetVariableList('/var/www/GooglePlayWebTv/Info/TrackList.txt','"id": "');

	//$streamurl =  base64url_encode(hash_hmac("sha1","3b5b5ac0-c959-3ceb-a180-016013914492"."67plmd49qzzo","27f7313e-f75d-445a-ac99-56386a5fe879",true));

	$streamurl = GetStreamUrl($songids[0]);
	echo $streamurl['sig'];
	echo "\n";
	echo $streamurl['songid'];
	echo "\n";
	

	function base64url_encode($data) { 
 		 return rtrim(strtr(base64_encode($data), '+/', '-_'), '='); 
	}
	
	function GetStreamUrl($songid){
	
	
	$key = '27f7313e-f75d-445a-ac99-56386a5fe879';
	$salt = '67plmd49qzzo';
	$data = $songid.$salt;

	$sig =  base64url_encode(hash_hmac("sha1",$data,$key,true));

	$params = array('u'=>0,'pt'=>'e','slt'=>$salt,'sig'=>$sig);

	if($songid[0] == 'T'){
		$params['mjck'] = $songid;
	}
	else{
		$params['songid'] = $songid;
	}

	return $params;
	
	}




?>
