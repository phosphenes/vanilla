<?php
/**
 * The template for displaying Archive pages
 */

get_header(); 


$thisPage = get_query_var('paged');

echo '<section class="mainContent"><main>';


echo '<h1>'.get_the_archive_title().'</h1>';

	if(have_posts()) { 
		
		// PAGING
		$big = 999999999;
		echo '<paging>'.paginate_links(array('prev_text' => __('&nbsp;'),'next_text' => __('&nbsp;'),'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),'format' => '/page/%#%','current' => max(1, get_query_var('paged')),'total' => $wp_query->max_num_pages)).'</paging>'; 


		echo '<div class="archiveList">';

		$count = 1;
		while(have_posts()) { 
			the_post();
			echo '<article>';
			$image = get_field('featured_post_image');
			if($image) echo '<a class="postImage" href="'.get_permalink().'" title="Read More" /><img src="'.$image['sizes']['medium'].'" /></a>';
			echo '<h2><a href="'.get_permalink().'" title="Read More">'.get_the_title().'</a></h2>';
			echo substr(get_the_excerpt(),0,200).'...<a href="'.get_permalink().'" title="Read More">Read More</a><clear></clear>';
			echo '</article>';
		}

		echo '</div>';
		
		// PAGING
		$big = 999999999;
		echo '<paging>'.paginate_links(array('prev_text' => __('&nbsp;'),'next_text' => __('&nbsp;'),'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),'format' => '/page/%#%','current' => max(1, get_query_var('paged')),'total' => $wp_query->max_num_pages)).'</paging>'; 

	}
	else echo '<div style="font-style:italic;">There are no blog posts</div>';

echo '</main></section>';


get_footer(); 
?>