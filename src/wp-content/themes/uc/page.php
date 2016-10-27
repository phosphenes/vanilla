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

$pageID = get_the_ID();
$parentPageID = (wp_get_post_parent_id($pageID) != 0) ? wp_get_post_parent_id($pageID): NULL;
$childPages = ($parentPageID) ? get_pages(array('child_of' => $parentPageID, 'parent' => $parentPageID, 'sort_column' => 'menu_order')): NULL;
//$heroImage = get_field('hero_image');
//if ($heroImage) {
//	$url = $heroImage ? $heroImage['sizes']['large'] : '';
//	echo "<section id='hero' style='background-image: url($url)'></section>";
//}

?>

 <section id="hero">
	 <main>

		 <h1><?php the_title(); ?></h1>

	 </main>
 </section>



<section class="mainContent"><main>

	<?php the_content(); ?>

<clear></clear></main></section>



<?php
get_footer(); 
?>