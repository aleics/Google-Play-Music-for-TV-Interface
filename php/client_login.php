<?php
	//Include the Guzzle Library
	require '../Lib/Guzzle/aws-autoloader.php';
	use Guzzle\Http\Client;
	use Guzzle\Http\EntityBody;
	use Guzzle\Http\Message\Response;
	use Guzzle\Common\Event;
	use Guzzle\Http\IoEmittingEntityBody;	
	
	//Include functions library
	include 'functions.php';

	//Save Email and password
	$user = new UserInfo();
        $user->addInfo($_POST['user_name'],$_POST['password_name']);

	//URL for Authentification	
	$url = 'https://www.google.com/accounts/ClientLogin';
		
	//Create Client variable and make the request with his parameters
	$client = new Client($url);
	$request = $client->post($url, array (
		'Content-type' => 'application/x-www-form-urlencoded;charset=utf-8'
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
		$headers = $response->getHeaders();
		echo "HEADERS";
		echo "\n";
		foreach ($headers as $names => $values) {
    			echo $names.": ".$values;
			echo "\n";
		}
		$cookies = $response->getHeader('Set-Cookie',true);
		echo "COOKIES";
		echo "\n";
		echo $cookies;
		foreach($cookies as $names => $values){
			echo $names.": ".$values;
                        echo "\n";
		}
	//Send the body string to get the diferents auth variables
		$auth_var = GetAuthentificationVariables($body);
	//If all is ok, go to main.php
	header("Location: ../html/main.php");
	
	//echo $auth_var[2];
	
	SaveAuth($auth_var);
	
	SaveIDs($auth_var);
	
	SaveUserInfo($user->email,$user->password);
	
	}
	//If it's not okey, send and error and return to index.php
	catch(Guzzle\Http\Exception\BadResponseException $e){

		echo 'ERROR\n';
		echo $e->getMessage();
		header("Location: ../index.php");
	}


	//Execute all the scripts that are needed
	$track_list = shell_exec('php lists.php');
	echo "<pre>$track_list</pre>";
	
	//Save Android ID
	$android_id = $_POST['android_id'];
        SaveAndroidId($android_id);

	//Save tokens necessary to get the audio stream
	$audio_tokens = shell_exec('php tokenauth.php');	
?>
