
<?php
$states = array(
	'AK' => 'Alaska',
	'BC' => 'British Columbia',
	'ID' => 'Idaho',
	'MT' => 'Montana',
	'NV' => 'Nevada',
	'OR' => 'Oregon',
	'UT' => 'Utah',
	'WA' => 'Washington'
);
$tags = array();
$arr = array('post_type' => 'directory', 'post_status' => 'publish', 'orderby' => 'title', 'nopaging' => true, 'order' => 'asc');
$stuff = new WP_Query($arr);
?>


<section class="mainContent">
	<main>
		<h3 style="text-align: center">Filter Institutions by</h3>
		<div class="columns col-2 sizes-50-50 vertical-align-top">

			<div class="filterBox states left">
				<?php foreach($states as $k => $s) echo '<a data-filter="'.$k.'">'.$s.'</a>'; ?>
			</div>

			<?php
			// GATHER TAGS
			if($stuff->have_posts()) {
				while($stuff->have_posts()) {
					$stuff->the_post();
					$thesetags = wp_get_post_tags(get_the_ID());
					if($thesetags) foreach($thesetags as $tag) array_push($tags, $tag->name);
				}
			}

			// SHOW TAGS IF ANY
			if(!empty($tags)) {
				sort($tags);
				$tags = array_unique($tags);
				echo '<div class="filterBox tags right">';
				foreach($tags as $t) echo '<a data-filter="'.$t.'">'.$t.'</a>';
				echo '</div>';
			}
			?>

		</div>


		<?php
		// DIRECTORY
		if($stuff->have_posts()) {
			echo '<ul id="directory">';

			echo '<li class="institution column-labels columns col-4">';
			echo '<div>Institution</div><div>Website</div><div>Status</div><div>Institutional Control</div>';
			echo '</li>';

			while($stuff->have_posts()) {
				$stuff->the_post();

				// CLASSES
				$theState = '';
				if(get_field('state', get_the_ID())) $theState = 'filter-'.get_field('state', get_the_ID());
				$theTags = array();
				$thesetags = wp_get_post_tags(get_the_ID());
				if($thesetags) foreach($thesetags as $tag) array_push($theTags, 'filter-'.$tag->name);
				$classes = implode(' ', $theTags).' '.$theState;

				// DATA
				$website = get_field('website', get_the_ID());
				$status = get_field('status', get_the_ID());
				$status_year = get_field('status_year', get_the_ID());
				$institutional_control = get_field('institutional_control', get_the_ID());
				$profit_status = ($institutional_control == 'Private') ? ' <i>('.get_field('profit_status', get_the_ID()).')</i>': '';

				$most_recent_evaluation = get_field('most_recent_evaluation', get_the_ID());
				$next_evaluation = get_field('next_evaluation', get_the_ID());
				$degree_levels = get_field('degree_levels', get_the_ID());
				$public_sanction = get_field('public_sanction', get_the_ID());
				$statement_regarding_sanction = get_field('statement_regarding_sanction', get_the_ID());

				echo '<li class="institution columns col-4 '.$classes.'">';
				echo '<div><a class="show-more" title="Show more details">'.get_the_title().'</a></div><div>'.$website.'</div><div>'.$status.' <i>('.$status_year.')</i></div><div>'.$institutional_control.$profit_status.'</div>';

				// MORE DETAILS
				echo '<div class="more columns col-2">';
				echo '<div><b>Most recent evalutaion</b></div><div>'.$most_recent_evaluation.'</div>';
				echo '<div><b>Next evalutaion</b></div><div>'.$next_evaluation.'</div>';
				echo '<div><b>Degree levels</b></div><div>'.implode(', ',$degree_levels).'</div>';
				echo '<div><b>Public sanction</b></div><div>'.$public_sanction.'</div>';
				echo '<div><b>Statement regarding sanction</b></div><div>'.$statement_regarding_sanction.'</div>';
				echo '</div>';
				echo '</li>';
			}
			echo '</ul>';

			wp_reset_postdata();
		}
		?>

	</main>
</section>