<?php


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
	
	  	
	/*if(isset($_POST['value']) && !empty($_POST['value'])) {    			
		$value = $_POST['value'];
		echo $value;
		Pages($value);
	}	
	
	function Pages($value){
	$page = $value;
	return $page;
	}
	
	function logout(){
        	unlink('/var/www/GooglePlayWebTv/Info/TrackList.txt');
		unlink('/var/www/GooglePlayWebTv/Info/Auth.txt');
		unlink('/var/www/GooglePlayWebTv/Info/PlaylistList.txt');
	        header("Location: ../index.php");
	}*/
?>
