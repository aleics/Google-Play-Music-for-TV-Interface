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
		<script type="text/javascript" src="../Scripts/resources.js"></script>
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
			<li><a href='../main.php' id="ListenNow"><span>Listen Now</span></a></li>
			<li><a href='MyLibrary.php?page=0' id="MyLibrary"><span>My Library</span></a></li>
			<li><a href='Explore.php' id="Explore"><span>Explore</span></a></li>
			<li><a href='Playlists.php?page=0' id="Playlists"><span>Playlists</span></a>
        
			 <?php include '/var/www/GooglePlayWebTv/php/displays.php'; DisplayPlaylistsSubmenu(DisplayPlaylists());?>

	
    </li>    
</ul>
</div>

	<header><a class="headerbox">Explore</a></header>

	<form enctype="multipart/form-data"  method="get" action="Search.php" name="test">
		 <input name="search" type="text" id="input_explore"><br>
		 <input  name="submit_explore" value="Go" type="submit" id="submit_explore">
		 <input name="page" value="0">
	</form>

 
</body>
</html>
