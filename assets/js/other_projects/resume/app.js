document.addEventListener("DOMContentLoaded", function(e) {

    // fix the item heights of all elements on an argued list to the height of the longest element.
    function equalizeItemHeight() {
        let max_height = -1
        text_items.each(function() {
             max_height = max_height > $(this).height() ? max_height : $(this).height();
        });

       text_items.each(function() {
            $(this).height(max_height);
       });
    };

    const prev = $('.carousel-control-prev');
    const next = $('.carousel-control-next');
    const double_carousel = $('.carousel');
    const text_carousel = $('#carousel2');

    prev.on('click', function(e) {
        e.preventDefault();
        // move the carousel itself.
        double_carousel.carousel('prev');
    });

    next.on('click', function(e) {
        e.preventDefault();
        // move the carousel itself.
        double_carousel.carousel('next');
    });

    const text_items = text_carousel.find('.carousel-item');
    equalizeItemHeight(text_items);
});
