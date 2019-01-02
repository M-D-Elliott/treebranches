$.fn.makeVisibleClone = function() {
    clone = $($(this).clone());
    clone
        .appendTo($(this).parent())
        .css({
            'display': 'block',
            'position': 'absolute',
            'right': '9999px'
             });
    return clone;
};

// finds the total height of all of an element's children.
$.fn.heightOfChildren = function() {
    let height = 0;
    visible_object = $(this).makeVisibleClone();
    visible_object.children().each(function(i, item) {
        height += $(item).height();
    });
    visible_object.remove();
    return height;
};


// fix the item heights of all elements on an argued list to the height of the element with the tallest children.
function equalizeItemHeight(elements) {
    let max_height = -1
    elements.each(function() {
        max_height = max_height > $(this).heightOfChildren() ? max_height : $(this).heightOfChildren();
    });
    elements.each(function() {
        $(this).height(max_height + 10);
    });
};

document.addEventListener("DOMContentLoaded", function(e) {

    const double_carousel = $('#carousel1, #carousel2');
    const img_carousel = $('#carousel1');
    const prev_icon = img_carousel.find('.carousel-control-prev-icon');
    const next_icon = img_carousel.find('.carousel-control-next-icon');
    const text_items = $('#carousel2').find('.carousel-item');

    // control the prev and next features of the carousel.
    $('.carousel-control-prev').on('click', function(e) {
        e.preventDefault();
        // move the carousel itself.
        double_carousel.carousel('prev');
    });

    $('.carousel-control-next').on('click', function(e) {
        e.preventDefault();
        double_carousel.carousel('next');
        const target = $(e.target);
        target.next();
    });

    $(window).resize(function() {
        equalizeItemHeight(text_items);
    });

    equalizeItemHeight(text_items);

});