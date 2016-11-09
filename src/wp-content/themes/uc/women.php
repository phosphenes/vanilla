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
<script src="https://player.vimeo.com/api/player.js"></script>

<!-- SITE STYLES/SCRIPTS -->
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/_uc/styles.css" />
<script src="<?php echo get_template_directory_uri(); ?>/_uc/script.js"></script>

</head>

<body id="top">




<header class="pi-sticky-header">
	<main>
		<a href="http://wwin.org/">&lt; wwin.org</a>
		<div class="social">
			<a href="https://www.facebook.com/wwin.org" class="social" target="_blank"><img src="/wp-content/themes/uc/_uc/images/facebook-white.png"></a>
			<a href="https://twitter.com/WaWomenInNeed" class="social" target="_blank"><img src="/wp-content/themes/uc/_uc/images/twitter-white.png"></a>
			<a href="https://www.instagram.com/wawomeninneed/" class="social" target="_blank"><img src="/wp-content/themes/uc/_uc/images/instagram-white.png"></a>
		</div>
		<a href="https://www.sagepayments.net/sagenonprofit/shopping_cart/forms/donate.asp?M_id=669091193768" target="_blank" class="button yellow-background">donate now</a>
	</main>
</header>

<section id="banner" class="white-text">
	<video id="homeVideo" src="/wp-content/themes/uc/_uc/images/girl-at-sunset.mp4" poster="/wp-content/themes/uc/_uc/images/girl-at-sunset.jpg" autoplay loop></video>
	<main>
		<img src="/wp-content/themes/uc/_uc/images/logo.svg" id="wwinLogo" alt="wwin logo">
		<h1>25 Years <i>of</i> Inspiring Women</h1>
	</main>
	<div class="weird-line white-background"></div>
</section>

<section id="greenStars" class="green-background white-text">
	<div class="starField"></div>
	<main>
		<div class="narrow">
			<h2><span class="yellow-text">Always give back.</span><br>Never give up.</h2>
			<p>There is a star in each of us. WWIN wants to let it shine. It was 25 years ago that Julia Love Pritt started a movement that has positively impacted the lives of over 6,000 women across our state, not to mention their families and communities.</p>
			<p>For so many, stories of struggle have been replaced by stories of hope, gratitude, courage and dreams fulfilled. This year, we celebrate a quarter century of inspiring women.</p>
		</div>
		<div id="quoteRotator" class="pi-rotator" data-options='{
			"inline": true,
			"carousel": true,
			"prevNext": true,
			"autoPlay": 6000
		}'>
			<blockquote class="item">
				<div class="quote">
					If you educate a woman, you educate a family.
					<p>— lark, wwin donor</p>
				</div>
			</blockquote>
			<blockquote class="item">
				<div class="quote">
				Thanks in great part to my WWIN grant I was able to break free from my violent marriage. A supportive community has replaced extreme isolation and…my life is bright and full of love.
				<p>— Misty, Health Care Grant Recipient</p>
				</div>
			</blockquote>
			<blockquote class="item">
				<div class="quote">
				This grant was a massive dose of hope and enhanced everything I was doing to create a fantastic life for my daughter and me. Support in dark times made all the difference.
				<p>— Angela, Education Grant Recipient</p>
				</div>
			</blockquote>
			<blockquote class="item">
				<div class="quote">
				I’m not sure I would have been able to finish school without WWIN…I’m very happy with my career and the ability to provide for my family.
				<p>— Christy, Education Grant Recipient</p>
				</div>
			</blockquote>
			<blockquote class="item">
				<div class="quote">
				Many doors have opened for me as a result of renewed confidence and I will never forget WWIN for their help. The dignity they restore to women with nowhere else to turn is a gift beyond measure.
				<p>— Aladia, Health Care Grant Recipient</p>
				</div>
			</blockquote>
			<blockquote class="item">
				<div class="quote">
				The grant award validated that I was on the right path, that my vision, what I feel, is true.
				<p>— Adriana, Education Grant Recipient</p>
				</div>
			</blockquote>
	</main>
	<div class="weird-line yellow-background"></div>
</section>

<section id="storyText">
	<main>
		<div class="narrow">
			<h4>We have always believed that a woman has the wisdom and freedom to make her own choices and design her own future. Given the opportunity, every woman can inspire positive change for herself, her family, and her community.</h4>
<!--			<p>WWIN’s mission is to change lives, not people. It doesn’t matter where a grant applicant comes from. We want to help her get where she’s going. It’s not about what she did before, but what she’s going to do to improve her life and the lives of others.</p>-->
			<p>Melissa, like so many that have become part of the WWIN family over the past quarter century, was a single mother who realized she had to face her past and take control of her future if her life was going to change for the better. Watch her inspiring story and see how, with a little help, her hope and courage transformed her future.</p>
		</div>
	</main>
</section>

<section id="story" class="white-text">
	<main>
		<h3>Star Story: Melissa</h3>
		<h1>Building a Path In Life</h1>
		<button id="launchVideoButton" data-vimeo-trigger="storyVid" data-video-id="63352852"></button>
	</main>
</section>

<section id="storyQuote" class="green-text">
	<main>

		<blockquote>
			<div class="quote">
			Deep down inside we know where we belong, and we know that we have worth, and you need to just keep listening to that voice, because there is a path for you.
			<p>— melissa, wwin grantee</p>
			</div>
		</blockquote>
	</main>
</section>

<section id="collage"><main></main></section>

<section id="event">
	<main>
		<div class="columns col-2 sizes-66-33">
			<div class="verticalCenter">
				 <h5>events & involvement</h5>
				 <h2>Save the Date: March 21, 2017</h2>
				 <p>This year, our annual Women of Courage Luncheon is going to be a special 25th Anniversary celebration. It's an inspiring opportunity for WWIN's long-time supporters, first-time donors and grant recipients to get together and experience the transformative impact of this unique organization.</p>
				 <a class="calendarLink" href="http://wwin.org/luncheons/">Register for the <b>Women of Courage Luncheon</b></a>
			 </div>
			<div class="verticalCenter">
				<img class="alignmiddle" src="/wp-content/themes/uc/_uc/images/event.jpg" alt="Save the date">
			</div>
		</div>
	</main>
</section>

<section id="yellowStars" class="yellow-background green-text">
	<div class="starField"></div>
	<main>
		<h5>make a difference</h5>
		<h2>Be part of a life-changing experience</h2>
		<a href="http://wwin.org/donate/" class="button green-background yellow-text">please support wwin</a>
		<div class="social">
			<a href="https://www.facebook.com/wwin.org" class="social" target="_blank"><img src="/wp-content/themes/uc/_uc/images/facebook.png"></a>
			<a href="https://twitter.com/WaWomenInNeed" class="social" target="_blank"><img src="/wp-content/themes/uc/_uc/images/twitter.png"></a>
			<a href="https://www.instagram.com/wawomeninneed/" class="social" target="_blank"><img src="/wp-content/themes/uc/_uc/images/instagram.png"></a>
		</div>
	</main>
</section>

<footer class="green-background white-text">
	<main>
		<h3>Thank you for supporting Washington Women in Need</h3>
		© 2016 Washington Women in Need. All rights reserved.
	</main>
</footer>

<div class="pi-vimeo-player" id="storyVid"><div id="player" class="drawer-wrapper"></div></div>


<a href="#top" id="backToTop"></a>

<?php
get_footer();
?>

