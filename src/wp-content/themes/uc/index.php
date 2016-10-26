<?php
/**
 * Template Name: Home
 */

get_header();
?>
	<section class="mainContent"><main>
		<h1>Home 2</h1>
		<?php the_content(); ?>

	</main></section>

<div class="pi-rotator" data-options='{
	"inline": true,
	"blips" : true,
	"prevNext": true,
	"carousel": true
}'>
	<div class="item"><h1>foo</h1></div>
	<div class="item"><h1>bar</h1></div>
	<div class="item"><h1>gronk</h1></div>
</div>

<?php
get_footer(); 
?>