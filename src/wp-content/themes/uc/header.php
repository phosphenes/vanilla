<?php





global $post;

if(get_the_slug($post->ID) !== 'inspiringwomen') {






$isBlog = (!is_page()) ? true: false;
$isHome = ($post->post_name == 'home') ? true: false;

if(!$isBlog) {
	the_post();
	global $post;
}

$navExclusions = (get_field('nav_exclusions','options')) ? implode(',',get_field('nav_exclusions','options')): '';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<title><?php (is_home()) ? bloginfo('description') : wp_title(' :: ', true, 'right'); bloginfo('name'); ?></title>
<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

<?php wp_head(); ?>

<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<!-- JQUERY -->
<script src="//code.jquery.com/jquery-2.2.0.min.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

<!-- SITE STYLES/SCRIPTS -->
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/styles.css" />
<script src="<?php echo get_template_directory_uri(); ?>/script.js"></script>

</head>

<?php
$extraClasses = array();
if(!$isHome) array_push($extraClasses, 'inside-page');
if($isBlog) array_push($extraClasses, 'blog-page');
if(get_field('hero_image')) array_push($extraClasses, 'has-banner');
$extraClasses = implode(' ', $extraClasses);
?>

<body <?php body_class($extraClasses); ?> id="top">




	<header>

		<main>

			<nav id="menu"><main>
				<ul class="menu">
					<?php wp_list_pages('sort_column=menu_order&title_li=&depth=2&exclude='.$navExclusions); ?>
				</ul>
			</main></nav>

			<a id="logo" href="/">
				LOGO
			</a>

			<a href="javascript:;" id="menuButton" class="menuButton" title="Open/Close Menu">
				<div class="hamburger"><span></span></div>
			</a>
		</main>
	</header>



<?php } ?>