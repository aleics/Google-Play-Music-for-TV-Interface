<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- Title tag just for valid html5, can not be seen -->
        <title>Google Play TV Box</title>
        <style> .removed{display:none!important;} .invisible{visibility:hidden!important;width:0px!important;height:0px!important;overflow:hidden!important;}</style>
        <link rel="stylesheet" href="../Contents/default.css">
		<script src="../Lib/jquery-2.0.3.js"></script>
 		<script type="text/javascript" src="../Scripts/menu_jquery.js"></script>
		<script type="text/javascript" src="../Scripts/keycodes_explore.js"></script>
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
			<li><a href='Explore.php?search=' id="Explore"><span>Explore</span></a></li>
			<li><a href='Playlists.php' id="Playlists"><span>Playlists</span></a>
        <!-- <ul>
            <li><a class='#'><span>Rock</span></a></li>
			<li><a class='#'><span>Pop</span></a></li>
		    <li><a class='#'><span>Blues</span></a></li>
			<li><a class='#'><span>Jazz</span></a></li>
			<li><a class='#'><span>Metal</span></a></li> 
        </ul>  -->
    </li>    
</ul>
</div>

<header><a id="headerboxPlaylists">Playlists</a></header>

<form action="./Playlists.php" method="post">
		<input type="text" id="input_playlist" name="create_playlist" value="New Playlist"><br>
		<input type="submit" id="submit_playlist" style="" value="Submit">
</form>


</body>
</html>
