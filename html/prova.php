<html>
<body>




<?php	
	session_start();
	
	if (!isset($_SESSION['create_playlist'])) {
    $_SESSION['create_playlist'] = array();
	}
	
	$playlist_element = $_POST["create_playlist"];
	array_push($_SESSION['create_playlist'],$playlist_element);
	/* print_r($_SESSION['create_playlist']); echo "<br>"*/
	
	
?>



</body>
</html>
