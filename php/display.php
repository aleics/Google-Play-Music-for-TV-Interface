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
	
	//Display variables per page
	function DisplayVariablesPerPages($matrix,$num_page){
	
	$variables_for_page = 14; //number of variables for every page

	$start = 0+($variables_for_page*$num_page);
	$end = 13+($variables_for_page*$num_page);
	
	if($end>=sizeof($matrix)){
		$end = $songstitle;
	}

	for($y=$start;$y<$end;$y++){ 
		echo "<tr>";
		for($x=0;$x<sizeof($matrix[0]);$x++){
			echo "<td> <a href='#'><span>".$matrix[$y][$x]."</td>";
		} 
		echo "</tr>";
	}
	}

?>
