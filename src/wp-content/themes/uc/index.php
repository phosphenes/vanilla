<?php
/**
 * Template Name: Home
 */

get_header();



$banner = (get_field('featured_image')) ? get_field('featured_image'): null;
$image = ($banner) ? $banner['sizes']['large']: '/wp-content/themes/uc/images/sample-1.jpg';

?>
	<section id="hero" style="background-image: url('<?php echo $image; ?>');">
		<div class="pi-rotator" id="heroRotator"
			 data-options='{
		        "inline": true,
		        "blips": true,
		        "carousel": true,
		        "autoPlay": 20000,
		        "crossfade": true
		    }'>
			<div class="item">
				<main>
					<div>
						<h1>Smile, Olympia!</h1>
						<p>We are committed to providing a pleasant experience and exceptional, personalized care. The Walker & Walsh Dental Team is dedicated to giving you plenty of reasons to smile, Olympia.</p>
					</div>
				</main>
			</div>
			<div class="item">
				<main>
					<div>
						<h1>A family atmosphere.</h1>
						<p>Our Olympia office feels like home, at least to us. We collaborate as a respectful, fully integrated team. This is the main reason so many of our key staff have been working together for more than a decade or two.</p>
					</div>
				</main>
			</div>
			<div class="item">
				<main>
					<div>
						<h1>Your comfort is our priority.</h1>
						<p>We know that many people put off important dental work for fear of the unknown. Our number one goal is to put you at ease by taking the time to walk you through all of your options and explain all possible outcomes to ensure your well-being and satisfaction.</p>
					</div>
				</main>
			</div>
		</div>
	</section>

<?php


include 'flex-content.php';


get_footer();
?>