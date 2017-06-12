<?php
/**
 * Template Name: Home
 */

get_header();

global $post;





// FLEX CONTENT
include 'flex-fields.php';

// EXTRA FOOTER CONTENT
$isFooter = true;
include 'flex-fields.php';


get_footer();
?>