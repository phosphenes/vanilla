<?php
/**
 * Created by PhpStorm.
 * User: markkanning
 * Date: 6/7/17
 * Time: 12:35 PM
 */



$options = ($isFooter) ? 'options': NULL;

/////////////////////////////////
// SECTIONS
/////////////////////////////////
if(have_rows('sections', $options)) {

	$count = 1;
	while (have_rows('sections', $options)) {
		the_row();

		$sID = str_replace('#', '', get_sub_field('id'));
		$sClasses = get_sub_field('classes');
		$allSectionClasses = array($sClasses);
		$visible = get_sub_field('visible');

		if(get_row_layout() == 'the_banners') {

//			$type = get_sub_field('');
//			$interface = get_sub_field('interface');
//			$cycling = get_sub_field('cycling');
//			$transition = get_sub_field('transition');
//			$delay = get_sub_field('delay');
			?>

			<section id="<?php echo (($sID) ? $sID : ''); ?>" class="banner-rotator <?php echo (($allSectionClasses) ? implode(' ', $allSectionClasses) : ''); ?>" style="background-image: url('<?php echo $image; ?>');" data-bg-image="<?php echo $image; ?>">
				<div class="pi-rotator"
					 data-options='{
						"inline": true,
						"prevNext": true,
						"carousel": true,
						"autoPlay": false,
						"crossfade": false,
						"blips": false
					}'>

					<?php
					if (get_sub_field('banners')) {
						while (have_rows('banners')) {
							the_row();

							$bannerClasses = array();

							$bgImage = get_sub_field('image');
							$bgImage = ($bgImage) ? 'background-image: url('.$bgImage['sizes']['large'].');': '';
							$contentAlignment = get_sub_field('content_alignment');
							$whiteText = get_sub_field('white_text');

							$video = get_sub_field('video');
							$videoOptions = get_sub_field('video_options');

							if($bgImage) array_push($bannerClasses, 'has-bg-image');
							if($whiteText) array_push($bannerClasses, 'white-text');

							$content = get_sub_field('content');
							?>
							<div class="item <?php echo implode(' ', $bannerClasses); ?>" style="<?php echo $bgImage; ?>;">

								<?php
								if ($video) {
									echo '<div class="videoBG">';
									echo '<video class="centerBox backgroundVideo" src="'.$video.'" autoplay loop></video>';
									echo '</div>';
								}
								?>

								<main class="flex-text-align <?php echo ($contentAlignment) ? $contentAlignment: ''; ?>">
									<div>
										<?php echo $content; ?>
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

		else if (get_row_layout() == 'variable_content' && $visible) {

			$bgColor = get_sub_field('background_color');
			$bgColor = ($bgColor) ? 'background-color: '.$bgColor.';': '';
			$bgImage = get_sub_field('background_image');
			$bgImage = ($bgImage) ? 'background-image: url('.$bgImage['sizes']['large'].');': '';
			$video = get_sub_field('background_video');
			$videoOptions = get_sub_field('background_video_options');
			$whiteText = get_sub_field('white_text');
			$minHeight = get_sub_field('minimum_section_height');
			$fullWidth = false;

			if($bgImage) array_push($allSectionClasses, 'has-bg-image');
			if($whiteText) array_push($allSectionClasses, 'white-text');
			if($minHeight) array_push($allSectionClasses, 'min-height min-height-'.$minHeight);

			// FULL-WIDTH / 2-COLUMN STUFF ONLY
			if (have_rows('content')) {
				while (have_rows('content')) {
					the_row();
					$fullWidth = get_sub_field('full_width');
					if ($fullWidth) array_push($allSectionClasses, 'full-width');
				}
			}

			echo '<section id="' . (($sID) ? $sID : '') . '" class="flex-content-section ' . (($allSectionClasses) ? implode(' ', $allSectionClasses) : '') . '" style="'.$bgImage.$bgColor.'">';

			if ($video) {
				echo '<div class="videoBG">';
				echo '<video class="centerBox backgroundVideo" src="'.$video.'" autoplay loop></video>';
				echo '</div>';
			}

			echo '<main>';

			/////////////////////////////////
			// LOOP CONTENT BLOCKS
			/////////////////////////////////
			if (have_rows('content')) {

				while (have_rows('content')) {
					the_row();

					$cID = str_replace('#', '', get_sub_field('id'));
					$cClasses = get_sub_field('classes');


					// ADD LAYOUT-SPECIFIC CLASSES BEFORE CUSTOM CLASSES
					$contentClasses = array('content');
					if (get_row_layout() == 'basic') array_push($contentClasses, 'content-basic');
					if (get_row_layout() == 'blocks' || get_row_layout() == 'page_list') array_push($contentClasses, 'content-blocks');
					if (get_row_layout() == '2_column') array_push($contentClasses, 'content-2-columns');
					if (get_row_layout() == 'code') array_push($contentClasses, 'content-code');
					if (get_row_layout() == 'testimonials') array_push($contentClasses, 'content-testimonial');
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
						if (get_sub_field('text_editor')) {
							echo get_sub_field('text_editor');
						}
					}

					// CODE (PHP)
					else if (get_row_layout() == 'code') {
						if (get_sub_field('code_editor')) {
							$code = get_sub_field('code_editor');
							eval($code);
						}
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
						$imageRight = get_sub_field('image_right');
						$positions = array('left', 'right');

						array_push($extraClasses, 'sizes-' . str_replace('/', '-', $sizes));
						array_push($extraClasses, $alignment);
						$extraClasses = implode(' ', $extraClasses);

						echo '<div class="columns col-2 ' . $extraClasses . '">';

						// LOOP THROUGH COLUMNS
						foreach ($positions as $p) {

							$content = null;
							$image = null;
							$imageBG = null;

							// TEXT
							if (get_sub_field($p . '_type') == 0) {
								$content = get_sub_field('text_editor_' . $p);
							}

							// IMAGE
							else if (get_sub_field($p . '_type') == 1) {
								$image = get_sub_field('image_' . $p);
								$imageBG = ($fullWidth) ? 'background-image:url('.$image['sizes']['large'].')': '';
								$content = '<img class="parentWidth" src="' . $image['sizes']['medium'] . '" />';
							}

							// CODE
							else {
								$content = eval(get_sub_field('code_editor_'.$p));
							}

							$otherClasses = (get_sub_field($p . '_type') == 0) ? 'textContent' : 'imageOnly';
							echo '<div class="' . $p . ' ' . $otherClasses . '" '.(($image) ? 'style="'.$imageBG.'"': '').'>' . $content . '</div>';
						}

						echo '</div>';
					}

					// TESTIMONIALS
					else if (get_row_layout() == 'testimonials') {

						$source = get_fields('source');
						$quote = NULL;
						$quoter = NULL;
						$quoterInfo = NULL;

						// RANDOM QUOTE FROM TESTIMONIAL POOL
						if ($source == 0) {
							$rows = get_field('testimonials', 'options');
							$rand_row = $rows[array_rand( $rows )];
							$quote = $rand_row['quote'];
							$quoter = $rand_row['quoter'];
							$quoterInfo = $rand_row['quoter_details'];
						}

						// SPECIFIC SINGLE QUOTE
						else {

						}


						echo '<div>';
						echo '<div class="quote">'.$quote.'</div>';
						echo '<div class="quoter">'.$quoter.'<div class="quoterInfo">'.$quoterInfo.'</div></div>';

						// CUSTOM STUFF
						echo '<a class="button" href="/testimonials">Read More Testimonials</a>';

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

					// PAGE LIST
					else if (get_row_layout() == 'page_list') {

						array_push($extraClasses, 'page-list');
						$extraClasses = implode(' ', $extraClasses);

						echo '<div class="columns col-3 ' . $extraClasses . '">';

						if (have_rows('custom_links')) {
							while (have_rows('custom_links')) {
								the_row();

								$image = get_sub_field('image');
								$title = get_sub_field('title');
								$description = get_sub_field('description');
								$link = get_sub_field('link');

								echo '<a href="'.$link.'" style="background-image:url('.$image['sizes']['medium'].')">';
								echo '<span class="info"><span class="infoBox">';
								echo '<span class="title">'.$title.'</span><span class="description">'.$description.'</span>';
								echo '</span></span>';
								echo '</a>';
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