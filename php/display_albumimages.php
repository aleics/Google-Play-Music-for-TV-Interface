<?php

	include 'functions.php';

	 //Name of the file where is the track list information
        $fileName = "/var/www/GooglePlayWebTv/Info/TrackList.txt";

        //Declaration of arrays
        $albumimages = array();

        //Title, artist, and album description
        $str_url = '"url": ';


        //Get the variables form the track list
        $albumimages = GetVariableList($fileName,$str_url);
	
	//echo $albumimages[1];
	
	//$output = array();
	//$output = GetInfoOf($fileName,"artist");

	$output = array();
	$output = GetAllTracksInfo();
	echo $output;
	for($y=0;$y<sizeof($output);$y++){
	echo $output[0][$y];
	}

        //Creating the Matrix that we will displace on MyLibrary.html
        //$matrix =  GetMatrixMyLibrary($songstitle,$songsartist,$songsalbum);


?>
