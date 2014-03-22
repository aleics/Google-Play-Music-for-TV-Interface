<?php
	//Include functions library
        include 'functions.php';

        //Read Auth.txt
        $auth = ReadAuth();

        //Get all the playlists sending the curl request
        $playlists = get_all_playlists($auth);

        //Save Track list in a file
        SavePlaylistList($playlists);

?>
