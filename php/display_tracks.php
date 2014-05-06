<?php
	//Include the functions library
	include 'functions.php';
	
	//Name of the file where is the track list information
	$fileName = "/var/www/GooglePlayWebTv/Info/TrackList.txt";
	
	//Declaration of arrays
	$songstitle = array();
	$songsartist = array();
	$songsalbum = array();

	//Title, artist, and album description
	$str_title = '"title": "';
	$str_artist = '"artist": "';
	$str_album = '"album": "';

	
	//Get the variables form the track list
	$songstitle = GetVariableList($fileName,$str_title);
	$songsartist = GetVariableList($fileName,$str_artist);
	$songsalbum = GetVariableList($fileName,$str_album);
	
	//Creating the Matrix that we will displace on MyLibrary.html
	$matrix =  GetMatrixMyLibrary($songstitle,$songsartist,$songsalbum);
?>
