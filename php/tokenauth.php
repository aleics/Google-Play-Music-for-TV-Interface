<?php

	//Include functions library
        include 'functions.php';

	//SaveIssueAuthToken();
	GetxtToken();


	/*$idandinfo = GetIDandInfoofSongs();
        $songids = $idandinfo[0];

	$stream = GetStreamUrlAllTracks($songids[0]);

	$audio_url = GetAudioUrl($stream);

	echo "\n";
	
	//echo $audio_url[0];*/

	



	//1. First step: get the xt token
	//Get the IssueAuthToken that then we will use to get the xt Token
	/*function SaveIssueAuthToken(){
	$ids = array();
	$ids = ReadIDs();
	
	$sid = $ids[0]; 
	$lsid = $ids[1];

	$url_issueauthtoken = 'htpps://www.google.com/accounts/IssueAuthToken';
	
	$fields = array_to_url(array('SID' => $sid,'LSID' => $lsid, 'service' => 'gaia'));
	$command = 'curl --data "'.$fields.'" https://www.google.com/accounts/IssueAuthToken > ../Info/token.txt';

	$token_shellcommand = shell_exec($command);
	}*/


	//2. Second step: get the xt token
	//Get the xt token and the sjsaid to get the stream url
	function GetxtToken(){
	
	$url_tokenauth = 'https://play.google.com/music/listen';
	
	$header = 'Authorization: GoogleLogin auth='.ReadAuth();

	$out = get_to_url($url_tokenauth,$header);
	$header_response = $out[1];

	$xt_localization = strpos($header_response,'xt=');
	$xt = substr($header_response,$xt_localization,79);
	
	$sjsaid_localization = strpos($header_response,'sjsaid=');
	$sjsaid = substr($header_response,$sjsaid_localization,43);
	
	SavextToken($xt,$sjsaid);

	return array($xt,$sjsaid);
	}
	



	/*function SaveStreamUrlAllTracks(){
	
	$idandinfo = GetIDandInfoofSongs();
	$songids = $idandinfo[0];
	$songname = $idandinfo[1];
	
	$streams = GetStreamUrlAllTracks($songids[0]);
	//$streams_cl = CleanStreamUrl($streams);
	

	/*foreach($streams as $value){
	echo $value;
	echo "\n";
	gettype($value);
	echo "\n";
	}
	echo sizeof($streams);

	echo "\n";
	
	return $streams;
	}*/
	/*
	//Function to decode the Stream url 
	function CleanStreamUrl($stream){
		
		$stream_cl = substr($stream,strlen('{"tier":1,"url":"'),strlen($stream)-strlen('{"tier":1,"url":"')-2);
        	$stream_clean =  ReplaceSerieStringsinString(ReplaceSerieStringsinString($stream_cl,'\u003d','='),'\u0026','&');
        	$streamout =  $stream_clean.'&ps=f';

	return $streamout;

	}

	//Function to replace strings in one string
	function ReplaceSerieStringsInString($str,$oldstring,$newstring){


        $tmpOldStrLength = strlen($oldstring);

        while (($offset = strpos($str, $oldstring, $offset)) !== false) {
          $str = substr_replace($str, $newstring, $offset, $tmpOldStrLength);
        }

        return $str;

        }


	//function to do a get request
	function get_to_url($url,$headers){
	
		

		$ch = curl_init($url);
	        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);
		curl_setopt($ch, CURLOPT_HEADER, 1);
	       	curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_1);
		if(!is_array($headers)){ curl_setopt($ch,CURLOPT_HTTPHEADER,array($headers));}
		else{ curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);}

	        $output = curl_exec($ch);
	        $status = curl_getinfo($ch,CURLINFO_HTTP_CODE);
		
		$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
		$header_response = substr($output, 0, $header_size);
		$body = substr($output, $header_size);

	        curl_close($ch);
		return array($body,$header_response,$status);
	}	

	//function to turn array to url parameters
	function array_to_url($data){
            $fields = '';
            foreach ($data as $key => $value) {
                $fields .= $key . '=' . $value . '&';
            }
            rtrim($fields, '&');

            return $fields;
        }

	//Function to Save the xt and sjsaid Token
	function SavextToken($xt,$sjsaid){

                $myFile = '/var/www/GooglePlayWebTv/Info/xttoken.txt';
                $fh = fopen($myFile,'w') or die ("can't open file");
                fwrite($fh,$xt);
		fwrite($fh,"\n");
                fwrite($fh,$sjsaid);
                fclose($fh);

	}

	//Function to Read the xt Token from file
	function ReadxtToken(){
	$myFile = fopen('/var/www/GooglePlayWebTv/Info/xttoken.txt',"rb");
        $input = fread($myFile,filesize('/var/www/GooglePlayWebTv/Info/xttoken.txt'));
        fclose($myFile);


        $xt = str_replace("xt=",'',$input);
        $xtdef = substr_replace($xt,'',strrpos($xt,"sjsaid="));
        return trim(preg_replace('/\s+/', ' ', $xtdef));
	}

	//Function to Read the sjsaid Token from file
	function ReadsjsaidToken(){
	
	$myFile = fopen('/var/www/GooglePlayWebTv/Info/xttoken.txt',"rb");
        $input = fread($myFile,filesize('/var/www/GooglePlayWebTv/Info/xttoken.txt'));
        fclose($myFile);


        $sj = substr_replace($input,'',0,strrpos($input,"sjsaid="));
	$sjdef = str_replace("sjsaid=",'',$sj);
        return $sjdef;	
	
	}*/

?>
