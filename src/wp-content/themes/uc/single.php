<?php
/**
 * The template for displaying all single posts
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */

get_header(); 

the_post();
global $post;


$image = '';
$images = (get_field('banner_images', 1358)) ? get_field('banner_images', 1358): null;
if($images) {
	$rand = array_rand($images, 1);
	$image = $images[$rand]['url'];
}
?>


	<section id="hero" style="background-image: url(<?php echo $image; ?>);">
		<main class="flex-text-align flex-align-center flex-align-middle">
			<div>
				<h1><a href="<?php echo get_permalink(get_option('page_for_posts')); ?>">Blog</a></h1>
			</div>
		</main>
	</section>

	<section id="mainContent">
		<main>

			<h1><?php echo get_the_title(); ?></h1>
			<div class="postDetails"><b><?php echo get_the_date('M. j, Y'); ?></b> <?php echo get_cat_list_for_post(get_the_ID()); ?></div>

			<?php
			$image = get_field('featured_image');
			if($image) echo '<img class="alignright" src="'.$image['sizes']['medium'].'" />';
			the_content();
			?>
			<div style="clear: both;"></div>

		</main>
	</section>

	<section id="mainContent" style="border-top: 1px solid #ccc;">
		<main>

			<div class="content content-blocks">
				<h2>More from the blog</h2>
				<div class="columns col-3">
					<?php
					$counter = 1;
					$mypages = get_posts(array('orderby' => 'rand', 'post_type' => 'post', 'post_status' => 'publish', 'numberposts' => 3));
					foreach( $mypages as $page ) {
					$image = get_field('featured_image', $page->ID);
					echo '<div class="childPageItem"><a href="'.get_permalink($page->ID).'"><img src="'.$image['sizes']['medium'].'" /></a>';
						echo '<h4><a href="'.get_permalink($page->ID).'">'.get_the_title($page->ID).'</h4></div>';
					}
					?>
				</div>
			</div>
		</main>
	</section>

<?php 

get_footer(); 
?>