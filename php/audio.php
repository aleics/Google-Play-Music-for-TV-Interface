<?php
	/*
	AUDIO.PHP
	In this php script we will get the song of the id song chosed
	*/


	include 'functions.php';

	//Delete the last song that was saved	
	unlink('/var/www/GooglePlayWebTv/Contents/Audio/song.mp3');	
	
	//Get the stream URL track and get the mpeg file of the id song
	$stream = GetStreamUrlTrack($_GET['id']);
        $audio_file = GetAudioFile($stream);

	//Save the audio file
        SaveAudioFile($audio_file);
	
	//Return the id selected to the client side
	echo $_GET['id'];




?>
