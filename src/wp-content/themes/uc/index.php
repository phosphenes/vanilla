<?php
/**
 * Template Name: Home
 */

get_header();


$banner = (get_field('featured_image')) ? get_field('featured_image'): null;
$image = ($banner) ? $banner['sizes']['large']: '/wp-content/themes/uc/images/sample-1.jpg';
?>
	<section id="hero" class="banner-rotator" style="background-image: url('<?php echo $image; ?>');">
		<div class="pi-rotator" id="heroRotator"
			 data-options='{
		        "inline": true,
		        "prevNext": true,
		        "carousel": false,
		        "autoPlay": 10000,
		        "crossfade": true
		    }'>

			<?php
			if(get_field('rotator')) {
				while(have_rows('rotator')) {
					the_row();
					$image = get_sub_field('image');
					$text = get_sub_field('content');
					?>
					<div class="item" style="background-image: url('<?php echo $image['sizes']['large']; ?>');">
						<main>
							<div>
								<?php echo $text; ?>
							</div>
						</main>
					</div>
					<?php
				}
			}
			?>

		</div>
	</section>
<?php

include 'flex-content.php';

get_footer();
?>