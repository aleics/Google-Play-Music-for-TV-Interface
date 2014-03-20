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
	<?php include '../php/display_mylibrary.php' ?>	
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
	<?
		
		for($y=0;$y<sizeof($songstitle);$y++){
	?>
		<tr>
			<?
			for($x=0;$x<sizeof($matrix[0]);$x++){
			?><td> <a href='#'><span>
			<?php
				echo $matrix[$y][$x];
			?></td>
			<?
			}
		?></tr><?
		}
	?>
	<!--<tr> 
	<td> <a href='#'><span>Song 1</span></a> </td> <td><a href='#'><span> Artist 1 </span></a></td> <td><a href='#'><span> Album 1 </span></a></td>
	</tr>
	<tr> 
	<td><a href='#'><span> Song 2 </span></a></td> <td> <a href='#'><span>Artist 2 </span></a></td> <td><a href='#'><span> Album 2</span></a> </td>
	</tr>
	<tr> 
	<td><a href='#'><span> Song 3 </span></a></td> <td> <a href='#'><span>Artist 3 </span></a></td> <td><a href='#'><span>Album 3 </span></a></td>
	</tr>
	<tr> 
	<td><a href='#'><span> Song 4 </span></a></td> <td><a href='#'><span> Artist 4 </span></a></td> <td><a href='#'><span> Album 4 </span></a></td>
	</tr>
	<tr> 
	<td><a href='#'><span> Song 5 </span></a></td> <td><a href='#'><span> Artist 5</span></a> </td> <td><a href='#'><span> Album 5 </span></a></td>
	</tr>-->
</tbody>
</thead>
</table>



<form id="createplaylistform" name="createplaylistform" method="post" action="./php/prova.php">
	<input id="createplaylistinput" name="createplaylistinputname" style="display:none; type="text">
	<input type="submit" id="createplaylistsubmit" style="position: absolute; left: -9999px; width: 1px; height: 1px;"/>
</form>


</body>
</html>
