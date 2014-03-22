<?php
	//functions needed
	
	//Get the Auth Variables (SID,LSID,AUTH)
	function GetAuthentificationVariables($body){

		$sid_pos = strpos($body,'SID');
		$lsid_pos = strpos($body,'LSID');
		$auth_pos = strpos($body,'Auth');
		
		$sid = mb_strcut($body,$sid_pos,$lsid_pos-$sid_pos);
		$lsid = mb_strcut($body,$lsid_pos,$auth_pos-$lsid_pos);
		$auth = mb_strcut($body,$auth_pos);
		
		return array($sid,$lsid,$auth);
	}


	//Save Auth variable in one file called 'Auth.txt'
	function SaveAuth($auth_var){
	
		$myFile = '/var/www/GooglePlayWebTv/Info/Auth.txt';
		$fh = fopen($myFile,'w') or die("can't open file");
		fwrite($fh,$auth_var[2]);
		fclose($fh);
	}


	//Read Auth variable from a file called 'Auth.txt'
	function ReadAuth(){
	
	$myFile = fopen('/var/www/GooglePlayWebTv/Info/Auth.txt',"rb");
	$input = fread($myFile,filesize('/var/www/GooglePlayWebTv/Info/Auth.txt'));
	fclose($myFile);

	$auth = substr($input,strlen("Auth="));
	
	return $auth;
	
	}
	

	//Save the whole Track list in a file called 'TrackList.txt'
	function SaveTrackList($output){
	
	$myFile = fopen("/var/www/GooglePlayWebTv/Info/TrackList.txt","w") or die("can't open the file");
	fwrite($myFile,$output);
	fclose($myFile);

	}
	
	//Save the whole Playlist list in a file called 'PlaylistList.txt'
	function SavePlaylistList($output){
	
	$myFile = fopen("/var/www/GooglePlayWebTv/Info/PlaylistList.txt","w") or die("can't open the file");
        fwrite($myFile,$output);
        fclose($myFile);
	
	}

	//Function of getting the name of song, album, id, etc...
	function GetVariableList($FileName,$str){
	
	$myFile = fopen($FileName,"rb");
	$input = fread($myFile,filesize($FileName));
	
	$lines = file($FileName);
	$output = array();
	foreach($lines as $lineNumber => $line){
		if(strpos($line,$str) !== false){ //in every line that we found $str copy to array output
			$output[] = $line;
		}
	}
	
	fclose($myFile);
	
	$out = DeleteValueDescription($output,$str);

	return $out;
	}

	//Function to delete name of the variable, and get only the value of the line
	function DeleteValueDescription($input,$str){
	
	$middle = array();
	$output = array();
	$out = array();	
	for($x=0;$x<count($input);$x++){
			$middle[] = str_replace($str,'',$input[$x]); //delete "variable": "
			$output[] = str_replace('",','',$middle[$x]); //delete last ",
			$out[] = substr($output[$x],4,-1); //delete the spaces at the beginning and the end
		}
	return $out;
	}


	//Get the Matrix that we will display on MyLibrary page
	function GetMatrixMyLibrary($titles,$artists,$albums){
	$matrix_output = array();
		if((sizeof($titles) == sizeof($artists)) == sizeof($albums)){
			for($y=0;$y<sizeof($titles);$y++){
				$matrix_output[$y] = array($titles[$y],$artists[$y],$albums[$y]);
			}
		}
	return $matrix_output;
	}

	//Get all tracks list from google	
	function get_all_tracks($auth){
	
	$ch = curl_init('https://www.googleapis.com/sj/v1beta1/tracks');
	$header = 'Authorization: GoogleLogin auth='.$auth;

	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_1);
	curl_setopt($ch,CURLOPT_HTTPHEADER,array($header));

	$output = curl_exec($ch);
	$status = curl_getinfo($ch);

	curl_close($ch);

	return $output;
	}
	
	//Get all playlists list from google
	function get_all_playlists($auth){
	
	$ch = curl_init('https://www.googleapis.com/sj/v1beta1/playlists');
	$header = 'Authorization: GoogleLogin auth='.$auth;
	
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,array($header));

        $output = curl_exec($ch);
        $status = curl_getinfo($ch);

        curl_close($ch);

        return $output;
        }


	 //Display variables per page
        function DisplayVariablesPerPages($matrix,$num_page){

        $variables_for_page = 14; //number of variables for every page

        $start = 0+($variables_for_page*$num_page);
        $end = 13+($variables_for_page*$num_page);

        if($end>=sizeof($matrix)){
                $end = sizeof($matrix);
        }

	if(is_array($matrix[0])) {

        for($y=$start;$y<$end;$y++){
                echo "<tr>";
                for($x=0;$x<sizeof($matrix[0]);$x++){
                        echo "<td> <a href='#'><span>".$matrix[$y][$x]."</td>";
                }
                echo "</tr>";
        }
	}
	
	else if(!is_array($matrix[0])){	
	
	for($y=$start;$y<$end;$y++){
                echo "<tr>";
		echo "<td> <a href='#'><span>".$matrix[$y]."</td>"; 
		echo "</tr>";	

        }
	}
	}


        function ArrowPages($numPage){
                if(isset($_POST['arrow_right'])){
                        $numPage++;
                }
                else if(isset($_POST['arrow_left'])){
                        $numPage--;
                }
        return $numPage;
        }




?>
