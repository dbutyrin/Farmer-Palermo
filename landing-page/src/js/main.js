'use strict';

import '@babel/polyfill';
import 'dom4';
import $ from 'jquery';

$(document).ready(function () {
  $('.main-carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  });

  $('.about-carousel').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1
  });

  $('.reviews-carousel').slick({
    dots: true,
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1680,
        settings: {
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          slidesToShow: 1
        }
      }
    ]
  });
});
