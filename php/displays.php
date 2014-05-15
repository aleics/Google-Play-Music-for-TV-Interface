<?php

	//Include the functions library
        include 'functions.php';
	

	/*$chosensongs =   DisplaySongsOfPlaylists("Jazz");
	echo "CHOSEN SONGS";
	echo "\n";
	echo sizeof($chosensongs);
	echo "\n";
        echo sizeof($chosensongs[0]);
	
	
	echo "\n";
	for($x=0;$x<sizeof($chosensongs[0]);$x++){
		for($y=0;$y<sizeof($chosensongs);$y++){	echo $chosensongs[$y][$x];	echo "\n";}
	}


	$tracks = DisplayTracks();

	echo "DISPLAY TRACKS";
	echo "\n";
        echo sizeof($tracks);
        echo "\n";
        echo sizeof($tracks[0]);


        echo "\n";
        for($x=0;$x<sizeof($chosensongs[0]);$x++){
                for($y=0;$y<sizeof($chosensongs);$y++){ echo $tracks[$y][$x];      echo "\n";}
        }*/




	function DisplayPlaylists(){

        //Name of the file where is the playlist list information
        $fileName = "/var/www/GooglePlayWebTv/Info/PlaylistList.txt";

        //Declaration of arrays
        $name = array();

        //Name description
        $str_name = '"name": "';


        //Get the variables form the playlist list
        return $name = GetVariableList($fileName,$str_name);

	}


	
	function DisplayTracks(){

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
	
	return $matrix;
	}

	
	function DisplaySongsOfPlaylists($playlistname){


	//Get IDs of all the playlist and compare the names
	//Return the ID of the name of the playlist chosed
	$matrixplaylists = GetIDofPlaylists();
	
	for($x=0;$x<sizeof($matrixplaylists[0]);$x++){

	if($matrixplaylists[1][$x] == $playlistname){$chosenid = $matrixplaylists[0][$x]; }

	}



	//GET the ID of the songs and the playlist and compare the playlists ID
	//Return the IDs of the chosen songs
	$matrixsongsofplaylist = GetIdSongsofeveryPlaylist();

	$cont = 0;
	for($x=0;$x<sizeof($matrixsongsofplaylist[0]);$x++){
	
		if($matrixsongsofplaylist[0][$x] == $chosenid){
			$chosensongsid[$cont] = $matrixsongsofplaylist[1][$x];
			$cont++;
		}

	}	



	//GET the Info (id,title,album,artist) of all the songs and compare with the ID of the chosen songs
	//Return the title,album,artist of the chosen songs
	$matrixsongsidinfo = GetIDandInfoofSongs();
	
	$z = 0;
	$matrixsongstitle = array();
	$matrixsongsartist = array();
	$matrixsongsalbum = array();

	for($x=0;$x<sizeof($matrixsongsidinfo[0]);$x++){
	
		for($y=0;$y<sizeof($chosensongsid);$y++){

		if($matrixsongsidinfo[0][$x] == $chosensongsid[$y]){
			
			$title = $matrixsongsidinfo[1][$x];
			$artist = $matrixsongsidinfo[2][$x];
			$album = $matrixsongsidinfo[3][$x];

			$matrixsongstitle[$z] = $title;
			$matrixsongsartist[$z] = $artist;
			$matrixsongsalbum[$z] = $album;

			$z++;
		}

	}
	}	


	$chosenmatrix =  GetMatrixMyLibrary($matrixsongstitle,$matrixsongsartist,$matrixsongsalbum);

	return $chosenmatrix;
	}


	function GetIDandInfoofSongs(){
        
	//Name of the file where is the track list information
        $fileName = "/var/www/GooglePlayWebTv/Info/TrackList.txt";

        //Declaration of arrays
        $songstitle = array();
        $songsartist = array();
        $songsalbum = array();
	$songsid = array();

        //Title, artist, and album description
        $str_title = '"title": "';
        $str_artist = '"artist": "';
        $str_album = '"album": "';
	$str_id = '"id": "';


        //Get the variables form the track list
        $songstitle = GetVariableList($fileName,$str_title);
        $songsartist = GetVariableList($fileName,$str_artist);
        $songsalbum = GetVariableList($fileName,$str_album);
	$songsid = GetVariableList($fileName,$str_id);

        return array($songsid,$songstitle,$songsartist,$songsalbum);
        }

	//Return the ID and the name of every playlist in the file
	function GetIDofPlaylists(){
		
	$fileName = "/var/www/GooglePlayWebTv/Info/PlaylistList.txt";
		
	$str_id = '"id": "';
	$str_name = '"name": "';
	
	$playlistid = array();
	$playlistname = array();

	$playlistid = GetVariableList($fileName,$str_id);
	$playlistname = GetVariableList($fileName,$str_name);
		
	return array($playlistid,$playlistname);	
	}


	//Return the ID of playlist and songs associated
	function GetIDSongsofeveryPlaylist(){
	
	$fileName = "/var/www/GooglePlayWebTv/Info/PlaylistSongList.txt";

        $str_id_playlist = '"playlistId": "';
        $str_id_song = '"trackId": "';

        $playlistid = array();
        $songid = array();

        $playlistid = GetVariableList($fileName,$str_id_playlist);
        $songid = GetVariableList($fileName,$str_id_song);

        return array($playlistid,$songid);

	}


?>
