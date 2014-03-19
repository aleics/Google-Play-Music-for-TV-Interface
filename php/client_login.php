<?php
	//Session start to send variables to another files
	session_start();

	//Include the Guzzle Library
	require '../Lib/Guzzle/aws-autoloader.php';
	use Guzzle\Http\Client;
	use Guzzle\Http\EntityBody;
	use Guzzle\Http\Message\Response;
	use Guzzle\Common\Event;
	use Guzzle\Http\IoEmittingEntityBody;	
	
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
	
	function SaveAuth($auth_var){
	
		$myFile = 'Auth.txt';
		$fh = fopen($myFile,'w') or die("can't open file");
		fwrite($fh,$auth_var[2]);
		fclose($fh);
	}
	
	/*function TrackList($auth_var){
		
		$auth = $auth_var[2];
	
		$tracksclient = new Client('https://www.googleapis.com/sj/v1beta1/tracks');
		$tracksrequest = $tracksclient->post('https://www.googleapis.com/sj/v1beta1/tracks',array(
			'Content-Type:' => 'application/json',
			'Authorization:' => ' GoogleLogin auth='.$auth
		),
		array(
		));
		
		$tracksresponse = $tracksrequest->send();
		
		$tracksbody = tracksresponse->getBody(true);
		return $tracksbody;
		
	
	}*/
	
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
	//$tracksbody = Tracklist($auth_var);
	//echo $auth_var[2];
	
	SaveAuth($auth_var);
	
	}
	//If it's not okey, send and error and return to index.php
	catch(Guzzle\Http\Exception\BadResponseException $e){

		echo 'ERROR\n';
		echo $e->getMessage();
		header("Location: ../index.php");
	}
	
	//Send variables auth to another files that may need it
	//$_SESSION['authvarname'] = $auth_var[2];
	
?>
