<?php
	define("__PLATFORM", "DEV");
	class db {
		var $con;
		function __CONSTRUCT()
		{
			if (__PLATFORM == "PRODUCTION")
			{
				$DBHOST = "localhost";
				$USER = "dolpan";
				$PW = "dolpan";
				$DB = "dolpan";
			}
			else
			{
				$DBHOST = "localhost";
				$USER = "dolpan";
				$PW = "dolpan";
				$DB = "dolpan";
			}

			$dsn =  "mysql:host=".$DBHOST.";dbname=".$DB;
			$this->con = new PDO($dsn,$USER, $PW);

			$sql = "set names 'utf8'";
			$this->con->exec($sql);
		}

		public function get_sample($id)
		{
			$arr = array();
			$sql = "select * from sample_tab where idx=:idx";

			$stmt = $this->con->prepare($sql);
			$stmt->execute(array(":idx"=>$id));


			return  $stmt->fetch(PDO::FETCH_ASSOC);

		}

		public function set_sample($idx, $contents)
		{
			$sql = "update sample_tab set contents=:contents where idx=:idx";
			$stmt = $this->con->prepare($sql);
			
			$r = $stmt->execute(array(":contents"=>$contents, ":idx"=>$idx));

			if(!$r)
			{
				$arr = $stmt->errorInfo();
				print_r($arr);
				exit;
			}

		}

		
	}
?>