<?php
/**
 * Template Name: Home
 */

get_header();
?>
	<section class="mainContent"><main>

		<?php the_content(); ?>

	</main></section>

<div class="pi-rotator" id="myRotator"
     data-options='{
		"blips" : true,
		"prevNext": true,
		"carousel": true
	}'>
	<div class="item"><h1>foo</h1></div>
	<div class="item"><h1>bar</h1></div>
	<div class="item"><h1>gronk</h1></div>
</div>
<button pi-rotator-trigger="myRotator">show my rotator</button>



<?php
get_footer(); 
?>