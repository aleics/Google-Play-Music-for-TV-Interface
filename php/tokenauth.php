<?php

	//Include functions library
        include 'functions.php';

	//1. First step: get the xt token
	$ids = array();
	$ids = ReadIDs();
	
	$sid = $ids[0]; 
	$lsid = $ids[1];

	$url_issueauthtoken = 'htpps://www.google.com/accounts/IssueAuthToken';
	
	$fields = array_to_url(array('SID' => $sid,'LSID' => $lsid, 'service' => 'gaia'));
	$command = 'curl --data "'.$fields.'" https://www.google.com/accounts/IssueAuthToken > ../Info/token.txt';

	$token_shellcommand = shell_exec($command);


	//2. Second step: get the xt token
	echo "\n";
	$token = ReadToken();

	$url_tokenauth












	function array_to_url($data){
            $fields = '';
            foreach ($data as $key => $value) {
                $fields .= $key . '=' . $value . '&';
            }
            rtrim($fields, '&');

            return $fields;
        }


?>
