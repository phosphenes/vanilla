<?php
require $_SERVER['DOCUMENT_ROOT'].'/wp-load.php';

//KEEP NON-AJAX REQUESTS OUT!!!
//if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest' || !isset($_REQUEST['pType'])) { header('Location: /'); exit(); }

//PREPARE THE INCOMING VARIABLES
foreach($_REQUEST as $k => $v) $$k = trim($v);
unset($_REQUEST['pType']);
unset($_POST['pType']);



if($pType == 'registration') {


	$to = 'scott@unitedcreations.com';
	$from = 'From: DRW <webmaster@unitedcreations.com>';
	$subj = 'New Registration Submission from DRW';

	$msg = '';

//	$msg = <<<EOF
//		<h1>Contact Submission</h1>
//		<b>Name:</b> {$name}<br />
//		<b>Email:</b> {$email}<br />
//		<b>Phone:</b> {$phone}<br />
//		<b>Company:</b> {$company}<br />
//		<b>Purpose:</b> {$purposeOfContact}<br />
//EOF;

	foreach($_POST as $k => $v) {
		$k = ucwords(str_replace("_", " ", $k));

		if ($k != "Submit") {
			if (strrpos($k, "MARKER") !== false) {
				$msg .= "<br />_____________________________________________________<h2>" . trim(substr($k, 7)) . "</h2>";
			} else {
				$v = strlen(trim($v)) ? trim($v) : '<i>No answer</i>';
				$msg .= "<b>" . $k . ":</b> " . $v . "<br />";
			}
		}
	}

	$headers = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= $from . "\r\n";

	$good = "<script>location = 'http://www.apple.com'</script>";

	echo (mail($to, $subj, $msg, $headers)) ? $good : 'bad';
}

?>
