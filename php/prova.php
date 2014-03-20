<?php

	include 'functions.php';
	//$prova = GetSongName("TrackList.txt");	
	//echo $prova;
	$fileName = "TrackList.txt";

	$songstitle = array();
	$songsartist = array();
	$songsalbum = array();

	$str_title = '"title": "';
	$str_artist = '"artist": "';
	$str_album = '"album": "';


	$songstitle = GetVariableTrackList($fileName,$str_title);
	$songsartist = GetVariableTrackList($fileName,$str_artist);
	$songsalbum = GetVariableTrackList($fileName,$str_album);
	//echo str_replace('"title": "','',$songstitle[0]);	
	//$titles = DeleteValueDescription($songstitle,$str_title);
	//$albums = DeleteValueDescription($songsalbum,$str_album); 
	//$prov = substr($songsartist[0],4,-1);
	//echo $prov;
	//echo strlen($prov);

	echo $songstitle[0];
	echo "\n";
	echo $songsartist[0];
	echo "\n";
	echo $songsalbum[0];
	echo "\n";
	echo strlen($songstitle[0])." ".strlen($songsartist[0])." ".strlen($songsalbum[0]);
	echo "\n";
	echo sizeof($songstitle)." ".sizeof($songsartist)." ".sizeof($songsalbum);
	echo "\n";
	$matrix =  GetMatrixMyLibrary($songstitle,$songsartist,$songsalbum);
	echo sizeof($matrix[0]);
	echo "\n";
	//echo $matrix[0][0]." ".$matrix[0][1]." ".$matrix[0][2];
	
	for($y=0;$y<sizeof($songstitle);$y++){
		for($x=0;$x<sizeof($matrix[0]);$x++){
		echo $matrix[$y][$x];
		echo "            ";
		}
		echo "\n";
	}	
	//$FileName = "TrackList.txt";
	//$myFile = fopen($FileName,"rb");
	//$input = fread($myFile,filesize($FileName));
	
	//$NumLine = 0;
	/*if ($myFile) {
		while (($buffer = fgets($myFile, 4096)) !== false) {
        		echo $buffer;
    		}
		if(!feof($myFile)){
			echo "Error: unexpected fgets() fail\n";
		}
	fclose($myFile);	
	}*/

	/*while(!feof($myFile)){
		$content = stream_get_line($myFile,100,"\n");
		echo $content;
	}*/

/*	$lines = file($FileName);
	$str = '"title"';
	$cont = 0;
	$output = array();
	foreach($lines as $lineNumber => $line){
		if(strpos($line,$str) !== false){
			//$output = explode('"title": ',$line);
			$output[] = $line;
			//$cont++;
			
		}
	}
	for($x=0;$x<count($output);$x++){
		echo $output[$x];
	}
	fclose($myFile);
*/

?>
