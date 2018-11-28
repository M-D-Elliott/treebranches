$('.carousel-control-prev').on('click', function(e) {
  e.preventDefault()
  $('.carousel').carousel('prev')
})

$('.carousel-control-next').on('click', function(e) {
  e.preventDefault()
  $('.carousel').carousel('next')
})
