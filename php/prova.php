<?php
	$matrix = array();
	$matrix[0] = ("a","b","c");
        $matrix[1] = ("d","e","f");
	
	echo max(array_map('count', $matrix));

?>
