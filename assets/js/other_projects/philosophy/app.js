// takes an image, checks its "brightness" and uses it to select a
// white or black color of elements supplied in a list.
function invertToBG(elements, img_SRC) {
    getImageBrightness(img_SRC, function(brightness){
        if (brightness > 122) {
            $.each(elements, function() {
                this.addClass("black");
            })
        } else {
            $.each(elements, function(element) {
                this.removeClass("black");
            })
        };
    });
};

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

    const proof_titles = $('#proof-titles');
    const proof_list = $('#proof-list');
    const all_proofs = proof_list.children();
    const scrollTo = $('#active-proof');

    proof_titles.on('click', function(e, scroll_down) {
        e.preventDefault();
        const target = $(e.target);
        if (target.is('a')){
            const title = target.text();
            const selected_proof = proof_list.children("[title='" + title + "']");
            const last_target = proof_titles.find('div');
            if (selected_proof.length) {
                last_target.replaceWith('<a href=#>' + last_target.text() + '</a>');
                target.replaceWith('<div class="inactive">' + title + '</div>');
                all_proofs.hide();
                selected_proof.show("slow");
                $("html, body").animate({ scrollTop: $(document).height() - scrollTo.height() - 100 }, "slow");
            } else {
                console.error('Title in list does not match hidden elements');
            };
        };
    });

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

    // inverts colors of carousel buttons based on current image background.
    // uses slid.bs.carousel to do this AFTER the transition, which is key.
    img_carousel.on('slid.bs.carousel', function (){
        // re color the carousel buttons.
        img_SRC = $('.carousel-item.active img').attr('src');
        elements = [prev_icon, next_icon];
        invertToBG(elements, img_SRC);
    });


    $(window).resize(function() {
        equalizeItemHeight(text_items);
    });

    equalizeItemHeight(text_items);
});
