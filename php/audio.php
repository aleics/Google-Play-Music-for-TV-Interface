<?php

	include 'functions.php';
	
	$stream = GetStreamUrlAllTracks('5c9bcd1b-b971-3e63-8f8e-3b2709a05480');
	$audio_file = GetAudioFile($stream);

	//3. First step: get the stream url of the song selected
        function GetStreamUrlAllTracks($songid){
        $xt = ReadxtToken();
        $sjsaid = ReadsjsaidToken();

        $cont = 0;
        $url = 'https://play.google.com/music/play?u=0&songid='.$songid.'&pt=e';
        $auth_header = 'Authorization: GoogleLogin auth='.ReadAuth();
        $cookie_header = 'Cookie: sjsaid='.$sjsaid.'; xt='.$xt.';';
        $headers = array($auth_header,$cookie_header);

        $out = get_to_url($url,$headers);
        $stream_url =  $out[0];

        $stream_url_cl = CleanStreamUrl($stream_url);


        $myFile = '/var/www/GooglePlayWebTv/Info/streamurl.txt';
        $fh = fopen($myFile,'w') or die("can't open file");
        fwrite($fh,$stream_url_cl);
        fclose($fh);

        return $stream_url_cl;
        }

        function GetAudioFile($stream_url){

        $header = 'Referer: https://play.google.com/music/listen';

        $audio_file = get_to_url($stream_url,$header);

        return $audio_file;

        }




?>
