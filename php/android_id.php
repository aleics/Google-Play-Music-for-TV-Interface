<?php
	/*
	ANDROID_ID.PHP (OPTIONAL SCRIPT)
	In this file we will save the android_id filled on the index.php for the user.
	*/


	include 'functions.php';
	
	//Get the android_id variable
	$android_id = $_POST['android_id'];

	//Save the android_id
	SaveAndroidId($android_id);			
	
	header('Location: ../html/Settings.php');

?>
