<?php

	include 'functions.php';
/*
	if(isset($_GET['id'])){
	if($_GET['play'] == 'yes'){
        $stream = GetStreamUrlTrack($_GET["id"]);
        $audio_file = GetAudioFile($stream);

        SaveAudioFile($audio_file);
	}
	}
*/
	$stream = GetStreamUrlTrack('5c9bcd1b-b971-3e63-8f8e-3b2709a05480');
        $audio_file = GetAudioFile($stream);

        SaveAudioFile($audio_file);


?>
