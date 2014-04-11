<?php
	
	if(isset($_POST['value']) && !empty($_POST['value'])) {    			
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
	}
?>
