<?php
	//functions needed
	
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


	//Save Auth variable in one file called 'Auth.txt'
	function SaveAuth($auth_var){
	
		$myFile = 'Auth.txt';
		$fh = fopen($myFile,'w') or die("can't open file");
		fwrite($fh,$auth_var[2]);
		fclose($fh);
	}


	//Read Auth variable from a file called 'Auth.txt'
	function ReadAuth(){
	
	$myFile = fopen("Auth.txt","rb");
	$input = fread($myFile,filesize("Auth.txt"));
	fclose($myFile);

	$auth = substr($input,strlen("Auth="));
	
	return $auth;
	
	}
	

	//Save the whole Track list in a file called 'TrackList.txt'
	function SaveTrackList($output){
	
	$myFile = fopen("TrackList.txt","w") or die("can't open the file");
	fwrite($myFile,$output);
	fclose($myFile);

	}

	//Get all tracks list from google	
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
?>
