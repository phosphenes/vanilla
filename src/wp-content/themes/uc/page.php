<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */

get_header();

global $post;

$pageID = get_the_ID();
$parentPageID = (wp_get_post_parent_id($pageID) != 0) ? wp_get_post_parent_id($pageID): NULL;
$childPages = ($parentPageID) ? get_pages(array('child_of' => $parentPageID, 'parent' => $parentPageID, 'sort_column' => 'menu_order')): NULL;

$banner = (get_field('featured_image')) ? get_field('featured_image'): null;
$image = ($banner) ? $banner['sizes']['large']: '/wp-content/themes/uc/images/hero.jpg';

?>

<section id="hero" style="background-image: url('<?php echo $image; ?>');">
	<main class="flex-text-align flex-align-center flex-align-middle">
		<div>
			<h1><?php the_title(); ?></h1>
		</div>
	</main>
</section>

<?php
/////////////////////////////
// BREADCRUMB
/////////////////////////////
echo '<section id="breadcrumb"><main>';
echo '<a href="/">Home</a>';
$parents = get_post_ancestors(get_the_ID());
if($parents) {
	$parents = array_reverse($parents);
	foreach ($parents as $p) echo '<a href="'.get_permalink($p).'">'.get_the_title($p).'</a>';
}
echo '<b>'.get_the_title(get_the_ID()).'</b>';
echo '</main></section>';


/////////////////////////////
// PAGE CONTENT
/////////////////////////////
if($post->post_content) {
?>

	<section class="mainContent">
		<main>
			<div class="content content-basic">
				<?php the_content(); ?>
			</div>
		</main>
	</section>

<?php
}

include 'flex-content.php';

get_footer();
?>