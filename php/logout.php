<?php

	/*
	LOGOUT.PHP
	If the button logout is pressed, delete all the files that contain information of the user
	*/
	if($_GET['DeleteAllFiles'] == 'yes'){
		unlink('/var/www/GooglePlayWebTv/Info/TrackList.txt');
                unlink('/var/www/GooglePlayWebTv/Info/Auth.txt');
                unlink('/var/www/GooglePlayWebTv/Info/PlaylistList.txt');
		unlink('/var/www/GooglePlayWebTv/Info/android.txt');
		unlink('/var/www/GooglePlayWebTv/Info/user.txt');
		unlink('/var/www/GooglePlayWebTv/Info/IDs.txt');
		unlink('/var/www/GooglePlayWebTv/Info/PlaylistSongList.txt');
		unlink('/var/www/GooglePlayWebTv/Info/streamurl.txt');
		unlink('/var/www/GooglePlayWebTv/Info/token.txt');
		unlink('/var/www/GooglePlayWebTv/Info/xttoken.txt');
		unlink('/var/www/GooglePlayWebTv/Contents/Audio/song.mp3');
	}
?>
