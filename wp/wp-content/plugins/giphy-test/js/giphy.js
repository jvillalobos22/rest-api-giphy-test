(function( $ ) {
    "use strict";
    const GIF_PATH_BASE = 'http://api.giphy.com/v1/gifs/search?q='
    const GIF_API_ENDPOINT = '&api_key=1Xaw8cUM3O2Mgzocobw92q83EdANfQHW&limit=4&offset='

    var emptyInput = 0;
    $('#addgif').on('click', function(e) {
        e.preventDefault();
        var inputvalue = $('#giphyurl').val();
        console.log(inputvalue);
        var inputString = '#post_gif_' + emptyInput + '_url';
        console.log('inputString =' + inputString);
        $(inputString).val(inputvalue);
        emptyInput += 1;
        $('.cmb-add-group-row').click()
    })

    $("#post_gif_repeat").on("input", "input.cmb2-text-url", function() {
        var gifurl = $(this).val();
        $(this).parent().find('img').remove();
        if(gifurl != '') {
            var img = $('<img class="gif_display">').attr('src', gifurl).insertAfter($(this));
        }
    })


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



    function createGifSelection(gifitem, tag) {
        var newListItem = $("<li>");
        $( "<img>" ).attr({
            src: gifitem.images.original.url,
            alt: tag,
        }).appendTo( newListItem );
        newListItem.appendTo( "#giphySearchResults" );
        console.log(gifitem.images.original.url);
    }

    function deleteGifSelections() {
        $( "#giphySearchResults" ).children('li').remove();
    }

    function gifSelector(input) {
        var offset = 0;
        var lastSearchTerm = '';
        var selectedURL = '';

        function destroyListeners() {
            $('#gif_pane_close_btn').off('click');
            // $('#giphySearchTerm').keydown(f
            $('#giphySearhButton').off('click');
            $('#giphySearchResults').off("click", "li");
            $('#saveGiphyUrl').off('click');
        }

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
            var url = img.attr("src");
            var tag = img.attr("alt");
            // console.log("url = " + url);
            // console.log("tag = " + tag);
            selectedURL = url;
            $('#giphySearchResults').children('li').removeClass('selected');
            $(this).toggleClass('selected');
            console.log("selectedURL = " + selectedURL);
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

        function getGifs() {
            var searchTerm = $('#giphySearchTerm').val();
            if(searchTerm !== '') {
                if(searchTerm !== lastSearchTerm) {
                    offset = 0;
                    console.log("newSearchTerm");
                }
                $("#giphyLoading").show();
                var jqxhr = $.getJSON( GIF_PATH_BASE + searchTerm + GIF_API_ENDPOINT + offset, function() {
                    console.log("success");
                }).done(function(res) {
                    console.log(res.data.length);
                    if(res.data.length == 0) {
                        $("#giphyResultsHeader").text("There were no results for " + searchTerm);
                    }
                    deleteGifSelections();
                    $("#giphyLoading").hide();
                    $("#giphyResultsHeader").text("Showing results for " + searchTerm);
                    $.each(res.data, function(i, gifitem) {
                        console.log("gifitem " + i);
                        createGifSelection(gifitem, searchTerm);
                    });
                    console.log("offset = " + offset);
                    offset += 4;
                    lastSearchTerm = searchTerm;
                }).fail(function() {
                    $("#giphyErrorMessage").text("There seems to have been an error with the Giphy API");
                    console.log( "error" );
                });
            } else {
                $("#giphyErrorMessage").text("Please type something into the search box to find Gifs");
            }
        }
    }
})(jQuery);
