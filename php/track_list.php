<?php

	//Include functions library
	include 'functions.php';
	
	//Read Auth.txt
	$auth = ReadAuth();

	//Get all the tracks sending the curl request
	$tracks = get_all_tracks($auth);

	//Save Track list in a file
	SaveTrackList($tracks);
	
?>
