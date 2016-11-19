<?php

/////////////////////////////////////////////////
// WORDPRESS DEFAULT RECONFIGURATION
/////////////////////////////////////////////////

// TURN OFF ADMIN BAR WHEN VIEWING SITE
add_filter('show_admin_bar', '__return_false');

// SEND ALL NON-ADMIN ROLES STRAIGHT TO HOMEPAGE AFTER LOGIN
function soi_login_redirect($redirect_to, $request, $user) {
	return (is_array($user->roles) && in_array('administrator', $user->roles)) ? admin_url() : site_url();
} 
//add_filter('login_redirect', 'soi_login_redirect', 10, 3);

// INITIATE NAV MENU SUPPORT
register_nav_menus(array('top_nav' => 'Top navigation'));
register_nav_menus(array('footer_nav' => 'Footer navigation'));
add_theme_support('nav-menus');

function my_wp_nav_menu_args($args='') {
	$args['container'] = false;
	return $args;
}
add_filter('wp_nav_menu_args','my_wp_nav_menu_args');






// TINYMCE STYLESHEET
function my_theme_add_editor_styles() {
    add_editor_style( 'tinymce-styles.css' );
}
add_action( 'init', 'my_theme_add_editor_styles' );

// CUSTOM STYLES
function my_mce_before_init_insert_formats( $init_array ) {

	$style_formats = array(
		array(
			'title' => 'Button',
			'inline' => 'a',
			'classes' => 'button',
			'wrapper' => false,
			'exact' => true,
			'attributes' => array('href'=>'/')
		)
	);
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array['style_formats'] = json_encode( $style_formats );

	return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );


// EXCLUDE HOME LINK
function page_menu_args( $args ) {
    $args['show_home'] = false;
    return $args;
}
add_filter('wp_page_menu_args', 'page_menu_args');

// REMOVE width/height ATTRIBUTES FROM INSERTED IMAGES
add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 );
add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 );
function remove_width_attribute( $html ) {
   $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
   return $html;
}

function remove_size_attributes_from_images($content) {
	global $post;

	if($content) {
		$doc = DOMDocument::loadHTML($content);
		if ($doc->getElementsByTagName('img')) {
			foreach ($doc->getElementsByTagName('img') as $image) {
				foreach (array('width', 'height') as $attribute_to_remove) {
					if ($image->hasAttribute($attribute_to_remove)) {
						$image->removeAttribute($attribute_to_remove);
					}
				}
			}
		}
		$content = $doc->saveHTML();
	}
	return $content;
}
add_filter('the_content', 'remove_size_attributes_from_images');


// REMOVE DEFAULT IMAGE LINKING IN WYSIWYG
function wpb_imagelink_setup() {
	$image_set = get_option( 'image_default_link_type' );
	if($image_set !== 'none') update_option('image_default_link_type', 'none');
}
add_action('admin_init', 'wpb_imagelink_setup', 10);

if(function_exists('register_sidebar')) register_sidebar();

// "POST TITLE LIKE" FUNCTION FOR wp_query
add_filter('posts_where', 'title_like_posts_where', 10, 2);
function title_like_posts_where( $where, &$wp_query ) {
    global $wpdb;
    if ( $post_title_like = $wp_query->get( 'post_title_like' ) ) {
        $where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'' . esc_sql( like_escape( $post_title_like ) ) . '%\'';
    }
    return $where;
}


/////////////////////////////////
// ADD TAG SUPPORT TO PAGES
/////////////////////////////////
function tags_support_all() { register_taxonomy_for_object_type('post_tag', 'page'); }
function tags_support_query($wp_query) {
	if ($wp_query->get('tag')) $wp_query->set('post_type', 'any');
}
add_action('init', 'tags_support_all');
add_action('pre_get_posts', 'tags_support_query');


/////////////////////////////////////////////////
// ACF - INITIATE OPTIONS PAGE
/////////////////////////////////////////////////
if(function_exists('acf_add_options_page')) {
	acf_add_options_page(array(
		'page_title' 	=> 'Options',
		'menu_title'	=> 'Options',
		'menu_slug' 	=> 'options',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}

/////////////////////////////////////////////////
// ACF - CSS OVERWRITES
/////////////////////////////////////////////////
function custom_admin_styles() { ?>
	<style type="text/css">
		@import '<?php echo get_template_directory_uri(); ?>/admin.css';
	</style>
	<?php
}
add_action('admin_head', 'custom_admin_styles');






///////////////////////////////////////////////
// WORDPRESS IMAGE GALLERY REPLACEMENT FUNCTION:
// OVERWRITES NATIVE GALLERY WITH CUSTOM CODE
///////////////////////////////////////////////
remove_shortcode('gallery');
add_shortcode('gallery', 'theme_gallery_shortcode');

function theme_gallery_shortcode( $attr ) {

	$post = get_post();

	static $instance = 0;
	$instance++;

	if ( ! empty( $attr['ids'] ) ) {
		if ( empty( $attr['orderby'] ) )
			$attr['orderby'] = 'post__in';
		$attr['include'] = $attr['ids'];
	}

	$output = apply_filters('post_gallery', '', $attr);
	if($output != '')
		return $output;

	if(isset( $attr['orderby'])) {
		$attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
		if(!$attr['orderby'])
			unset( $attr['orderby'] );
	}

	extract(shortcode_atts(array(
		'order'      => 'ASC',
		'orderby'    => 'menu_order ID',
		'id'         => $post->ID,
		'itemtag'    => 'dl',
		'icontag'    => 'dt',
		'captiontag' => 'dd',
		'columns'    => 3,
		'size'       => 'medium',
		'include'    => '',
		'exclude'    => ''
	), $attr));

	$id = intval($id);
	if ('RAND' == $order)
		$orderby = 'none';

	if(!empty($include)) {
		$_attachments = get_posts( array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
		$attachments = array();
		foreach ( $_attachments as $key => $val ) {
			$attachments[$val->ID] = $_attachments[$key];
		}
	} 
	elseif(!empty($exclude)) {
		$attachments = get_children( array('post_parent' => $id, 'exclude' => $exclude, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
	} 
	else {
		$attachments = get_children( array('post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
	}

	if(empty($attachments))
		return '';

	if(is_feed()) {
		$output = "\n";
		foreach($attachments as $att_id => $attachment)
			$output .= wp_get_attachment_link($att_id, $size, true) . "\n";
		return $output;
	}

	$i = 0;
	foreach($attachments as $id => $attachment) {
		$thumb = wp_get_attachment_image_src($id, 'medium');
		$image = wp_get_attachment_image_src($id, 'large');
		$caption = (trim($attachment->post_excerpt)) ? '<div class="caption">'.wptexturize($attachment->post_excerpt).'</div>': '';
		$output .= '<a class="gallery-thumb fancybox" rel="gallery" href="'.$image[0].'">';
//		$output .= '<div class="image"><img src="'.$thumb[0].'" /><img src="'.$image[0].'" /></div>';
		$output .= '<div class="image" style="background-image:url('.$thumb[0].')"><img src="'.$thumb[0].'" /></div>';
		$output .= $caption.'</a>';
	}
	
	$output = '<div class="photo-gallery">'.$output.'<div style="clear:both;"></div></div>';

	return $output;
}





/////////////////////////////////////////////////
// UTILITY FUNCTIONS
/////////////////////////////////////////////////
function is_login_page() {
	return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
}


// RETURNS ARRAY OF INFO USED FOR PAGE/CATEGORY ELEMENTS IN HEADER
function getPostAncestorsInfo($ID) {
	$page = get_page($ID);
	$family = array_reverse(get_post_ancestors($page->ID));
	array_push($family, $page->ID);
	$levels = count($family);
	$catID = $family[0];
	$parent = ($levels > 1) ? get_page($page->post_parent): NULL;
	$parentID = ($parent) ? $parent->ID: NULL;
	return array('levels' => $levels, 'catID' => $catID, 'parentID' => $parentID);	
}

// GET A PAGE'S PARENT ID
function get_the_parent_ID($ID) {
	//return get_post_ancestors($ID)[0];
}

// GET THE SLUG FROM A POST ID
function get_the_slug($id) {
    $post_data = get_post($id, ARRAY_A);
    $slug = $post_data['post_name'];
    return $slug; 
}

// GET PAGE ID FROM SLUG
function get_post_from_slug($slug) {
	$page = get_page_by_path($slug);
	return ($page) ? $page: null;
}

// RETRIEVE LIST OF LINKED CATEGORIES FOR SINGLE POST
function get_cat_list_for_post($ID) {
	$post_categories = wp_get_post_categories($ID);
	$cats = array();
	foreach($post_categories as $c) {
		$cat = get_category($c);
		if($cat->slug !== 'uncategorized') $cats[] = '<a href="/category/'.$cat->slug.'">'.$cat->name.'</a>';
	}
	return (count($cats) > 0) ? ' &sdot; Categories: '.implode(', ', $cats): '';
}


// RETRIEVE LIST OF LINKED CATEGORIES FOR SINGLE POST
function get_tag_list_for_post($ID) {
	$post_tags = wp_get_post_tags($ID);
	$tags = array();
	foreach($post_tags as $t) {
		$tag = get_term($t);
		$tags[] = '<a href="/tag/'.$tag->slug.'">'.$tag->name.'</a>';
	}
	return (count($tags) > 0) ? implode('', $tags): false;
}

// GET THE ID FOR THE FIRST CATEGORY OF A POTENTIAL LIST OF CATEGORIES FOR A POST
function get_single_cat_ID($ID) {
	$post_categories = wp_get_post_categories($ID);
	$cats = array();
	foreach($post_categories as $c) {
		$cat = get_category($c);
		if($cat->slug !== 'uncategorized') $cats[] = $cat->cat_ID;
	}
	return $cats[0];
}

// DISCOVER IF POST ID IN IN A CERTAIN CATEGORY BY IT'S ID
function postIsInThisCat($postID, $catID) {
	$isInCat = false;
	$post_categories = wp_get_post_categories($postID);
	foreach($post_categories as $c) {
		$isInCat = ($c == $catID) ? true: false;
	}
	return ($isInCat) ? true: false;
}

// RETRIVE CATEGORY SLUG FOR USE IN URL'S
function get_cat_slug($ID) {
	$yourcat = get_category($ID);
	return $yourcat->slug;
}

// GET THE FIRST CATEGORY NAME/SLUG FOR THIS POST
function get_first_cat($id) {
	$post_categories = wp_get_post_categories($id);
	$catInfo = array();
	$done = false;
	foreach($post_categories as $c) {
		$cat = get_category($c);
		if($cat->slug !== 'uncategorized' && !$done) {
			$done = true;
			$catInfo['slug'] = $cat->slug;
			$catInfo['name'] = $cat->name;
			$catInfo['ID'] = $cat->cat_ID;
		}
	}
	return $catInfo;
}




/////////////////////////////////////////
// SHARE BUTTONS BOX
/////////////////////////////////////////
function shareThisButtons() { ?>

<div id="shareThisButtons">
	<span class="label">Share this:</span>
	<span class='st_linkedin_large' displayText='Pinterest' title="Share on Pinterest"></span>
	<span class='st_facebook_large' displayText='Facebook' title="Share on Facebook"></span>
	<span class='st_twitter_large' displayText='Tweet' title="Share on Twitter"></span>
	<span class='st_googleplus_large' displayText='Google +' title="Share on Google+"></span>
</div>
<?php
}



function stateDropdown($post=null, $type='abbrev') {
	$states = array(
		array('AK', 'Alaska'),
		array('AL', 'Alabama'),
		array('AR', 'Arkansas'),
		array('AZ', 'Arizona'),
		array('CA', 'California'),
		array('CO', 'Colorado'),
		array('CT', 'Connecticut'),
		array('DC', 'District of Columbia'),
		array('DE', 'Delaware'),
		array('FL', 'Florida'),
		array('GA', 'Georgia'),
		array('HI', 'Hawaii'),
		array('IA', 'Iowa'),
		array('ID', 'Idaho'),
		array('IL', 'Illinois'),
		array('IN', 'Indiana'),
		array('KS', 'Kansas'),
		array('KY', 'Kentucky'),
		array('LA', 'Louisiana'),
		array('MA', 'Massachusetts'),
		array('MD', 'Maryland'),
		array('ME', 'Maine'),
		array('MI', 'Michigan'),
		array('MN', 'Minnesota'),
		array('MO', 'Missouri'),
		array('MS', 'Mississippi'),
		array('MT', 'Montana'),
		array('NC', 'North Carolina'),
		array('ND', 'North Dakota'),
		array('NE', 'Nebraska'),
		array('NH', 'New Hampshire'),
		array('NJ', 'New Jersey'),
		array('NM', 'New Mexico'),
		array('NV', 'Nevada'),
		array('NY', 'New York'),
		array('OH', 'Ohio'),
		array('OK', 'Oklahoma'),
		array('OR', 'Oregon'),
		array('PA', 'Pennsylvania'),
		array('PR', 'Puerto Rico'),
		array('RI', 'Rhode Island'),
		array('SC', 'South Carolina'),
		array('SD', 'South Dakota'),
		array('TN', 'Tennessee'),
		array('TX', 'Texas'),
		array('UT', 'Utah'),
		array('VA', 'Virginia'),
		array('VT', 'Vermont'),
		array('WA', 'Washington'),
		array('WI', 'Wisconsin'),
		array('WV', 'West Virginia'),
		array('WY', 'Wyoming')
	);
	
	$options = '<option value=""></option>';
	
	foreach($states as $state) {
		if		($type == 'abbrev') $options .= '<option value="'.$state[0].'" '. check_select($post, $state[0], false) .' >'.$state[0].'</option>'."\n";
		else if	($type == 'name') 	$options .= '<option value="'.$state[1].'" '. check_select($post, $state[1], false) .' >'.$state[1].'</option>'."\n";
		else if	($type == 'mixed') 	$options .= '<option value="'.$state[0].'" '. check_select($post, $state[0], false) .' >'.$state[1].'</option>'."\n";
	}	
	echo $options;
}


function countryOptions() {
	$countries = array("Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe");
	$options = '<option value=""></option>';
	foreach($countries as $k => $v) $options .= '<option>'.$v.'</option>';
	echo $options;
}


/* Check Select Element  */
function check_select($i, $m, $e=true) {
	if($i != null) { 
		$var = ( $i == $m ) ? ' selected="selected" ': '';
	} 
	else $var = '';
	if(!$e) return $var;
	else echo $var;
}




