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
?>

<section id="mainContent"><main>

	<main>
		<h1><?php echo get_the_title(); ?></h1>
		<div class="postDetails"><?php echo get_the_date('M. j, Y'); ?> <?php echo get_cat_list_for_post(get_the_ID()); ?></div>
		
		<?php 
		$image = get_field('featured_post_image');
		if($image) echo '<img class="alignright" src="'.$image['sizes']['medium'].'" />';
		the_content();
		?>
	</main>
	
	<?php get_sidebar(); ?>
	
	<clear></clear>

</main></section>

<?php 

get_footer(); 
?>