<?php

$fname = $_POST['fname'];
echo $fname;
switch ('logout') {
        case 'logout':
            logout();
        break;
    }




function logout(){

        unlink('/var/www/GooglePlayWebTv/Info/TrackList.txt');
	unlink('/var/www/GooglePlayWebTv/Info/Auth.txt');
	unlink('/var/www/GooglePlayWebTv/Info/PlaylistList.txt');
        header("Location: ../index.php");

}
?>
