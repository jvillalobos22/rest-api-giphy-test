<?php
/*
Plugin Name: GIPHY TEST
*/


/**
 * Silence is golden; exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


// Include CMB2
require_once  __DIR__ . '/cmb2/init.php';
add_action( 'cmb2_init', 'cmb2_sample_metaboxes' );

// Include Script
function load_custom_wp_giphy_scripts($hook) {
    wp_enqueue_script( 'giphy_js', plugin_dir_url() . 'giphy-test/js/giphy.js', array( 'jquery' ), null, true );
    wp_enqueue_style( 'giphy_admin_css', plugins_url('/css/giphy-styles.css', __FILE__) );
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_giphy_scripts' );


/**
* Define the metabox and field configurations.
*/

function cmb2_sample_metaboxes() {

    // Start with an underscore to hide fields from custom fields list
    $prefix = 'giphy_test_';

    /**
    * Initiate the metabox
    */
    $cmb = new_cmb2_box( array(
        'id'            => 'giphy_metabox',
        'title'         => __( 'Post Gifs', 'cmb2' ),
        'object_types'  => array( 'post', ), // Post type
        'context'       => 'normal',
        'remove_box_wrap' => true,
        'priority'      => 'high',
        'classes'      => 'giphy_metabox',
        'show_in_rest' => true,
        'show_names'    => false, // Show field names on the left
        'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // Keep the metabox closed by default
    ) );

    $group_field_id = $cmb->add_field( array(
        'id'          => 'post_gif',
        'type'        => 'group',
        'description' => false,
        'before_group' => 'cmb_before_row_cb',
        'after_group' => 'cmb_after_row_cb',
        'classes' => 'giphy_group_field',
        // 'repeatable'  => false, // use false if you want non-repeatable group
        'options'     => array(
            'group_title'   => __( 'Gif {#}', 'cmb2' ), // since version 1.1.4, {#} gets replaced by row number
            'add_button'    => __( 'Add Another Gif', 'cmb2' ),
            'remove_button' => __( 'Remove Gif', 'cmb2' ),
            'sortable'      => false, // beta
        ),
    ) );

    // Id's for group's fields only need to be unique for the group. Prefix is not needed.
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Giphy URL',
        'id'   => 'url',
        'before' => '<strong>Gif URL</strong>',
        'after' => 'cmb_after_url_input_cb',
        'classes' => 'gif_url',
        'attributes' => array(
            'required' => 'required',
        ),
        'default' => '',
        'type' => 'text_url',
    ) );

    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Tag',
        'id'   => 'tag',
        'attributes' => array(
            'required' => 'required',
        ),
        'before' => '<strong>Gif Tag</strong>',
        'type' => 'text',
    ) );
}

function cmb_before_row_cb($field_args, $field) {
?>
    <div class="gif_instructions">
        <p>Below you can view/edit any of the Gifs that are currently associated with this post. If you want to add another Gif, click the "Add Another Gif" button below.</p>
        <p>If you know the URL of the exact Gif you would like to add, you can paste that into the "Gif URL" input. If you would like to search for a gif, click "Add/Replace Gig" and use the Giphy search functionality to select your Gif.</p>
        <p><strong>Important:</strong> You must click <strong>Update</strong> in order to save your changes and see theme reflected on the site.</p>
        <hr />
    </div>
<?php
}

function cmb_after_row_cb($field_args, $field) {
?>
    <div class="gif_selector_pane">
        <button id="gif_pane_close_btn" type="button" class="close_button">x close</button>
        <label for="giphySearchTerm">Search for Gifs</label>
        <input type="text" id="giphySearchTerm" name="giphySearchTerm" />
        <button type="button" id="giphySearhButton" class="btn">Search / More Results</button>
        <span id="giphyLoading" style="display: none;">Loading ...</span>
        <span id="giphyResultsHeader"></span>
        <span id="giphyErrorMessage"></span>
        <ul class="search_results" id="giphySearchResults">

        </ul>
        <hr />
        <button type="button" id="saveGiphyUrl" class="btn">Select Gif</button>
    </div>
<?php
}

function cmb_after_url_input_cb($field_args, $field) {
?>
    <?php //if($field->value() != '') { ?>
        <strong>Preview</strong>
        <img class="gif_image" src="<?php echo $field->value() ?>" />
    <?php //} ?>
    <button class="open_giphy_search btn" type="button">Add/Replace Gif</button>
<?php
}
