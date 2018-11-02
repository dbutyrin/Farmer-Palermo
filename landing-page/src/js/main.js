'use strict';

import '@babel/polyfill';
import 'dom4';
import $ from 'jquery';

$(document).ready(function () {
  $('.main-carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1
    // adaptiveHeight: true
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
    slidesToShow: 3
  });
});
