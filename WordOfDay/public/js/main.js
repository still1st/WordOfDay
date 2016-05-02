(function ($, document) {
    $(document).ready(function () {
        $('#rating-minus').click(function () {
            updateRaiting(false);
        });
        
        $('#rating-plus').click(function () {
            updateRaiting(true);
        });
        
        $('#set-favorite').click(function () {
            var element = $(this);
            $.get('words/favorite', getParameters(), function (data) {
                element.removeClass(data.favorite ? 'glyphicon-star-empty' : 'glyphicon-star');
                element.addClass(data.favorite ? 'glyphicon-star' : 'glyphicon-star-empty');
            }).fail(function () {
                console.error('fail');
            });
        });
    });
    
    function updateRaiting(increment) {
        var url = 'words/' + (increment ? 'plus' : 'minus');
        
        $.get(url, getParameters(), function (data) {
            $('#rating').text(data.rating);
        }).fail(function () {
            console.error('fail');
        });
    }
    
    function getParameters() {
        return { wordId: $('input#wordId').val() };
    }
})($, document);
