<?php
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

<!-- FONT AWESOME -->
<script src="https://use.fontawesome.com/70655ce7bc.js"></script>

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
			<nav id="menu" class="pi-unimenu">
				<main>

					<div class="actionButtons">
						<a class="fa fa-calendar" href="/">Request an appointment</a>
						<a class="fa fa-phone" href="/">Call us: 360.754.5363</a>
					</div>

					<ul id="topNav">
						<?php wp_list_pages('sort_column=menu_order&title_li=&depth=2&exclude='.$navExclusions); ?>
					</ul>
				</main>
			</nav>


			<a id="logo" href="/">
				<img src="/wp-content/themes/uc/images/logo.svg">
			</a>
		</main>
	</header>


	<?php if(!$isHome) { ?>
	<section id="hero">
		<main>
			<h1><?php the_title(); ?></h1>
		</main>
	</section>

	<?php } ?>


