<?php
	include "./lib/rain.tpl.class.php";

	// configure
	raintpl::configure("base_url", null );
	raintpl::configure("tpl_dir", "templates/" );
	raintpl::configure("cache_dir", "tmp/" );
	raintpl::configure( 'path_replace', false );

	$var = array();

	//initialize a Rain TPL object
	$tpl = new RainTPL;
	$tpl->assign("idx", 0);
	//echo $tpl->draw( "index" );

	echo ($tpl->draw("index"));
?>