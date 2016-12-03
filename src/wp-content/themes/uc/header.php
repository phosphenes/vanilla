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

	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="telephone=no">
	<meta name="google-site-verification" content="QiRO_4QS9RtZHo4ACKt9k-CRODDGZSzBO0LXItsNfyk" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<?php wp_head(); ?>


	<script src="https://use.fontawesome.com/3b399369f9.js"></script>
	<link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/1b31b2f6-825c-4585-a690-b6dfaa9c845e.css"/>
	<script href="//code.jquery.com/jquery-3.1.1.min.js"></script>
	<script href="//code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/styles.css" />
	<script href="<?php echo get_template_directory_uri(); ?>/script.js"></script>


	<!-- Google Analytics -->
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-85092950-1', 'auto');
		ga('send', 'pageview');

	</script>


	<!-- Google Code for Xinova Contact Form Conversion Page
	In your html page, add the snippet and call
	goog_report_conversion when someone clicks on the
	chosen link or button. -->
	<script type="text/javascript">
		/* <![CDATA[ */
		goog_snippet_vars = function() {
			var w = window;
			w.google_conversion_id = 934803336;
			w.google_conversion_label = "7dFXCIz7tWoQiO_fvQM";
			w.google_remarketing_only = false;
		}
		// DO NOT CHANGE THE CODE BELOW.
		goog_report_conversion = function(url) {
			goog_snippet_vars();
			window.google_conversion_format = "3";
			var opt = new Object();
			opt.onload_callback = function() {
				if (typeof(url) != 'undefined') {
					window.location = url;
				}
			}
			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		}
		/* ]]> */
	</script>
	<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion_async.js"></script>

</head>
<?php
$extraClasses = array();
if(!$isHome) array_push($extraClasses, 'inside-page');
if($isBlog) array_push($extraClasses, 'blog-page');
if(get_field('hero_image')) array_push($extraClasses, 'has-banner');
$extraClasses = implode(' ', $extraClasses);
?>

<body <?php body_class($extraClasses); ?> id="top">
<menu id="menu">

	<main>
		<div class="row">
			<div class="column sitemap animate fromLeft">
				<h4 style="margin-bottom: 5px">Sitemap</h4>
				<?php wp_nav_menu(array('menu' => 'Main Menu')); ?>
			</div>
			<div class="column rfi">
				<h4 class="animate fromRight" style="margin-bottom: 5px">Recent RFIs</h4>
				<p class="animate fromRight" style="font-size: 18px">Seeking inventors to help innovate for:</p>
				<ul class="animate fromRight">
					<li><a href="/inventors/invention-opportunity-non-thermal-pasteurization/">Non-Thermal Pasteurization</a>
						New cold-pressed technologies are needed to increase throughput and shelf life while decreasing costs.
					</li>
					<li><a href="/inventors/market-predictability/">Detecting Emotion to Predict Success</a>
						Develop a technology that recognizes the true emotions of consumer product test groups.
					</li>
					<li><a href="/inventors/animal-tracking/">Animal ID, Tracking, and Monitoring</a>
						Seeking a robust, tamper-proof animal identification, tracking and monitoring system to improve the livestock value chain.
					</li>
					<li><a href="/inventors/" class="button" style="display: inline-block; padding: 5px 10px;">View all opportunities</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="theLogo animate fromBottom" style="text-align: center" class="animate fromBottom"><img src="/wp-content/themes/uc/images/footerLogo.png"></div>
	</main>
</menu>

<header>

	<div class="colorBox"><main>
			<div class="logo"></div>
			<div class="hamburger"><div></div></div>
		</main></div>

	<div class="colorBox light wiper"><main>
			<div class="logo"></div>
			<div class="hamburger"><div></div></div>
		</main></div>

	<main>
		<a id="logo" href="/"></a>
		<a id="menuButton"></a>
	</main>

</header>

<div class="pi-drawer dark" id="myFirstPiDrawer">
	<iframe id="videoFrame" src="https://player.vimeo.com/video/184605013" width="960" height="540" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	<!-- <iframe src="https://player.vimeo.com/video/148982525" width="960" height="540" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
</div>








