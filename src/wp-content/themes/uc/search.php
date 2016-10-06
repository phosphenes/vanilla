<?php
/**
 * The template for displaying Search Results pages
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */

get_header(); ?>


<section><main>
	<h1 class="page-title"><?php printf( __( 'Search Results for: %s', 'twentythirteen' ), get_search_query() ); ?></h1>
	<?php 
	if(have_posts()) {
		while(have_posts()) {
			the_post(); 
			echo '<h3><a href="'.get_permalink().'">'.get_the_title().'</a></h3><p>';
			echo get_the_excerpt();
			echo '</p>';
		}
	}
	else echo 'Sorry! There are no results for this search.'; 
	?>
</main></section>

<?php get_footer(); ?>