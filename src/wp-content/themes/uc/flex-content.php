<?php
/**
 * Created by PhpStorm.
 * User: markkanning
 * Date: 10/31/16
 * Time: 4:29 PM
 */



/////////////////////////////////
// SECTIONS
/////////////////////////////////
if(have_rows('sections')) {

	$count = 1;
	while (have_rows('sections')) {
		the_row();

		$sID = get_sub_field('id');
		$sClasses = get_sub_field('classes');

		if(get_row_layout() == 'banner_rotator') {


//			$type = get_sub_field('');
//			$interface = get_sub_field('interface');
//			$cycling = get_sub_field('cycling');
//			$transition = get_sub_field('transition');
//			$delay = get_sub_field('delay');

			?>

			<section id="hero" class="banner-rotator" style="background-image: url('<?php echo $image; ?>');">
				<div class="pi-rotator" id="heroRotator"
					 data-options='{
						"inline": true,
						"prevNext": true,
						"carousel": false,
						"autoPlay": 10000,
						"crossfade": true
					}'>

					<?php
					if(get_field('banners')) {
						while(have_rows('banners')) {
							the_row();

							?>
							<div class="item" style="background-image: url('');">
								<main>
									<div>

									</div>
								</main>
							</div>
							<?php
						}
					}
					?>

				</div>
			</section>



			<?php




		}


		else if(get_row_layout() == 'variable_content') {

			// START SECTION
			echo '<section id="' . (($sID) ? $sID : '') . '" class="' . (($sClasses) ? $sClasses : '') . '"><main>';

			/////////////////////////////////
			// LOOP CONTENT BLOCKS
			/////////////////////////////////
			if (have_rows('content')) {

				while (have_rows('content')) {
					the_row();

					$cID = get_sub_field('id');
					$cClasses = get_sub_field('classes');

					// ADD LAYOUT-SPECIFIC CLASSES BEFORE CUSTOM CLASSES
					$contentClasses = array('content');
					if (get_row_layout() == 'basic') array_push($contentClasses, 'content-basic');
					if (get_row_layout() == 'blocks') array_push($contentClasses, 'content-blocks');
					if (get_row_layout() == '2_column') array_push($contentClasses, 'content-2-columns');
					if ($cClasses) array_push($contentClasses, $cClasses);
					$contentClasses = implode(' ', $contentClasses);

					// START CONTAINER
					echo '<div id="' . (($cID) ? $cID : '') . '" class="' . (($contentClasses) ? $contentClasses : '') . '">';

					$extraClasses = array();


					/////////////////////////////////
					// CONTENT TYPES
					/////////////////////////////////

					// BASIC
					if (get_row_layout() == 'basic') {
						if (get_sub_field('text_editor')) echo get_sub_field('text_editor');
					}

					// BLOCKS
					else if (get_row_layout() == 'blocks') {

						$maxColumns = get_sub_field('max_columns');
						$actualColumns = count(get_sub_field('columns'));

						($maxColumns > 0) ? array_push($extraClasses, 'col-' . $maxColumns): array_push($extraClasses, 'col-' . $actualColumns);
						$extraClasses = implode(' ', $extraClasses);

						echo '<div class="columns ' . $extraClasses . '">';

						if (have_rows('columns')) {
							while (have_rows('columns')) {
								the_row();
								echo '<div>' . get_sub_field('content') . '</div>';
							}
						}
						echo '</div>';
					}

					// 2 COLUMNS
					else if (get_row_layout() == '2_column') {

						$sizes = get_sub_field('column_sizes');
						$alignment = get_sub_field('vertical_alignment');
						$positions = array('left', 'right');

						array_push($extraClasses, 'sizes-' . str_replace('/', '-', $sizes));
						array_push($extraClasses, $alignment);
						$extraClasses = implode(' ', $extraClasses);

						echo '<div class="columns col-2 ' . $extraClasses . '">';

						// LOOP THROUGH COLUMNS
						foreach ($positions as $p) {

							$content = null;

							// TEXT
							if (get_sub_field($p . '_type') == 0) {
								$content = get_sub_field('text_editor_' . $p);
							} // IMAGE
							else {
								$image = get_sub_field('image_' . $p);
								$content = '<img class="parentWidth" src="' . $image['sizes']['medium'] . '" />';
							}

							$otherClasses = (get_sub_field($p . '_type') == 0) ? 'textContent' : 'imageOnly';
							echo '<div class="' . $p . ' ' . $otherClasses . '">' . $content . '</div>';
						}

						echo '</div>';
					}

					// FAQ
					else if (get_row_layout() == 'faq') {

						array_push($extraClasses, 'faq');
						$extraClasses = implode(' ', $extraClasses);

						echo '<div class="' . $extraClasses . '">';

						if (have_rows('q_and_a')) {
							while (have_rows('q_and_a')) {
								the_row();

								$question = get_sub_field('question');
								$answer = get_sub_field('answer');

								echo '<div class="q-and-a">';
								echo '<div class="question">' . $question . '</div>';
								echo '<div class="answer">' . $answer . '</div>';
								echo '</div>';
							}
						}

						echo '</div>';
					}

					echo '</div>';
				}
			}

			echo '</main></section>';
			$count++;
		}
	}
}