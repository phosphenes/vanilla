<?php
/**
 * Template Name: Blog
 */

get_header();


$thisPage = get_query_var('paged');

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




<?php
$counter = 1;

if(have_posts()) {

	// PAGING
	$big = 999999999;
	echo '<paging>'.paginate_links(array('prev_text' => __('&nbsp;'),'next_text' => __('&nbsp;'),'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),'format' => '/page/%#%','current' => max(1, get_query_var('paged')),'total' => $wp_query->max_num_pages)).'</paging>';

	$totalPosts = $wp_query->post_count;

	$counter = 1;
	while(have_posts()) {
		the_post();

		$image = get_field('featured_image');

		if($counter == 1) echo '<section><main><div class="content content-columns"><div class="columns col-2 sizes-33-66">';
		else if($counter == 2) echo '<section><main><div class="content content-columns"><div class="columns col-3">';

		if($counter == 1) {
			if($image) echo '<div><a href="'.get_permalink().'"><img src="'.$image['sizes']['large'].'" /></a></div>';
			echo '<div><h1 style="margin-top: -15px"><a href="'.get_permalink().'">'.get_the_title().'</a></h1>';
			echo '<h5>'.get_the_excerpt().' </h5>';
			echo '<p style="text-align: right"><a class="button" href="'.get_permalink().'">Read More</a></p></div>';
		}
		else {
			echo '<div class="childPageItem"><a href="'.get_permalink().'"><img src="'.$image['sizes']['medium'].'" /></a>';
			echo '<h4><a href="'.get_permalink().'">'.get_the_title().'</h4></div>';
		}

		if($counter == 1) echo '</div></div></main></section>';
		else if($counter == $totalPosts) echo '</div></div></main></section>';

		$counter++;




//			echo '<article>';
//			$image = get_field('featured_image');
//			if($image) echo '<a class="postImage" href="'.get_permalink().'" title="Read More" /><img src="'.$image['sizes']['medium'].'" /></a>';
//			echo '<div><h2><a href="'.get_permalink().'" title="Read More">'.get_the_title().'</a></h2>';
//			echo '<div class="postDetails"><b>'.get_the_date('M. j, Y').'</b> '.get_cat_list_for_post(get_the_ID()).'</div>';
//			echo substr(get_the_excerpt(),0,200).'...<a href="'.get_permalink().'" title="Read More">Read More</a>';
//			echo '</div></article>';



	}

	// PAGING
	$big = 999999999;
	echo '<paging>'.paginate_links(array('prev_text' => __('&nbsp;'),'next_text' => __('&nbsp;'),'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),'format' => '/page/%#%','current' => max(1, get_query_var('paged')),'total' => $wp_query->max_num_pages)).'</paging>';

}
else echo '<div style="font-style:italic;">There are no blog posts</div>';
?>



<?php
get_footer();
?>