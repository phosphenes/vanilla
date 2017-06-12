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

$banner = (get_field('header_image')) ? get_field('header_image'): null;
$image = ($banner) ? $banner['sizes']['large']: '/wp-content/uploads/2017/05/title-header.jpg';

$hide_title = (get_field('title_visibility')) ? true: false;
$the_title = (get_field('alternate_page_title')) ? get_field('alternate_page_title'): get_the_title();

// DEFAULT TITLE
if(!$hide_title) { ?>

	<section id="defaultPageTitle" class="flex-content-section has-bg-image white-text cs-section" style="background-image: url(<?php echo $image; ?>);">
		<main>
			<div class="content content-basic flex-text-align flex-align-left flex-align-middle">
				<h1><?php echo $the_title; ?></h1>
			</div>
		</main>
	</section>

	<?php
}


// PAGE CONTENT
if($post->post_content) {
	?>
	<section class="mainContent">
		<main>
			<div class="content content-basic">
				<?php the_content(); ?>
				<div style="clear: both"></div>
			</div>
		</main>
	</section>
	<?php
}


// FLEX CONTENT
include 'flex-fields.php';

// EXTRA FOOTER CONTENT
$isFooter = true;
include 'flex-fields.php';

get_footer();
?>