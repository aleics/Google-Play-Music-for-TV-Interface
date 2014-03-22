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
		<script type="text/javascript" src="../Scripts/keycodes_mylibrary.js"></script>
	</head>
	
	<title>Google Play for TV Box</title>
	<?php include '../php/display_tracks.php' 
	      //include '../php/functions.php' ?>
	<body style="background: white; position: absolute; left: 60px;">
	
	<header>
	<img src="../Images/google_toolbar.jpg" id="toolbarlogo">
	</header>
	
	<div id="toolbarmusic"> Music Menu </div>
	
	
	<div id='toolbarmenu'>
		<ul id='toolbarmenu'>
			<li><a href='../main.php' id="ListenNow"><span>Listen Now</span></a></li>
			<li><a href='MyLibrary.php' id="MyLibrary"><span>My Library</span></a></li>
			<li><a href='#' id="Radio"><span>Radio</span></a></li>
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
		$numPage = 0; 
		DisplayVariablesPerPages($matrix,$numPage);
	
echo "</tbody>";
echo "</thead>";
echo "</table>";

//<!--Arrows next/previous page-->
//echo '<form action="" method="POST">';
echo '<input type="image" src="../Images/arrow-right.jpg" name="arrowr" width="40" height="40" style="position: absolute; top: 740px; left: 1110px; opacity: 0.5;"></input>';
echo '<input type="image" src="../Images/arrow-left.jpg" name="arrowl" width="40" height="40" style="position: absolute; top: 740px; left: 220px; opacity: 0.5; display: none;">';
//echo '</form>';

//<?php
        /* if($_POST['arrowr_x']!=0){	
		echo '<input type="image" src="../Images/arrow-left.jpg" name="arrow_left" width="40" height="40" style="position: absolute; top: 740px; left: 220px; opacity: 0.5;>';
                $numPage++;
                }
         else if($_POST['arrowl_x']!=0){
                        $numPage--;
                }*/

?>
</body>
</html>
