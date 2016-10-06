<?php
/**
 * Template Name: Blog
 */

get_header(); 


$thisPage = get_query_var('paged');
?>

<section id="mainContent" class="postList"><main>
	
	<?php get_sidebar(); ?>
	
	<main>
	<?php 
	if(have_posts()) { 
		
		// PAGING
		$big = 999999999;
		echo '<paging>'.paginate_links(array('prev_text' => __('&nbsp;'),'next_text' => __('&nbsp;'),'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),'format' => '/page/%#%','current' => max(1, get_query_var('paged')),'total' => $wp_query->max_num_pages)).'</paging>'; 

		$count = 1;
		while(have_posts()) { 
			the_post();
			echo '<article>';
			$image = get_field('featured_post_image');
			if($image) echo '<a class="postImage" href="'.get_permalink().'" title="Read More" /><img src="'.$image['sizes']['medium'].'" /></a>';
			echo '<h2><a href="'.get_permalink().'" title="Read More">'.get_the_title().'</a></h2>';
			echo '<div class="postDetails">'.get_the_date('M. j, Y').' '.get_cat_list_for_post(get_the_ID()).'</div>';
			echo substr(get_the_excerpt(),0,200).'...<a href="'.get_permalink().'" title="Read More">Read More</a><clear></clear>';
			echo '</article>';
		}
		
		// PAGING
		$big = 999999999;
		echo '<paging>'.paginate_links(array('prev_text' => __('&nbsp;'),'next_text' => __('&nbsp;'),'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),'format' => '/page/%#%','current' => max(1, get_query_var('paged')),'total' => $wp_query->max_num_pages)).'</paging>'; 

	}
	else echo '<div style="font-style:italic;">There are no blog posts</div>';
	?>
	
	</main>

	<clear></clear>

</main></section>

<?php 
get_footer(); 
?>