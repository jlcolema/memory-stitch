$(document).ready( function() {
  $(window).scroll(function() {
    if($(window).scrollTop() < 60) {
      $(".banner--clone").removeClass('banner--stick');
    } else {
      $(".banner--clone").addClass('banner--stick');
    }
  });
  
  // Dark Mode Button //
  $(".darkmode-btn").on("click", function() {
    if ( $("body").hasClass('darkmode') ) {
      $("body").removeClass('darkmode');
    } else {
      $("body").addClass('darkmode');
    }
  });
  
  // Custom Checkbox Functionality
  $(".checkbox-area input[type='checkbox']").click(function(){
    if($(this).prop("checked") == true){
      console.log("Checkbox is checked.");
      $(this).closest(".bold_option_element").addClass("is_checked");
    }
    else if($(this).prop("checked") == false){
      console.log("Checkbox is unchecked.");
      $(this).closest(".bold_option_element").removeClass("is_checked");
    }
  });
  
  
  // Low Minky Warning //
  
//   if (window.location.href.indexOf("/products/t-shirt-quilt") > -1) {
    
//     $("input[name=option-2]").on('click', function() {   
//       // Remove old messages
//       $('.message-container').remove();
      
//       if ( $(this).val() == 'Gray') {
//         var title = "<h2>Low Supply Warning</h2>";
// 		var bodytext = "One of the minky colors you've selected is one of our most popular colors. We may not have your minky color in stock when we receive your shirts. If this is the case, we will contact you once we receive your shirts for other options and an estimated date of delivery of our minky shipment if available. Please reach out to us at info@memorystitch.com or 855-792-4205 with any questions.";
//         var content = title + bodytext;
        
//       	$('<div/>', {
//             'class': 'message-container',
//             html: $('<div/>', {
//                 html: content
//             })
//         }).insertAfter('.swatch');
//       }
//     });     
//   }
  
  
  // Brand Slider //
  $(".brand_slider_main").slick({
    dots: false,
    infinite: true,
    arrows: true,
    pauseOnHover: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    responsive: [
       {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
           autoplay: false,
        }
      },
      {
        breakpoint: 501,
        settings: {
          slidesToShow: 1,

        }
      }
    ]

  });

  
  // Make the thumbnails work again
//   $(".template-product .swatch-element input[name='option-2']").on('change', function() {
    
//     console.log( $(this).val() );
//     $("#SingleOptionSelector-2").change();
//   })
});

jQuery(document).ready(function(){
  $(".menu_div").click(function(){
    $(".toplmenu").hide();
    $(".toplmenu1").show();
    $(".mobilemenu").css('left','0px');
    $(".mobilemenu").fadeIn(500);
  });
  $(".menu_icn").click(function(){
    $(".toplmenu").show();
    $(".toplmenu1").hide();
    $(".mobilemenu").fadeOut(600);
  });
});

$(".our_values_slider").slick({
  infinite: true,
  dots: false,
  arrows: true,
  autoplay: true,
  pauseOnHover: false,
  autoplaySpeed: 4000,
  adaptiveHeight: true,
});



$(".happy_customera_main").slick({
  dots: false,
  infinite: true,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

function showds(para) {
  $('#tab'+para).slideToggle('1000');
  //$('#q'+para +' '+'i').toggleClass("ion-android-remove");

  if($('#q'+para +' '+'i').hasClass('fa-angle-down')){
    $('#q'+para +' '+'i').addClass("fa-angle-up");
    $('#q'+para +' '+'i').removeClass("fa-angle-down");
  } else {
    $('#q'+para +' '+'i').addClass("fa-angle-down");
    $('#q'+para +' '+'i').removeClass("fa-angle-up");
  }
}

$("#write_reviews").click(function() {
  $('html, body').animate({
    scrollTop: $("#review_div").offset().top
  }, 2000);
});


