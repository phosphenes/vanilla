<?php
/**
 * Template Name: Home
 */

get_header();
?>
	<section id="hero">
		<img src="/wp-content/themes/uc/images/hero.jpg" id="heroImage">
		<div class="pi-rotator" id="heroRotator"
			data-options='{
		        "inline": true,
		        "blips": true,
		        "carousel": true,
		        "crossfade": true,
		        "autoPlay": 6000
		    }'>
			<div class="item"><main><h1>foo</h1></main></div>
			<div class="item"><main><h1>bar</h1></main></div>
			<div class="item"><main><h1>gronk</h1></main></div>
		</div>
	</section>

	<section class="mainContent"><main>
		<?php the_content(); ?>
	</main></section>

<?php
get_footer(); 
?>