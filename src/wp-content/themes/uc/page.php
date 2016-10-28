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





<section class="mainContent"><main>

	<?php the_content(); ?>

<clear></clear></main></section>




<?php
/////////////////////////////////
// SECTIONS
/////////////////////////////////
if(have_rows('sections')) {


	while (have_rows('sections')) {
		the_row();

		$sID = get_sub_field('id');
		$sClasses = get_sub_field('classes');

		// START SECTION
		echo '<section id="'.(($sID) ? $sID: '').'" class="'.(($sClasses) ? $sClasses: '').'"><main>';

		/////////////////////////////////
		// CONTENT BLOCKS
		/////////////////////////////////
		if(have_rows('content')) {

			while (have_rows('content')) {
				the_row();

				$cID = get_sub_field('id');
				$cClasses = get_sub_field('classes');

				// ADD LAYOUT-SPECIFIC CLASSES BEFORE CUSTOM CLASSES
				$allClasses = array('content');
				if(get_row_layout() == 'basic') array_push($allClasses, 'content-basic');
				if(get_row_layout() == 'blocks') array_push($allClasses, 'content-blocks');
				if(get_row_layout() == '2_column') array_push($allClasses, 'content-2-columns');
				if($cClasses) array_push($allClasses, $cClasses);
				$allClasses = implode(' ', $allClasses);

				// START CONTAINER
				echo '<div id="'.(($cID) ? $cID: '').'" class="'.(($allClasses) ? $allClasses: '').'">';

				// BASIC
				if(get_row_layout() == 'basic') {
					if(get_sub_field('text_editor')) echo get_sub_field('text_editor');
				}

				// BLOCKS
				else if(get_row_layout() == 'blocks') {


				}

				// 2 COLUMNS
				else if(get_row_layout() == '2_column') {

					$sizes = get_sub_field('column_sizes');
					$positions = array('left','right');

					echo '<div class="columns col-2 sizes-'.str_replace('/', '-', $sizes).'">';

						// LOOP THROUGH COLUMNS
						foreach($positions as $p) {

							$content = null;

							// TEXT
							if(get_sub_field($p.'_type') == 0) {
								$content = get_sub_field('text_editor_'.$p);
							}
							// IMAGE
							else {
								$image = get_sub_field('image_'.$p);
								$content = '<img class="parentWidth" src="'.$image['sizes']['medium'].'" />';
							}
							echo '<div>'.$content.'</div>';
						}

					echo '</div>';

				}

				echo '</div>';
			}
		}

		echo '</main></section>';

	}
}

?>







<?php
get_footer(); 
?>