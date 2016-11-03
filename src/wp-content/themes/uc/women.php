<?php
/**
 * Template Name: Inspiring Women
 */

get_header();
the_post();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<title>Inspiring Women</title>
<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

<?php wp_head(); ?>

<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<!-- JQUERY -->
<script src="//code.jquery.com/jquery-2.2.0.min.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

<!-- SITE STYLES/SCRIPTS -->
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/_uc/styles.css" />
<script src="<?php echo get_template_directory_uri(); ?>/_uc/script.js"></script>

</head>

<body id="top">










<header>
	<main>

	</main>
</header>

<section id="banner" class="white-text">
	<main>
		<img src="logo.svg" alt="wwin logo">
		<h1>25 Years of Inspiring Women</h1>
	</main>
</section>

<section id="greenStars" class="green-background">
	<main>
		<h2><span class="yellow">Always give back.</span><br>Never Give up.</h2>
		<p>There is a star in each of us. WWIN wants to let it shine. It was 25 years ago that Julia Love Prit started a movement that has positively impacted the lives of over 6,000 women across our state, not to mention their families and communities.</p>
		<p>For so many, stories of struggle have been replaced by stories of hope, gratitude, courage and dreams fulfilled. This year, we celebrate a quarter century of inspiring women.</p>
		<blockquote>
			If you educate a woman, you educate a family.
			<p>— lark, wwin donor</p>
		</blockquote>
	</main>
</section>

<section id="story" class="white-text">
	<main>
		<!-- // TODO: needs redesign -->
	</main>
</section>

<section id="storyQuote" class="green-text">
	<main>
		<blockquote>
			Deep down inside we know where we belong, and we know that we have worth, and you need to just keep listening to that voice, because there is a path for you.
			<p>— melissa, wwin grantee</p>
		</blockquote>
	</main>
</section>

<section id="collage">
	<main>

	</main>
</section>

<section id="event">
	<main>

	</main>
</section>

<section id="yellowStars">
	<main>

	</main>
</section>

<footer>
	<div>

	</div>
</footer>
































<?php
get_footer();
?>