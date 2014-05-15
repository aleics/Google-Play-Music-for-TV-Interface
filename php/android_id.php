<?php

	include 'functions.php';
	
	$android_id = $_POST['android_id'];

	SaveAndroidId($android_id);			
	
	header('Location: ../html/Settings.php');

?>
