<?php
	$value = 1;
	$page = array();
        array_push($page,$value);

	echo array_reduce($page,"rsum");


	function rsum($v, $w)
        {
                $v += $w;
                return $v;
        }



?>

