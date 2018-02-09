(function( $ ) {
    "use strict";
    const GIF_PATH_BASE = 'http://api.giphy.com/v1/gifs/search?q='
    const GIF_API_ENDPOINT = '&api_key=1Xaw8cUM3O2Mgzocobw92q83EdANfQHW&limit=4&offset='

    // If Gif URL input value changes, update the image
    $("#post_gif_repeat").on("input", "input.cmb2-text-url", function() {
        var gifurl = $(this).val();
        $(this).parent().find('img').remove();
        if(gifurl != '') {
            var img = $('<img class="gif_display">').attr('src', gifurl).insertAfter($(this));
        }
    })

    // Open Giphy search pane and pass appropriate input element
    $('#cmb2-metabox-giphy_metabox').on('click', '.open_giphy_search', function(e) {
        $('.gif_selector_pane').show();
        var pane_visibility = $('.gif_selector_pane').offset();
        pane_visibility.top -= 100;
        $('html, body').animate({
            scrollTop: pane_visibility.top,
            scrollLeft: pane_visibility.left
        });
        var input = $(this).parent().children('input[type="text"]');
        gifSelector(input);
    })

    /* Function to create a selectable gif item, given the gif response object
     * and the search term
     */
    function createGifSelection(gifitem, tag) {
        var newListItem = $("<li>");
        $( "<img>" ).attr({
            src: gifitem.images.original.url,
            alt: tag,
        }).appendTo( newListItem );
        newListItem.appendTo( "#giphySearchResults" );
    }

    // Delete gif selections currently being shown
    function deleteGifSelections() {
        $( "#giphySearchResults" ).children('li').remove();
    }

    /* This function will take an input element and open the Gif selector pane.
     * After the user selects a gif, it will update the url input field and the
     * gif preview.
     */
    function gifSelector(input) {
        var offset = 0;
        var lastSearchTerm = '';
        var selectedURL = '';

        // Destroys all listeners after selection is made or the user exits
        function destroyListeners() {
            $('#gif_pane_close_btn').off('click');
            $('#giphySearhButton').off('click');
            $('#giphySearchResults').off("click", "li");
            $('#saveGiphyUrl').off('click');
        }

        // Listener for close button
        $('#gif_pane_close_btn').on('click', function(e) {
            $('.gif_selector_pane').hide();
            deleteGifSelections();
            offset = 0;
            selectedURL = '';
            lastSearchTerm = '';
            destroyListeners();
        })

        // On Search Enter
        $('#giphySearchTerm').keydown(function(e) {
            if(e.keyCode == 13) {
                e.preventDefault();
                getGifs();
                return false;
            }
        });

        // On Search Button Click
        $('#giphySearhButton').on('click', function(e) {
            e.preventDefault();
            $("#giphyErrorMessage").text("");
            getGifs();
        })

        // Make Results Clickable
        $('#giphySearchResults').on("click", "li", function() {
            var img = $(this).children('img');
            selectedURL = img.attr("src");;
            $('#giphySearchResults').children('li').removeClass('selected');
            $(this).toggleClass('selected');
        })

        // On Select Gif Cutton Click
        $('#saveGiphyUrl').on('click', function() {
            if(selectedURL !== '') {
                input.val(selectedURL);
                var img = input.parent().find('img');
                deleteGifSelections();
                img.attr('src', selectedURL);
                offset = 0;
                selectedURL = '';
                lastSearchTerm = '';
                $('.gif_selector_pane').hide();
                destroyListeners();
            } else {
                $("#giphyErrorMessage").text("Please click on a Gif above before selecting, or click the close button above to exit.");
            }
        })

        /* This function will take the search term from the appropriate input field
         * and make a get request to the Giphy API for the desired search terms.
         * It will then process the response and build the selectable gifs.
         */
        function getGifs() {
            var searchTerm = $('#giphySearchTerm').val();
            if(searchTerm !== '') {
                if(searchTerm !== lastSearchTerm) {
                    // If this is a new search term, reset paged results offset
                    offset = 0;
                }
                $("#giphyLoading").show();
                var jqxhr = $.getJSON( GIF_PATH_BASE + searchTerm + GIF_API_ENDPOINT + offset, function() {
                    console.log("Successful response from Giphy API");
                }).done(function(res) {
                    if(res.data.length == 0) {
                        // If response data is empty, show no results message
                        $("#giphyResultsHeader").text("There were no results for " + searchTerm);
                    }
                    deleteGifSelections();
                    $("#giphyLoading").hide();
                    $("#giphyResultsHeader").text("Showing results for " + searchTerm);
                    // Build results list
                    $.each(res.data, function(i, gifitem) {
                        createGifSelection(gifitem, searchTerm);
                    });
                    offset += 4;// Increment offset for next results
                    lastSearchTerm = searchTerm;
                }).fail(function() {
                    $("#giphyErrorMessage").text("There seems to have been an error with the Giphy API");
                    console.log( "Error in retrieving gifs from Giphy API" );
                });
            } else {
                $("#giphyErrorMessage").text("Please type something into the search box to find Gifs");
            }
        }
    }
})(jQuery);
