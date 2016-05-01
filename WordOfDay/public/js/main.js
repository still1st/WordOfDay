(function ($, document) {
    $(document).ready(function () {
        $('#rating-minus').click(function () {
            updateRaiting(false);
        });

        $('#rating-plus').click(function () {
            updateRaiting(true);
        });
    });

    function updateRaiting(increment) {
        var parameters = { wordId: $('input#wordId').val() };
        var url = 'words/' + (increment ? 'plus' : 'minus');

        $.get(url, parameters, function (data) {
            $('#rating').text(data.rating);
        }).fail(function () {
            console.error('fail');
        });
    }
})($, document);
