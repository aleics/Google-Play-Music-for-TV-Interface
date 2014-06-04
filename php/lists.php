<?php
	/*
	LISTS.PHP
	On this file we will get all lists of every Playlist, Tracklist, etc.
	*/
	//Include functions library
        include 'functions.php';

        //Read Auth.txt
        $auth = ReadAuth();

	//Get all the tracks sending the curl request
        $tracks = get_all_tracks($auth);

        //Save Track list in a file
        SaveTrackList($tracks);

        //Get all the playlists sending the curl request
        $playlists = get_all_playlists($auth);

        //Save Track list in a file
        SavePlaylistList($playlists);

	//Get all songs of every playlist
	$songs_of_playlist = get_all_songs_of_playlists($auth);

	//Save Playlist Song list
	SavePlaylistSongList($songs_of_playlist);
?>
