<?php
	/*
	DISPLAYS.PHP
	On this file we will have different functions of displaying the differents lists: tracks, albums, etc.

	*/

	//Include the functions library
        include 'functions.php';


	//Get the matrix of all playlists
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

	//Get te matrix of all albums
	function DisplayAlbums(){

        //Name of the file where is the album list information
        $fileName = "/var/www/GooglePlayWebTv/Info/TrackList.txt";

        //Declaration of arrays
        $name = array();

        //Name description
        $str_name = '"album": "';


        //Get the variables form the playlist list
        return $name = GetVariableList($fileName,$str_name);

        }



	//Get the matrix of all tracks
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
	

	//Get all the song of one playlist	
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

	
	//Get the ID and (title,artist,album) of all songs
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


	function GetIdofSong($song_name){
	
	$allsongs = GetIDandInfoofSongs();

	for($x=0;$x<sizeof($allsongs[1]);$x++){
	
		if($song_name == $allsongs[1][$x]){
			$chosensongid = $allsongs[0][$x];
			}
	}	
	return $chosensongid;

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


	//NOT FINISHED
        //We enter the type(album,playlist,artist) and we show random image of this
        function DisplayImageURL($type,$name){

		switch($type){

			case 'playlist':
				$image_urls = GetPlaylistImage($name);
				break;
			
			case 'album':
				$image_urls = GetAlbumImage($name);
				break;

			case 'artist':
				$image_urls = GetArtistImage();
				break;

		}
	
	return $image_urls;

        }

	//Return the image_url of 4 song of the playlist
	function GetPlaylistImage($playlistname){

	//Get IDs of all the playlist and compare the names
        //Return the ID of the name of the playlist chosed
        $matrixplaylists = GetIDofPlaylists($playlistname);

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
	//Get 4 random songs of the chosensongsid
	for($x=0;$x<4;$x++){
		$num_rand = rand(0,(sizeof($chosensongsid)-1));
		$randomsongsid[$x] = $chosensongsid[$num_rand];
	}
	
	//Get the url of every random song chosed
	//Compare the ids with all the ids and save the urls chosen
	$cont = 0;
	$chosenurl = array();
	for($x=0;$x<sizeof($randomsongsid);$x++){
			$url = GetImageUrlSong($randomsongsid[$x]);
			$chosenurl[$cont] = $url;
			$cont++;	
	}

	return $chosenurl;
	

	}


	 //Return the url of the chosen id
        function GetImageUrlSong($chosenid){

        $fileName = "/var/www/GooglePlayWebTv/Info/TrackList.txt";

        $str_url = '"url": "';
	$str_id = '"id": "';

        $url = array();
	$id = array();

        $url = GetVariableList($fileName,$str_url);
	$id = GetVariableList($fileName,$str_id);

	$matrixurlidsongs = array($id,$url);
	
	for($x=0;$x<sizeof($matrixurlidsongs[0]);$x++){
			
		
		if($matrixurlidsongs[0][$x] == $chosenid){
			$chosenurl = $matrixurlidsongs[1][$x];	
		}


	}

	

        return substr($chosenurl,2,-1);

        }

	//Get the title, artist and album of the chosenalbum
	function GetTracksofAlbum($chosenalbum){
	
        $tracks = DisplayTracks();

	$chosentracks = array();
	$cont = 0;

	//Get the variables form the track list
	for($x=0;$x<sizeof($tracks);$x++){
			if($tracks[$x][2] == $chosenalbum){
				$chosentracks[$cont] = array($tracks[$x][0],$tracks[$x][1],$tracks[$x][2]);
				$cont++;
			}
	}
	return $chosentracks;
	}
	
	//Get the url image of the chosenalbum
	function GetAlbumImage($chosenalbum){
	
	//Name of the file where is the track list information
        $fileName = "/var/www/GooglePlayWebTv/Info/TrackList.txt";

        //Declaration of arrays
        $songsurl = array();
        $songsalbum = array();

        //Title, artist, and album description
        $str_url = '"url": "';
        $str_album = '"album": "';


        //Get the variables form the track list
        $songsalbum = GetVariableList($fileName,$str_album);
        $songsurl = GetVariableList($fileName,$str_url);
	
	for($x=0;$x<sizeof($songsurl);$x++){
		$songsurl[$x] = substr($songsurl[$x],2,-1);
	}

	$matrixalbumurl = array($songsalbum,$songsurl);
	
	for($x=0;$x<sizeof($matrixalbumurl[0]);$x++){
	
		if($matrixalbumurl[0][$x] == $chosenalbum){
			$chosenurl = $matrixalbumurl[1][$x];
			break;
		}		

	}
	
	return $chosenurl;	

	}
	
?>
