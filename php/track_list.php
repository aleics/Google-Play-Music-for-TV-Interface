<?php
	//session_start();


	function ReadAuth(){
	
	$myFile = fopen("Auth.txt","rb");
	$input = fread($myFile,filesize("Auth.txt"));
	fclose($myFile);

	$auth = substr($input,strlen("Auth="));
	
	return $auth;
	
	}
	
	function SaveTrackList($output){
	
	$myFile = fopen("TrackList.txt","w") or die("can't open the file");
	fwrite($myFile,$output);
	fclose($myFile);

	}
	
	function get_all_tracks($auth){
	
	$ch = curl_init('https://www.googleapis.com/sj/v1beta1/tracks');
	$header = 'Authorization: GoogleLogin auth='.$auth;

	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_1);
	curl_setopt($ch,CURLOPT_HTTPHEADER,array($header));

	$output = curl_exec($ch);
	$status = curl_getinfo($ch);

	curl_close($ch);

	return $output;
	
	}

	$auth = ReadAuth();

	$tracks = get_all_tracks($auth);

	SaveTrackList($tracks);
	
	/*require '../Lib/Guzzle/aws-autoloader.php';
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
*/
?>
