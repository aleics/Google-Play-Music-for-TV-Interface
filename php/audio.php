<?php

	include 'functions.php';

	//Delete the last song that was saved	
	unlink('/var/www/GooglePlayWebTv/Contents/Audio/song.mp3');	
	
	$stream = GetStreamUrlTrack($_GET['id']);
        $audio_file = GetAudioFile($stream);

        SaveAudioFile($audio_file);
	
	echo $_GET['id'];




?>
