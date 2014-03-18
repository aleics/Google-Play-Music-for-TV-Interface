<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- Title tag just for valid html5, can not be seen -->
        <title>Google Play TV Box</title>
        <style> .removed{display:none!important;} .invisible{visibility:hidden!important;width:0px!important;height:0px!important;overflow:hidden!important;}</style>
        <link rel="stylesheet" href="./Contents/default.css">
		<script src="./Lib/jquery-2.0.3.js"></script>
 		<script type="text/javascript" src="./Scripts/menu_jquery.js"></script>
		<script type="text/javascript" src="./Scripts/keycodes.js"></script>
	</head>
	
	<title>Google Play for TV Box</title>
	
	<body style="background: white; position: absolute; left: 60px;">
	
	<header>
	<img src="./Images/google_toolbar.jpg" id="toolbarlogo">
	</header>
	
	<div id="toolbarmusic"> Music Menu </div>
	
	
	<div id='toolbarmenu'>
		<ul id='toolbarmenu'>
			<li><a href='./main.php' id="ListenNow"><span>Listen Now</span></a></li>
			<li><a href='./html/MyLibrary.php' id="MyLibrary"><span>My Library</span></a></li>
			<li><a href='#' id="Radio"><span>Radio</span></a></li>
			<li><a href='./html/Explore.php' id="Explore"><span>Explore</span></a></li>
			<li><a href='./html/Playlists.php' id="Playlists"><span>Playlists</span></a>
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


<!-- Headers of every part of the menu -->
<!-- <img src="./Images/ListenNow_toolbar.jpg" style="position: absolute; top: 120px; left: 218px;"> -->
<header><a id="headerboxListenNow">Listen Now</a></header>
<header><a id="headerboxMyLibrary" style="display:none;">My Library</a></header>
<header><a id="headerboxRadio" style="display:none;">Radio</a></header>
<header><a id="headerboxExplore" style="display:none;">Explore</a></header>
<header><a id="headerboxPlaylists" style="display:none;">Playlists</a></header>


	
	
	
<input type="submit" id="createplaylistsubmit" style="position: absolute; left: -9999px; width: 1px; height: 1px;"/>
</body>
</html>
