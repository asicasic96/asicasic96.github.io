const slider = tns({
    container: '.carousel__inner',
    items: 1,
    speed: 3000,
    slideBy: 'page',
    arrows: false,
    autoplay: false,
    autoplayTimeout: 4000,
    nav: false,
    controls: false,
    navPosition: 'bottom',
    responsive: {
        992: {
            nav: false
        },
        320: {
            nav: true
        }
      }
});

document.querySelector('.prev').onclick = function () {
    slider.goTo('prev');
};

document.querySelector('.next').onclick = function () {
    slider.goTo('next');
};

$(document).ready(function(){
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.catalog__wrapper').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

     /*  $('.catalog-item__link').each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      }) */

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');
      
      //modal
      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });

      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      //VALID
      
      function valideForms(form){
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2,
            },
            tel: {
              required: true,
              minlength: 10
            }
          },
          messages: {
            name: {
              required: "Введите имя!",
              minlength: jQuery.validator.format("Введите больше {0} символов!")
            },
            tel: {
              required: "Введите номер телефона!",
              minlength: jQuery.validator.format("Не меньше {0} символов!")
            },
            email: {
              required: "Введите E-mail!",
              email: "Недопустимый E-mail"
            }
          }
        });
      }

      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');
      valideForms('#overlay form');
      

     /*  $('input[name=tel]').mask("+7 (999) 999-9999",{autoclear: false}); */
     $("#phone").mask("+7 (999) 999-9999");
     $("#phone-modal").mask("+7 (999) 999-9999");
     $("#phone-modal2").mask("+7 (999) 999-9999");

     //Отправка на маил
     $('form').submit(function(e) {
       e.preventDefault();
       $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
       }).done(function() {
         $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
       });
       return false;
     });

    //scroll
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $('a[href="#up"').on('click', function() {

      let href = $(this).attr('href');
  
      $('html, body').animate({
          scrollTop: $(href).offset().top
      });
      return false;
  });

  new WOW().init();

});