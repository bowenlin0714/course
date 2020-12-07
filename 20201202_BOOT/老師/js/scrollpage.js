$('.navbar-brand,#main_menu a[href^="#"],#go_top_page a').on('click', function (e) {
  // js
  // let $target = $(this.getAttribute('href'))
  // jQ
  let $target = $($(this).attr('href'))
  if ($target.length) {
    e.preventDefault()
    $('html,body').stop().animate(
      {
        scrollTop: $target.offset().top
      },
      {
        duration: 2000,
        easing: 'easeInOutBack'
      }
    )
  }
})
