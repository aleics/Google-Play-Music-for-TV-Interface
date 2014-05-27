<?php

	include 'functions.php';
	
	$auth = 'DQAAANQAAAAv4IIpGITx1e5K-cNlTe9_ow2-SvRLsHg4pt0G2Z6zbpDHH40QesGCYemRnNztPgqejR3da6V59VwbqqsVTUN9X1euI_4V1sUqZmWv8Oacv96mOKWU-fxZw4q0O-ia_w1FrO8xfNWkLoyBE7i_LGsSkNPlq-pprgdKEvpdRDmVDzvhE3FwjNzuKHUjoAGuIlk0Qp7gUeQxpNO5OpdPmu1je6YR-6FGoFfMaMLk0708rswfbYExC9hFvA0INX7-kBdTHmdW-qFjw7BsyINV1w-XeNtSVjmRzbprRWKChohZog';
	$ch = curl_init();
	$header = 'Authorization: GoogleLogin auth='.$auth;
	$android_id = 'X-Device-ID: android-3a46416a879600c1';

	curl_setopt($ch, CURLOPT_URL,"https://android.clients.google.com/music/mplay?songid=48dae700-23a3-31ab-adc6-7908ff88bcfa&pt=e&dt=pc&targetkbps=200&start=0");
        //curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        //curl_setopt($ch,CURLOPT_HTTP_VERSION,CURL_HTTP_VERSION_1_1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,array($header,$android_id));
	//curl_setopt($ch, CURLOPT_POST, 1);
	//curl_setopt($ch, CURLOPT_POSTFIELDS,"/songid=48dae700-23a3-31ab-adc6-7908ff88bcfa&pt=e&dt=pc&targetkbps=200&start=0");
	
	//curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$server_output = curl_exec ($ch);
	$headers = curl_getinfo($ch);
	
	curl_close ($ch);

	echo $server_output;
	/*echo $headers;
	foreach($headers as $name => $values){
		echo $name.": ".$values;
		echo "\n";	
	}*/

?>
