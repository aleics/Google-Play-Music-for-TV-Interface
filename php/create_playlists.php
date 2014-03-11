<?php

	$con=mysqli_connect(54.220.191.31,"ubuntu","byvmc4fr","my_db"); //CONNECT WITH DATABASE
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	$sql="INSERT INTO Persons (FirstName, LastName, Age) VALUES ('$_POST[firstname]','$_POST[lastname]','$_POST[age]')";

	if (!mysqli_query($con,$sql))
	{
		die('Error: ' . mysqli_error($con));
	}
	echo "1 record added";

	mysqli_close($con);


	/* session_start();
	
	if (isset($_SESSION['delete_all_playlists'])){
		session_unset(); 
		$_SESSION['create_playlist'] = array();
		$playlists = array();
	}
	
	else{

		if (!isset($_SESSION['create_playlist'])) {
			$_SESSION['create_playlist'] = array();
			$playlists = array();
		} 

	
		$playlist_element = $_POST["create_playlist"];
		array_push($_SESSION['create_playlist'],$playlist_element);
	

		$playlists = array_filter($_SESSION['create_playlist']);
		/* foreach ($playlists as $value) {
			echo $value . "<br/>\n";
		}  */
	} */

	
			/*for ($i = 0; $i < count($_SESSION['create_playlist']); $i++) { unset($_SESSION['create_playlist'][$i]); }*/

?>