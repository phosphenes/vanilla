<?php
require $_SERVER['DOCUMENT_ROOT'].'/wp-load.php';

//KEEP NON-AJAX REQUESTS OUT!!!
//if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest' || !isset($_REQUEST['pType'])) { header('Location: /'); exit(); }

//PREPARE THE INCOMING VARIABLES
foreach($_REQUEST as $k => $v) $$k = mysql_real_escape_string(trim($v));
unset($_REQUEST['pType']);
unset($_POST['pType']);

?>
