<!DOCTYPE HTML>
<?php include '/var/www/GooglePlayWebTv/php/functions.php';
        $isauth = isAuth();
        if(isAuth()){ header('Location: ./html/main.php'); }
?>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!-- Title tag just for valid html5, can not be seen -->
        <title>Google Play TV Box</title>
        <style> .removed{display:none!important;} .invisible{visibility:hidden!important;width:0px!important;height:0px!important;overflow:hidden!important;}</style>
        <link rel="stylesheet" href="./Contents/default.css">
		<script src="./Lib/jquery-2.0.3.js"></script>
	</head>
	
	<body style="background-color: #fb8721;padding: 200px 0px 0px 450px;">
	
	
	<form action="./php/client_login.php" method="post">
	<img src="./Images/google_toolbar.jpg" id="toolbarlogo">
	<input id="user" type="text" name="user_name" required="required" placeholder="name" style="left: 450px; top: 325px; position: absolute; text-align: left; color: #fb8721; background-color: white; font-family: 'Lato', sans-serif; font-size: 16px; float: left;"><br/>
	<input id="password" type="password" name="password_name" required="required" placeholder="password" style="left: 650px; top: 325px; position: absolute; background-color: white; color: #fb8721; font-family: 'Lato', sans-serif; font-size: 16px; float: left;">
	<input id="androididinput"  name="android_id" placeholder="(optional) Android ID" style="left: 850px; top: 325px; position: absolute; background-color: white; color: #fb8721; font-family: 'Lato', sans-serif; font-size: 16px; float: left;">
	<button type="submit" id="indexbutton" style="position: absolute; left: 1070px; top: 323px; float: left; " href="./main.html">Enter</button>
	</form>
	
	<a id="needhelp" href="https://www.google.de/accounts/recovery/">Need help?</a>
	
	</body>
</html>
