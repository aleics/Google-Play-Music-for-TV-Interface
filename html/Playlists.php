<!DOCTYPE HTML>
<?php 
      if(!file_exists('/var/www/GooglePlayWebTv/Info/Auth.txt')){ header('Location: ../index.php'); }
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- Title tag just for valid html5, can not be seen -->
        <title>Google Play TV Box</title>
        <style> .removed{display:none!important;} .invisible{visibility:hidden!important;width:0px!important;height:0px!important;overflow:hidden!important;}</style>
        <link rel="stylesheet" href="../Contents/default.css">
		<script src="../Lib/jquery-2.0.3.js"></script>
		<script type="text/javascript" src="../Scripts/menu_jquery.js"></script>
		<script type="text/javascript" src="../Lib/ceScript_dev_0-1-4-1.js"></script>
		<script type="text/javascript" src="../Scripts/resources.js"></script>
		<?php include '../php/displays.php'?>
		<!--<script type="text/javascript" src="../Scripts/keycodes_playlists.js"></script> -->
	</head>
	
	<title>Google Play for TV Box</title>
	
	<body style="background: white; position: absolute; left: 60px;">
	
	<header>
	<img src="../Images/google_toolbar.jpg" id="toolbarlogo">
	<input type="image" name="logout" src="../Images/logoutbutton.jpg" class="button" id="logoutbutton" name='logout' value='logout' onclick="logout()">
	<a href="./Settings.php"><input type="image" name="configuration" src="../Images/Configure.jpg" class="button" id="configurationbutton" name='configuration' value='configuration'></a>
	</header>
	
	<div id="toolbarmusic"> Music Menu </div>
	
	
	<div id='toolbarmenu'>
		<ul id='toolbarmenu'>
			<li><a href='main.php' id="ListenNow"><span>Listen Now</span></a></li>
			<li><a href='MyLibrary.php?page=0' id="MyLibrary"><span>My Library</span></a></li>
			<li><a href='Explore.php' id="Explore"><span>Explore</span></a></li>
			<li><a href='Playlists.php?page=0' id="Playlists"><span>Playlists</span></a>

    </li>    
</ul>
</div>


<!-- Headers of every part of the menu -->
<header>

<a class="headerbox">Playlists</a>
<a class="headerbox" id="playlistheaderbox" style="display:none;"><?php echo $_GET['playlist']; ?></a>

</header>
<table id="Playlist_List">
<tbody id="BodySongs">
	<tr class="variable_per_page" id="plusplaylist"> 
	<td><a href="./PlusPlaylist.php" name="create_playlist"><span> Create a new Playlist</span></a> </td>
	</tr>
	<tr class="variable_per_page" id="delete_all_playlists"> 
	<td><a href="#" name="delete_all_playlists"><span> Delete all the Playlists </span></a> </td>
	</tr>
		<?php
			
	                $numPage = 0;
        	        DisplayVariablesPerPages(DisplayPlaylists(),$numPage,12);
		
			
		?>
</tbody>
</table>

<table id="MyLibrarySongs">
<tbody id="BodySongs">

	<?php
		$numPage = $_GET["page"];
		$playlist = $_GET["playlist"];

		DisplayVariablesPerPages(DisplaySongsOfPlaylists($playlist),$numPage,12);
	
	?>


</tbody>
</table>

<?php

	$playlist_selected = false;

	if($_GET['playlist']!= null){
		$playlist_selected = true;
	}

?>


<script>

	
	var playlist_selected = "<?php echo $playlist_selected;?>";
	
	if(playlist_selected == true){
		document.getElementById("Playlist_List").style.display = 'none';
		$("#playlistheaderbox").show();
	}

  	

</script>



<!-- <footer>
	<img src="../Images/previous_logo.jpg" id="previouslogo" style="display:none;">
	<img src="../Images/play_logo.jpg" id="playlogo">
	<img src="../Images/pause_logo.jpg" id="pauselogo" style="display:none;">
	<img src="../Images/next_logo.jpg" id="nextlogo" style="display:none;">
</footer> -->

</body>
</html>

	

