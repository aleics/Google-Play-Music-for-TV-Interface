<?php

	require '../Lib/Guzzle/aws-autoloader.php';
	use Guzzle\Http\Client;
	use Guzzle\Http\EntityBody;
	use Guzzle\Http\Message\Response;
	use Guzzle\Common\Event;
	use Guzzle\Http\IoEmittingEntityBody;
	
	$url = 'https://www.googleapis.com/sj/v1beta1/tracks';
		
	$client = new Client($url);
	
	auth_var = $_SESSION['authvarname'];
	
	$request = $client->post($url, array (
		'Authorization' => GoogleLogin,
		'auth' => auth_var[2]
	), array ());
		
	try{
		$response = $request->send();
		$body = $response->getBody(true);
		echo $body;
	}
	catch{
		echo 'ERROR\n'
		echo $e->getMessage();
		header("Location: ..\index.php");
	}

?>
