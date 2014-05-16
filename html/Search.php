<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- Title tag just for valid html5, can not be seen -->
        <title>Google Play TV Box</title>
        <style> .removed{display:none!important;} .invisible{visibility:hidden!important;width:0px!important;height:0px!important;overflow:hidden!important;}</style>
        <link rel="stylesheet" href="../Contents/default.css">
		<script src="../Lib/jquery-2.0.3.js"></script>
 		<script type="text/javascript" src="../Lib/menu_jquery.js"></script>
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
			<li><a href='main.php' id="ListenNow"><span>Listen Now</span></a></li>
			<li><a href='MyLibrary.php?page=0' id="MyLibrary"><span>My Library</span></a></li>
			<li><a href='Explore.php' id="Explore"><span>Explore</span></a></li>
			<li><a href='Playlists.php?page=0' id="Playlists"><span>Playlists</span></a>
        
			 <?php include '/var/www/GooglePlayWebTv/php/displays.php'; DisplayPlaylistsSubmenu(DisplayPlaylists());?>

    </li>    
</ul>
</div>

	<header><a class="headerbox">Search</a></header>

<table id="MyLibrarySongs">
<thead style="text-align:left; background-color: #bebebe;"><tr><th>Song</th> <th>Artist</th> <th>Album</th></tr></thead>
<tbody id="BodySongs">
        	<?php
                $songs_per_page = 14;		
		$num_page = $_GET['page'];


                //Display the variables depending of the value of "search" and "page" in the url
                if(isset($_GET['search'])){		
		
		$search_song = $_GET['search'];
		$songs = SearchSong($search_song,DisplayTracks());				
                DisplayVariablesPerPages($songs,$num_page,$songs_per_page);

                }

                //The final page
                $max_pages = NumberOfPages($songs);


        ?>
</tbody>;
</thead>;
</table>;



<!--Arrows next/previous page-->

<!--The num_page can't be higher than the number of pages-->
<?php 

$num_page_next = $num_page+1;

if($num_page_next > NumberOfPages($songs)){

	$num_page_next = $num_page;
	$last_page = $num_page;
}

?>

<!--Right arrow-->
<?php echo '<a href="http://ec2-54-195-232-8.eu-west-1.compute.amazonaws.com/GooglePlayWebTv/html/Search.php?search='.$search_song.'&submit_explore=Go&page='.$num_page_next.'">';?>
<input type="image" src="../Images/arrow-right.jpg" id="arrowbtnright" value="1" class="arrowbtn" name="arrowr" width="40" height="40" style="position: absolute; top: 740px; left: 1110px; opacity: 0.5;"></input></a>

<!--The num_page can't be lower than 0-->
<?php $num_page_prev = $num_page-1;
	if($num_page_prev < 0){
		$num_page_prev = $num_page;
	}

?>

<!--Left arrow-->
<?php echo '<a href="http://ec2-54-195-232-8.eu-west-1.compute.amazonaws.com/GooglePlayWebTv/html/Search.php?search='.$search_song.'&submit_explore=Go&page='.$num_page_prev.'">';?>
<input type="image" src="../Images/arrow-left.jpg" id="arrowbtnleft" value="-1" class="arrowbtn" name="arrowl" width="40" height="40" style="position: absolute; top: 740px; left: 220px; opacity: 0.5;">
</input>
</a>

<!--Script to show or hide the arrows on the limits page (0 and final page)-->
<!--If the page is lower than 0 -> don't show arrows -->
<script language="javascript" type="text/javascript">
    var max_pages = "<?php echo $max_pages ?>";
    var last_page = "<?php echo $last_page ?>";
    var num_page = "<?php echo $num_page?>";


    if(max_pages>0){
    	if(max_pages == last_page){
		$("#arrowbtnleft").show();
		$("#arrowbtnright").hide();
		}
   	else if(num_page == "0"){
		$("#arrowbtnleft").hide();
        	$("#arrowbtnright").show();
		}
     }
     else{
	$("#arrowbtnright").hide();
	$("#arrowbtnleft").hide();

     }

</script>

</body>
</html>
