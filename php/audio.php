<?php

	include 'functions.php';
	
	$auth='DQAAANAAAACxWpx3L6uveQtN76-S3GahmJIERQEKX9juxgQCJUZCtLIoPPF8CcGZCbx0wypLDT080j-xQr7pF10aXT3ZP_tyF8iqLYmlc3hS7jIUCdCIe0Ei9hDcoSr6ITub-lZkLiKzhqxkvGBs5sSBqZc4U6Y7UUkqhDJzJ8FZNsx8EO5yOoz2v957Leu8eIGA29wFPxlRCYxhoddQdM4DMe-JVIjAxAwp5lFQkHCQfph4pF8rHrbSGFu2RbWlzW5kfkdRKJdO9RgVteh8nY8PNAje2v_q';	
	$ch = curl_init();
	$header = 'Authorization: GoogleLogin auth='.$auth;

	curl_setopt($ch, CURLOPT_URL,"https://android.clients.google.com/music/mplay");
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,array($header));
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,"songid=48dae700-23a3-31ab-adc6-7908ff88bcfa&pt=e&dt=pc&targetkbps=200&start=0");
	
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$server_output = curl_exec ($ch);
	
	curl_close ($ch);

	echo $server_output

?>
