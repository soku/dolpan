<?php
	include "./lib/db.config.php";

	if (isset($_POST["contents"]))
	{
		$d = new db();

		$d->set_sample(3, $_POST["contents"]);
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<style>
			textarea {width:100%; height:500px; display: block;}
		</style>
	</head>
	<body>
		<form name="frm" method="post">
			<textarea name="contents"></textarea>
			<input type="submit" value="SUBMIT">

		</form>
	</body>
</html>