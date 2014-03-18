<?php
	//Functions
	//Get the Auth Variables (SID,LSID,AUTH)
	function GetAuthentificationVariables($body){
		$sid_pos = strpos($body,'SID');
		$lsid_pos = strpos($body,'LSID');
		$auth_pos = strpos($body,'Auth');
		
		$sid = mb_strcut($body,$sid_pos,$lsid_pos-$sid_pos);
		$lsid = mb_strcut($body,$lsid_pos,$auth_pos-$lsid_pos);
		$auth = mb_strcut($body,$auth_pos);
		
		return array($sid,$lsid,$auth);
	}
	
	//Include the Guzzle Library
	require '../Lib/Guzzle/aws-autoloader.php';
	use Guzzle\Http\Client;
	use Guzzle\Http\EntityBody;
	use Guzzle\Http\Message\Response;
	use Guzzle\Common\Event;
	use Guzzle\Http\IoEmittingEntityBody;
	
	//URL for Authentification	
	$url = 'https://www.google.com/accounts/ClientLogin';
		
	//Create Client variable and make the request with his parameters
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
	
	//Get the body of the response in string (true)		
		$body = $response->getBody(true);
	//Send the body string to get the diferents auth variables
		$auth_var = GetAuthentificationVariables($body);
	//If all is ok, go to main.php
		header("Location: ../main.php");

	}
	//If it's not okey, send and error and return to index.php
	catch(Guzzle\Http\Exception\BadResponseException $e){

		echo 'ERROR\n';
		echo $e->getMessage();
		header("Location: ../index.php");
	}

	
		
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
