<?php
	//Functions
	function GetAuthentificationVariables($body){
		$sid_pos = strpos($body,'SID');
		$lsid_pos = strpos($body,'LSID');
		$auth_pos = strpos($body,'Auth');
		
		$sid = mb_strcut($body,$sid_pos,$lsid_pos-$sid_pos);
		$lsid = mb_strcut($body,$lsid_pos,$auth_pos-$lsid_pos);
		$auth = mb_strcut($body,$auth_pos);
		
		return array($sid,$lsid,$auth);
	}

	require '../Lib/Guzzle/aws-autoloader.php';
	use Guzzle\Http\Client;
	use Guzzle\Http\EntityBody;
	use Guzzle\Http\Message\Response;
	use Guzzle\Common\Event;
	use Guzzle\Http\IoEmittingEntityBody;
		
	$url = 'https://www.google.com/accounts/ClientLogin';
		
	//echo $_POST['user_name'];
	//echo "\r\n";
	//echo $_POST['password_name'];
	//echo "\r\n";
	$client = new Client($url);
	$request = $client->post($url, array (
		'Content-type' => 'application/x-www-form-urlencoded'
	 ), 
	array(
		'accountType' => 'HOSTED_OR_GOOGLE',
		'Email'       => $_POST['user_name'],
		'Passwd'      => $_POST['password_name'],
		'service'     => 'sj',
		'source'      => 'FHKoeln-tvboxmusicfhkoln-0.0.1'
	));

	try{ $response = $request->send();
			
	$status = $response->getStatusCode();
		
	//	echo $status;
	//	echo "\r\n";	
		$body = $response->getBody(true);
		
		$auth_var = GetAuthentificationVariables($body);
	//	echo $auth_var[0];
	//	echo "\r\n"; 
	//	echo $auth_var[1];
	//	echo "\r\n";
	//	echo $auth_var[2];
		header("Location: ../main.php");
	}
	catch(Guzzle\Http\Exception\BadResponseException $e){
		echo 'ERROR\n';
		echo $e->getMessage();
		header("Location: ../index.php");
	}
	/*echo $response->getBody();
	$SID = $response->getHeader('Content-type');
	echo $SID;
	*/

	
		
// Create a client and provide a base URL
//$client = new Client('https://api.github.com');
// Create a request with basic Auth
//$request = $client->get('/user')->setAuth('al.casanovas.m@gmail.com', 'byvmc4fr');
// Send the request and get the response
//$response = $request->send();
//echo $response->getBody();
// >>> {"type":"User", ...
//echo $response->getHeader('Content-Length');
// >>> 792
?>
