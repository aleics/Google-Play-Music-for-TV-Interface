<!DOCTYPE HTML>
<?php include '/var/www/GooglePlayWebTv/php/displays.php';
	$isauth = isAuth();
	if(!isAuth()){ header('Location: index.php'); }
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- Title tag just for valid html5, can not be seen -->
        <title>Google Play TV Box</title>
        <style> .removed{display:none!important;} .invisible{visibility:hidden!important;width:0px!important;height:0px!important;overflow:hidden!important;}</style>
	<style type="text/css">
	
	.settingsvariables{
		width: 111%;
		overflow:auto;
		font-size: 80%;
	}

	</style>
        <link rel="stylesheet" href="../Contents/default.css">
		<script src="../Lib/jquery-2.0.3.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
 		<script type="text/javascript" src="../Scripts/menu_jquery.js"></script>
		<script type="text/javascript" src="../Scripts/keycodes.js"></script>
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
        		 <?php DisplayPlaylistsSubmenu( DisplayPlaylists());?>
    </li>    
</ul>
</div>


<!-- Headers of every part of the menu -->
<header><a class="headerbox">Settings</a></header>

<ul id="BodySettings">

<li>Account information</li>
	<ul>
			<li>Email: <?php echo ReadUserInfo();?></li>
	</ul>

<li>Authentification</li>
	<ul>
		<li>Auth: </li>
		<?php echo "<div class='settingsvariables'><p>".ReadAuth()."</p></div>";?>
		<li>SID: </li>
		<?php $ID = ReadIDs(); echo "<div class='settingsvariables'><p>".$ID[0]."</p></div>";?>
		<li>SSID: </li>
		<?php echo "<div class='settingsvariables'><p>".$ID[1]."</p></div>";?>
	</ul>

<li>Android Device</li>
	<ul>
		<li><?php $android_id = ReadAndroidId();echo "<li id='androididdisplay' class='settingsvariables' style='display:hidden;'>Android ID: ".$android_id."</li>";?>
		<li>
		
		<form action="../php/android_id.php" method="post">
		<input id="androididinput"  name="android_id" required="required" placeholder="Android ID" style="left: 160px; top: 496px; background-color: white; color: #fb8721; font-family: 'Lato', sans-serif; font-size: 16px; float: left;">
        	<button type="submit" id="androididbutton" style="left: 330px; top: 494px; float: left; ">Submit</button>
		</form>
		
		<form action="../php/android_id.php" method="post">
		<input id="androididinput"  name="android_id" class="reintroduce_android"required="required" placeholder="It's another Android ID?" style="display:hidden;left: 160px; top: 496px; background-color: white; color: #fb8721; font-family: 'Lato', sans-serif; font-size: 16px; float: left;">
                <button type="submit" id="androididbutton" class="reintroduce_android" style="display:hidden; left: 330px; top: 494px; float: left; ">Submit</button>
		</form> 
	</ul>


</ul>	

<?php
	if(file_exists('/var/www/GooglePlayWebTv/Info/android.txt')){$android_done = "yes";}
	else{$android_done = "no";}
	echo $android_done;
?>

<script language="javascript" type="text/javascript">
    var android_done = "<?php echo $android_done ?>";

    if(android_done == "yes"){
	 $("#androididinput").hide();
         $("#androididbutton").hide();
	 $("#androididdisplay").show();
	 $(".reintroduce_android").show();
    }

    else if(android_don == "no"){
	 $("#androididinput").show();
         $("#androididbutton").show();
         $("#androididdisplay").hide();
	  $(".reintroduce_android").hide();
    }

</script>
	
</body>
</html>
