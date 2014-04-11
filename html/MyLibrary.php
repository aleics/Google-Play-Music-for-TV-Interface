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
		<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script type="text/javascript" src="../Scripts/menu_jquery.js"></script>
		<script type="text/javascript" src="../Scripts/resources.js"></script>
		<!--<script type="text/javascript" src="../Scripts/keycodes_mylibrary.js"></script>-->
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
			<li><a href='MyLibrary.php' id="MyLibrary"><span>My Library</span></a></li>
			<li><a href='Explore.php' id="Explore"><span>Explore</span></a></li>
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


<!-- Headers of every part of the menu -->
<header><a id="headerboxMyLibrary">My Library</a></header>


<!--MYLIBRARY-->

<table id="MyLibrarySongs">
<thead style="text-align:left; background-color: #bebebe;"><tr><th>Song</th> <th>Artist</th> <th>Album</th></tr></thead>
<tbody id="BodySongs">
	<?php
		include '/var/www/GooglePlayWebTv/php/display_tracks.php';
		DisplayVariablesPerPages($matrix,1);
	?>
</tbody>;
</thead>;
</table>;

<!--Arrows next/previous page-->
<form action="javascript:void(0)" method="POST">
<input type="image" src="../Images/arrow-right.jpg" id="arrowbtnright" value="1" class="arrowbtn" name="arrowr" width="40" height="40" style="position: absolute; top: 740px; left: 1110px; opacity: 0.5;"></input>


<form action="javascript:void(0)" method="POST">
<input type="image" src="../Images/arrow-left.jpg" id="arrowbtnleft" value="-1" class="arrowbtn" name="arrowl" width="40" height="40" style="position: absolute; top: 740px; left: 220px; opacity: 0.5; display: none;">

</body>
</html>
