<?php
/**
 * Template Name: Home
 */

get_header();


$banner = (get_field('featured_image')) ? get_field('featured_image'): null;
$image = ($banner) ? $banner['sizes']['large']: '/wp-content/themes/uc/images/sample-1.jpg';
?>

	<section id="hero">
		<main>
			<div class="pi-rotator" data-options='{"inline": true}'>
				<div class="item">
					<h1>Supporting quality in higher education</h1>
					<ul id="userPaths">
						<li><a href="process">Know the Process</a></li>
						<li><a href="process">Get Tools and Resources</a></li>
						<li><a href="process">Search Institutions</a></li>
					</ul>
					<p>
						NWCCU is the independent, non-profit regional authority on educational quality and effectiveness of more than 160 higher education institutions in Alaska, Idaho, Montana, Nevada, Oregon, Utah and Washington. The commission is comprised of up to 26 Commissioners responsible for establishing and accreditation criteria and evaluation procedures.
					</p>
					<a href="#" id="learnMore">Learn more about NWCCU</a>
				</div>
			</div>
		</main>
	</section>

	<section id="newsAndLinks">
		<main>
			<div id="" class="content content-2-columns">
				<div class="columns col-2 sizes-66-33">
					<div id="recentNews" class="left textContent">
						<h4>RECENT NEWS</h4>
						<article>
							<a href="#">Vestibulum id lugula prota felis euismod semper</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Sed posuere consectetur est at lobortis</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Vestibulum id lugula prota felis euismod semper</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Sed posuere consectetur est at lobortis</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Vestibulum id lugula prota felis euismod semper</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Sed posuere consectetur est at lobortis</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Vestibulum id lugula prota felis euismod semper</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Sed posuere consectetur est at lobortis</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Vestibulum id lugula prota felis euismod semper</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
						<article>
							<a href="#">Sed posuere consectetur est at lobortis</a>
							<p>Cras mattis consectetur purus sit amet fermenurm. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
						</article>
					</div>
					<div id="quickLinks" class="right textContent">
						<ul>
							<li><a>Quick Links</a></li>
							<li><a href="#">Forms</a></li>
							<li><a href="#">Accredition Process</a></li>
							<li><a href="#">Directory of Institutions</a></li>
							<li><a href="#">Standards & Policies</a></li>
							<li><a href="#">Complaint Process</a></li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	</section>





<!--
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
	-->
<?php

include 'flex-content.php';

get_footer();
?>