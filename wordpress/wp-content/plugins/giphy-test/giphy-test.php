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
        'id'            => 'test_metabox',
        'title'         => __( 'Test Metabox', 'cmb2' ),
        'object_types'  => array( 'post', ), // Post type
        'context'       => 'normal',
        'remove_box_wrap' => true,
        'priority'      => 'high',
        'show_in_rest' => true,
        'show_names'    => false, // Show field names on the left
        'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // Keep the metabox closed by default
    ) );

    $group_field_id = $cmb->add_field( array(
        'id'          => 'post_gif',
        'type'        => 'group',
        'description' => __( 'Generates reusable form entries', 'cmb2' ),
        'after_group' => 'cmb_after_row_cb',
        // 'repeatable'  => false, // use false if you want non-repeatable group
        'options'     => array(
            'group_title'   => __( 'Gif {#}', 'cmb2' ), // since version 1.1.4, {#} gets replaced by row number
            'add_button'    => __( 'Add Another Gif', 'cmb2' ),
            'remove_button' => __( 'Remove Gif', 'cmb2' ),
            'sortable'      => true, // beta
        ),
    ) );

    // Id's for group's fields only need to be unique for the group. Prefix is not needed.
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Giphy URL',
        'id'   => 'url',
        'classes' => 'gif_url',
        'type' => 'text',
    ) );

    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Tag',
        'id'   => 'tag',
        'type' => 'text',
    ) );
}

function cmb_after_row_cb($field_args, $field) {
    ?>
    <ul>
        <li>https://media.giphy.com/media/xT9IgxKsLc9nFM7n32/giphy.gif</li>
        <li>https://media.giphy.com/media/xUOwFWpqNb7FAgfoZi/giphy.gif</li>
        <li>https://media.giphy.com/media/3ohc14t1TUi42R8lfW/giphy.gif</li>
        <li>https://media.giphy.com/media/3ohs4v2B6W1m9K349q/giphy.gif</li>
    </ul>
    <form>
        <input type="text" id="giphyurl" />
        <input type="submit" id="addgif" value="Add" />
    </form>
    <script>
        var emptyInput = 0;
        $('#addgif').on('click', function(e) {
            e.preventDefault();
            var inputvalue = $('#giphyurl').val();
            console.log(inputvalue);
            var inputString = '#post_gif_' + emptyInput + '_url';
            console.log('inputString =' + inputString);
            // $('#post_gif_'+emptyInput+'_url').val(inputvalue);
            $(inputString).val(inputvalue);
            emptyInput += 1;
            $('.cmb-add-group-row').click()
        })

        $(function() {
            console.log("About to find gif");
            $(".gif_url").find("input").each(function() {
                var gifurl = $(this).val();
                var img = $('<img class="gif_display">').attr('src', gifurl).insertAfter($(this));

            });
        });

    </script>
    <?php
}
