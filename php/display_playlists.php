<?php
	//Include the functions library
        include 'functions.php';

        //Name of the file where is the playlist list information
        $fileName = "/var/www/GooglePlayWebTv/Info/PlaylistList.txt";

        //Declaration of arrays
        $name = array();
        
        //Name description
        $str_name = '"name": "';


        //Get the variables form the playlist list
        $name = GetVariableList($fileName,$str_name);

?>
