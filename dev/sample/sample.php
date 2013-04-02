<?php
	include "./lib/db.config.php";
	include "./lib/rain.tpl.class.php";

	// configure
	raintpl::configure("base_url", null );
	raintpl::configure("tpl_dir", "templates/" );
	raintpl::configure("cache_dir", "tmp/" );
	raintpl::configure( 'path_replace', false );

	$var = array();

	//initialize a Rain TPL object
	$tpl = new RainTPL;
	//$tpl->assign( $var );
	//echo $tpl->draw( "index" );

	$idx = @$_GET["id"];

	if(empty($idx))
		exit;


	$d = new db();

	$data = $d->get_sample($idx);

	if(empty($data))
		exit;

	$tpl->assign($data);

	echo ($tpl->draw("sample"));
?>