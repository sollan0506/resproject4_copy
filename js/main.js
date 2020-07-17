$(function(){

  var gnb = $('.gnb');

  // toggle 버튼 클릭시
  $('.navi-toggle').click(function(){
    gnb.addClass('toggle');
    gnb.slideToggle();

    event.preventDefault();
  });
  
  // 화면 크기가 변경될 때
  $(window).resize(function() {
    // gnb가 펼쳐져 있는 상태라면
    if(gnb.hasClass('toggle')){
      gnb.hide();                         //gnb 숨기기
      gnb.removeClass('toggle');    //접힌 상태 만들기
    }
    // 화면 사이즈가 767이하이고 접혀져 있는 상태라면
    if(window.matchMedia('(max-width: 767px)').matches && !gnb.hasClass('toggle')){
      gnb.hide(); //gnb를 숨겨서 toggle 버튼만 보이게 함
    } else { //767이상이거나 펼쳐져 있는 상태라면
      gnb.show(); //gnb 보여주기
    }
  });

  // gnb 메뉴 클릭시 gnb 접히기
  $('.gnb li a').click(function(){
    // 화면 사이즈가 767이하이고 펼쳐져 있는 상태라면
    if(window.matchMedia('(max-width: 767px)').matches && gnb.hasClass('toggle')){
      gnb.slideUp();
    }
    
    event.preventDefault();
  });


  // 상단 네비게이션 설정
  $(window).scroll(function(){
    var scrollPos = $(window).scrollTop();
    // console.log(scrollPos);

    if(scrollPos>20){
      $('#navi').addClass('fixed');
    }else {
      $('#navi').removeClass('fixed');
    }

    // top-btn 보이기/숨기기
    if(scrollPos>300){
      $('.top-btn').css('display', 'block');
    }else {
      $('.top-btn').css('display', 'none');
    }

    // scrollSpy
    var navHeight = $('#navi').height();
    var introHeight = $('#intro').height() - navHeight;
    var aboutEnd = introHeight + $('#about').height();
    var servicesEnd = aboutEnd + $('#services').height();
    var portfolioEnd = servicesEnd + $('#portfolio').height();
    var featuresEnd = portfolioEnd + $('#count').height() + $('#features').height();
    var teamEnd = featuresEnd + $('#team').height();
    var pricingEnd = teamEnd + $('#maxim').height() + $('#pricing').height();
    
    if( scrollPos >= 0 && scrollPos <= introHeight ){
      scrollspy('#intro');
    } else if( scrollPos > introHeight && scrollPos <= aboutEnd ) {
      scrollspy('#about');
    } else if( scrollPos > aboutEnd && scrollPos <= servicesEnd ) {
      scrollspy('#services');
    } else if( scrollPos > servicesEnd && scrollPos <= portfolioEnd ) {
      scrollspy('#portfolio');
    } else if( scrollPos > portfolioEnd && scrollPos <= featuresEnd ) {
      scrollspy('#features');
    } else if( scrollPos > featuresEnd && scrollPos <= teamEnd ) {
      scrollspy('#team');
    } else if( scrollPos > teamEnd && scrollPos <= pricingEnd ) {
      scrollspy('#pricing');
    } else if( scrollPos > pricingEnd) {
      scrollspy('#contact');
    }

  });


  // 상단 네비게이션 스크롤이동 설정
  var menuItem = $('.gnb li a, #navi h1 a, .top-btn');

  menuItem.click(function(){
    var el = $(this).attr('href');  //ex) #about
    var elWrap = $(el);           //ex) $('#about')
    
    scrollMove(elWrap, 46);

    // scrollspy
    scrollspy(el);
  });

  // 부드러운 이동 함수 만들기
  function scrollMove(elWrap, navHeight){
    var offset = elWrap.offset().top; //위로부터 얼만큼 떨어져 있는지
    var totalScroll = offset - navHeight; //navi의 높이만큼 빼기
    $('html, body').animate({scrollTop: totalScroll}, 800);
  }


  // scrollspy
  scrollspy('#intro');
  function scrollspy(el){
    $('.gnb li a').css('color','#fff'); //초기화
    $('.gnb li').removeClass('active'); //초기화

    $(".gnb li a[href=" + el + "]").css('color', "#f00");
    $(".gnb li a[href=" + el + "]").parent().addClass('active');
  }


  // intro 슬라이더
  var indexPrev = 3;
  var indexNext = 1;

  $('.prev').click(function(){
    moveSliderPrev();
  });
  $('.next').click(function(){
    moveSliderNext();
  });

  function moveSliderNext(){
    indexNext++;

    if(indexNext === 1) {   
      // 첫번째 슬라이드 보이게 하기
      $('.slides').find('.slide-item:nth-child(1)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동
      $('.slides').find('.slide-item:nth-child(2)').css('left', $('.slides').width()); //다음 슬라이드
      $('.slides').find('.slide-item:nth-child(3)').animate({
        'left': -$('.slides').width()
      }, 400); //이전 슬라이드

      // pager 셋팅
      $('.indicator').removeClass('active');
      $('.indicator:first-child').addClass('active');

      indexPrev = 3;

    } else if(indexNext === 2){
      // 두번째 슬라이드 보이게 하기
      $('.slides').find('.slide-item:nth-child(1)').animate({
        'left': -$('.slides').width()
      }, 400); //이전 슬라이드
      $('.slides').find('.slide-item:nth-child(2)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동
      $('.slides').find('.slide-item:nth-child(3)').css('left', $('.slides').width()); //다음 슬라이드
      
      // pager 셋팅
      $('.indicator').removeClass('active');
      $('.indicator:nth-child(2)').addClass('active');

      indexPrev = 1;

    } else if(indexNext === 3){
      // 세번째 슬라이드 보이게 하기
      $('.slides').find('.slide-item:nth-child(1)').css('left', $('.slides').width()); //다음 슬라이드
      $('.slides').find('.slide-item:nth-child(2)').animate({
        'left': -$('.slides').width()
      }, 400); //이전 슬라이드
      $('.slides').find('.slide-item:nth-child(3)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동

      // pager 셋팅
      $('.indicator').removeClass('active');
      $('.indicator:nth-child(3)').addClass('active');

      indexNext = 0;
      indexPrev = 2;
    }
  }

  function moveSliderPrev(){
    if(indexPrev === 1) {
      // 첫번째 슬라이드 보이게 하기
      $('.slides').find('.slide-item:nth-child(1)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동
      $('.slides').find('.slide-item:nth-child(2)').animate({
        'left': $('.slides').width()
      }, 400); //다음 슬라이드
      $('.slides').find('.slide-item:nth-child(3)').css('left', -$('.slides').width()); //이전 슬라이드

      // pager 셋팅
      $('.indicator').removeClass('active');
      $('.indicator:first-child').addClass('active');

      indexPrev = 4;
      indexNext = 1;

    } else if(indexPrev === 2){
      // 두번째 슬라이드 보이게 하기
      $('.slides').find('.slide-item:nth-child(1)').css('left', -$('.slides').width()); //이전 슬라이드
      $('.slides').find('.slide-item:nth-child(2)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동
      $('.slides').find('.slide-item:nth-child(3)').animate({
        'left': $('.slides').width()
      }, 400); //다음 슬라이드

      // pager 셋팅
      $('.indicator').removeClass('active');
      $('.indicator:nth-child(2)').addClass('active');

      indexNext = 2;

    } else if(indexPrev === 3){
      // 세번째 슬라이드 보이게 하기
      $('.slides').find('.slide-item:nth-child(1)').animate({
        'left': $('.slides').width()
      }, 400); //다음 슬라이드
      $('.slides').find('.slide-item:nth-child(2)').css('left', -$('.slides').width()); //이전 슬라이드
      $('.slides').find('.slide-item:nth-child(3)').css('left', -$('.slides').width()); //먼저 3번 슬라이드를 이전 슬라이드 위치에 붙여놓음
      $('.slides').find('.slide-item:nth-child(3)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동

      // pager 셋팅
      $('.indicator').removeClass('active');
      $('.indicator:nth-child(3)').addClass('active');

      indexNext = 0;

    }
    
    indexPrev--;
  }

  //함수 자동 실행, 정지
  var Timer;
  $('.slider').hover(
    function(){
      clearInterval(Timer);
    },
    function () {
      Timer = setInterval(moveSliderNext, 3000);
    }
  );



  // maxim 슬라이더
  var maximSlider = $('#maxim ul');
  var index = 1;

  function moveMaximSlider(){
    index++;

    if(index === 1) {   
      // 첫번째 슬라이드 보이게 하기
      maximSlider.find('li:nth-child(1)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동
      maximSlider.find('li:nth-child(2)').css('left', maximSlider.width()); //다음 슬라이드
      maximSlider.find('li:nth-child(3)').animate({
        'left': -maximSlider.width()
      }, 400); //이전 슬라이드

    } else if(index === 2){
      // 두번째 슬라이드 보이게 하기
      maximSlider.find('li:nth-child(1)').animate({
        'left': -maximSlider.width()
      }, 400); //이전 슬라이드
      maximSlider.find('li:nth-child(2)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동
      maximSlider.find('li:nth-child(3)').css('left', maximSlider.width()); //다음 슬라이드

    } else if(index === 3){
      // 세번째 슬라이드 보이게 하기
      maximSlider.find('li:nth-child(1)').css('left', maximSlider.width()); //다음 슬라이드
      maximSlider.find('li:nth-child(2)').animate({
        'left': -maximSlider.width()
      }, 400); //이전 슬라이드
      maximSlider.find('li:nth-child(3)').animate({
        'left': 0
      }, 400); //가운데 보여지는 부분으로 이동

      index = 0;
    }
  }

  //함수 자동 실행, 정지
  var maximTimer = setInterval(moveMaximSlider, 3000);
  maximSlider.hover(
    function(){
      clearInterval(maximTimer);
    },
    function () {
      maximTimer = setInterval(moveMaximSlider, 3000);
    }
  );


  // gmenu JS
  var gMenu = $('.gmenu li a');

  gMenu.click(function(){
    gMenu.removeClass('menu-act');
    $(this).addClass('menu-act');

    $('.gallery-item').hide(); //초기화

    switch ($(this).attr('id')){
      case 'gmenu1' :
        $('.gallery-item').fadeIn();  
        break;
      case 'gmenu2' :
        $('.g1').fadeIn();
        break;
      case 'gmenu3' :
        $('.g2').fadeIn();
        break;
      case 'gmenu4' :
        $('.g3').fadeIn();
        break;
      case 'gmenu5' :
        $('.g4').fadeIn();
        break;
    }

    event.preventDefault();
  });


  // Gallery Setting
  

  // portfolio caption hover
  $('#portfolio .gallery .gallery-item').hover(
      function(){
        $(this).children('.caption').animate({'opacity': 1}, 400);
      },
      function (){
        $(this).children('.caption').animate({'opacity': 0}, 400);
      }
    );


  // features icon hover
  $('#features .features-wrap').hover(
    function(){
      $(this).children('div').css('background-color', '#ea586f');
      $(this).children('div').children('i').css('color', '#fff');
    },
    function(){
      $(this).children('div').css('background-color', '#fff');
      $(this).children('div').children('i').css('color', '#ea586f');
    });


  // team hover
  $('#team .team-wrap').hover(
    function(){
      $(this).children('.caption').animate({'opacity': 1}, 400);
    },
    function(){
      $(this).children('.caption').animate({'opacity': 0}, 400);
    }
  );

});