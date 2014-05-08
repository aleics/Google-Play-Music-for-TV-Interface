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
		<script type="text/javascript" src="../Scripts/ceScript_dev_0-1-4-1.js"></script>
		<script type="text/javascript" src="../Scripts/resources.js"></script>
		<?php include '../php/display_playlists.php'?>
		<!--<script type="text/javascript" src="../Scripts/keycodes_playlists.js"></script> -->
	</head>
	
	<title>Google Play for TV Box</title>
	
	<body style="background: white; position: absolute; left: 60px;">
	
	<header>
	<img src="../Images/google_toolbar.jpg" id="toolbarlogo">
	<input type="image" src="../Images/logoutbutton.jpg" id="logoutbutton">
	</header>
	
	<div id="toolbarmusic"> Music Menu </div>
	
	
	<div id='toolbarmenu'>
		<ul id='toolbarmenu'>
			<li><a href='../main.php' id="ListenNow"><span>Listen Now</span></a></li>
			<li><a href='MyLibrary.php?page=0' id="MyLibrary"><span>My Library</span></a></li>
			<li><a href='Explore.php' id="Explore"><span>Explore</span></a></li>
			<li><a href='Playlists.php' id="Playlists"><span>Playlists</span></a>
    </li>    
</ul>
</div>


<!-- Headers of every part of the menu -->
<header><a id="headerboxPlaylists">Playlists</a></header>
<table id="Playlist_List">
<tbody id="BodySongs">
	<tr class="playlist_element" id="plusplaylist"> 
	<td><a href="./PlusPlaylist.php" name="create_playlist"><span> Create a new Playlist</span></a> </td>
	</tr>
	<tr class="playlist_element" id="delete_all_playlists"> 
	<td><a href="#" name="delete_all_playlists"><span> Delete all the Playlists </span></a> </td>
	</tr>
<!--</tbody>-->
<!--</table>-->
<!--<table id="Playlist_List" style="top: 275px;">-->
<!--<tbody id="BodySongs">-->
		<?php
			
	                $numPage = 0;
        	        DisplayVariablesPerPages($name,$numPage);
		
			
		?>
</tbody>
</table>


<!-- <table id="Playlist_List">
<tbody>
	<tr class="playlist_element" id="plusplaylist"> 
	<td><a href='#'><span> Create a new Playlist</span></a> </td>
	</tr>
	
	<tr class="playlist_element"> 
	<td><a href='#'><span> Playlist 1</span></a> </td>
	</tr>
	<tr class="playlist_element"> 
	<td><a href='#'><span> Playlist 2</span></a></td>
	</tr>
	<tr class="playlist_element"> 
	<td><a href='#'><span> Playlist 3</span></a> </td>
	</tr>
	<tr class="playlist_element"> 
	<td><a href='#'><span> Playlist 4</span></a> </td>
	</tr>
</tbody>
</thead>
</table> -->

<!-- <footer id="footer_play" style="display:none;">
	<img src="../Images/previous_logo.jpg" id="previouslogo" style="display:none;">
	<img src="../Images/play_logo.jpg" id="playlogo">
	<img src="../Images/pause_logo.jpg" id="pauselogo" style="display:none;">
	<img src="../Images/next_logo.jpg" id="nextlogo" style="display:none;">
</footer> -->

</body>
</html>

	

