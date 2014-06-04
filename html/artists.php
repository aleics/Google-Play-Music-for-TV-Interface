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
			<?php include '/var/www/GooglePlayWebTv/php/displays.php'; DisplayPlaylistsSubmenu(DisplayPlaylists());?>

    </li>    
</ul>
</div>


<!-- Headers of every part of the menu -->
<header><a class="headerbox">My Library</a></header>


<!--MYLIBRARY-->

<table id="MyLibrarySongs">
<thead style="text-align:left; background-color: #bebebe;"><tr><th>Song</th> <th>Artist</th> <th>Album</th></tr></thead>
<tbody id="BodySongs">
	<?php
		$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		$songs_per_page = 14;
	
		if($_GET["play"] == null){
		$link = $actual_link.'&play=yes';
		}
		else{
                $link = $actual_link;
                }

                if ($_GET["id"] != null){
                $link = substr($actual_link,0,stripos($actual_link,'&id='));
                }
                else{
                $link = $actual_link;
                }




		//Display the variables depending of the value of "page" in the url			
		$num_page = $_GET['page'];
		echo "<p class='album_variables'>";
               	DisplayVariablesPerPages(GetTracksofArtist($_GET['artist']),$num_page,$songs_per_page,$link);
		echo "</p>";

		//The final page
                $max_pages = NumberOfPages(GetTracksofArtist($_GET['artist']));
		
	
		?>
</tbody>
</thead>


<!--Arrows next/previous page-->

<!--The num_page can't be higher than the number of pages-->
<?php
	$num_page_next = $num_page+1;
	if($num_page_next > NumberOfPages(GetTracksofArtist($_GET['artist']))){
		$num_page_next = $num_page;
		$last_page = $num_page;
	}

?>

<!--Right arrow-->
<?php
	echo '<a href="http://ec2-54-195-232-8.eu-west-1.compute.amazonaws.com/GooglePlayWebTv/html/artists.php?artist='.$_GET["artist"].'&page='.$num_page_next.'">';
?>


<input type="image" src="../Images/arrow-right.jpg" id="arrowbtnright" value="1" class="arrowbtn" name="arrowr" width="40" height="40" style="position: absolute; top: 740px; left: 1110px; opacity: 0.5;"></input></a>



<!--The num_page can't be lower than 0-->
<?php $num_page_prev = $num_page-1;

if($num_page_prev < 0){
	$num_page_prev = $num_page;
}

?>

<!--Left arrow-->
<?php 
	echo '<a href="http://ec2-54-195-232-8.eu-west-1.compute.amazonaws.com/GooglePlayWebTv/html/artists.php?artist='.$_GET["artist"].'&page='.$num_page_prev.'">';


?>
<input type="image" src="../Images/arrow-left.jpg" id="arrowbtnleft" value="-1" class="arrowbtn" name="arrowl" width="40" height="40" style="position: absolute; top: 740px; left: 220px; opacity: 0.5;">
</input>
</a>



<!--Script to show or hide the arrows on the limits page (0 and final page)-->
<script language="javascript" type="text/javascript">
    var max_pages = "<?php echo $max_pages ?>";
    var last_page = "<?php echo $last_page ?>";
    var num_page = "<?php echo $num_page?>";


    if(max_pages == last_page){
	$("#arrowbtnleft").show();
	$("#arrowbtnright").hide();
	}
    else if(num_page == "0"){
	$("#arrowbtnleft").hide();
        $("#arrowbtnright").show();
	}
</script>

<footer id="footerplaybuttons" style="">

<audio controls id="audio">
  <source src="../Contents/Audio/song.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>


</footer>

</body>
</html>
