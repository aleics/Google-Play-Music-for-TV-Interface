<?php
	//Include the functions library
	include 'functions.php';
	
	//Name of the file where is the track list information
	$fileName = "/var/www/GooglePlayWebTv/php/TrackList.txt";
	
	//Declaration of arrays
	$songstitle = array();
	$songsartist = array();
	$songsalbum = array();

	//Title, artist, and album description
	$str_title = '"title": "';
	$str_artist = '"artist": "';
	$str_album = '"album": "';

	
	//Get the variables form the track list
	$songstitle = GetVariableTrackList($fileName,$str_title);
	$songsartist = GetVariableTrackList($fileName,$str_artist);
	$songsalbum = GetVariableTrackList($fileName,$str_album);
	
	//Creating the Matrix that we will displace on MyLibrary.html
	$matrix =  GetMatrixMyLibrary($songstitle,$songsartist,$songsalbum);
	
	/*for($y=0;$y<sizeof($songstitle);$y++){
		for($x=0;$x<sizeof($matrix[0]);$x++){
		echo $matrix[$y][$x];
		echo "            ";
		}
		echo "\n";
	}i*/

?>
