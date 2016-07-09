/* jshint devel:true */
window.onload = function () {

  var resourceUrl = 'https://dn-c360-activity.qbox.me/';

  //微信分享
  // window.PGCommon.ready(function (interfaces) {

  //   var defaultParam = {
  //     staticts: "/robTickets/NewZipai/Zipai",//统计接口必传
  //     interfaces: interfaces,//ready回调参数必传
  //     imgUrl: resourceUrl + 'shareImg.jpg',
  //     title: '感觉整个人都不好了',
  //     desc: '99%的人都这么用手机！看了吓一跳！！！'
  //   };
  //   window.PGCommon.defaultConfig(defaultParam);
  //   window.PGCommon.shareConfig();
  // });

  //平台检测
  var versions = (function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    var obj = {
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      weixin: u.indexOf('MicroMessenger') > -1 //是否微信 （2015-01-22新增）
    };

    if (obj.weixin) {
        window.platForm = 'weixin';
    } else {
        if (obj.ios) {
            window.platForm = 'ios';
        } else if (obj.android) {
            window.platForm = 'android';
        }
    }

    return obj;

  })();

  var cy = {};

  cy.turnPage = function (pageIndex) {

    var i, max = pageArr.length;

    for (i = 0; i < max; i++) {
      if (i == pageIndex) {
        pageArr[i].removeClass('hide');
      } else {
        pageArr[i].addClass('hide');
      }
    }
  };

  cy.checkFrom = function () {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  };

//   cy.statistics = function (type, callback) {
//     type = 'DoubleNinth_' + type + '_' + platForm;

//     var statisticalParam = {
//       'type': type
//     };

//     console.log(statisticalParam);

//     server.download(statisticalParam, "/robTickets/NewZipai/Zipai", function (res) {
// //            alert(JSON.stringify(res));
//       if (res.status == 200) {
//         //统计成功
//       }
//       callback();
//     })
//   };

//    cy.wxShare = function() {
//
//    };

  cy.getCookies = function () {

    var arr = document.cookie.split(';'),
      cookieInfo = {};

    for (var i = 0; i < arr.length; i++) {
      var tmpArr = arr[i].split('=');
      cookieInfo[tmpArr[0]] = tmpArr[1];
    }

    cookieInfo.headimgurl = decodeURIComponent(cookieInfo[" headimgurl"]);
    cookieInfo.nickname = decodeURIComponent(cookieInfo[" nickname"]);
    cookieInfo.openid = cookieInfo[" openid"];

    return cookieInfo;

  };

  cy.showPage_0 = function () {

    this.turnPage(1);

    var _this = this;

    $('#look').click(function () {

      $('#wantLook').addClass('hide');

      _this.showPage_1();
    });

  };

  cy.showPage_1 = function () { //主界面

    audio.begin.play();

    this.turnPage(1);

    var mailRed = $('#mail'),
      phoneRed = $('#ftPhone'),
      mailNum = 0,
      phoneNum = 1;

    var intervalObj1 = window.setInterval(function () {
      mailNum += 2;
      mailRed.animate({zoom: '1.1'}, 50);
      mailRed.html(mailNum);

      mailRed.animate({zoom: '1'}, 50);

      if (mailNum >= 50) {
        window.clearInterval(intervalObj1);
      }
    }, 100);

    var _this = this;

//        window.setTimeout(function() {

    var intervalObj2 = window.setInterval(function () {
      phoneNum += 4;
      phoneRed.html(phoneNum);
      phoneRed.animate({zoom: '1.1'}, 50);
      phoneRed.animate({zoom: '1'}, 50);

      if (phoneNum >= 111) {

        window.clearInterval(intervalObj2);

        _this.showPage_2();
      }

    }, 100);

//        },300);
  };
  cy.showPage_2 = function () { //短信提示界面

    audio.begin.pause();
    audio.begin.load();

    pageArr[2].removeClass('hide');

    var alertI = 1,
      message = resourceUrl + 'page2-alert_';

    var _this = this;

    $('#page2-close').click(function () {

      audio.message.play();

      audio.begin.pause();

      pageArr[2].addClass('hide');

      alertI++;

      if (alertI >= 4) {

        _this.showPage_3();
        return;
      }

      $('#page2-message').attr('src', message + alertI + '.png');

      window.setTimeout(function () {
        pageArr[2].removeClass('hide');
      }, 600);
    })
  };

  cy.showPage_3 = function () { //弹框乱弹界面

    this.turnPage(3);

    audio.begin.play();

    var alertArr = $('.page3-alert');

    var _this = this;

    alertArr.each(function (index, item) {

      $(item).delay(300 * (index + 1)).fadeIn(200, function () {
        if (index == alertArr.length - 1) {

          pageArr[3].delay(1000).fadeOut(1000, function () {

            audio.begin.pause();
            audio.begin = null;

            _this.showPage_4();

          });
        }
      });
    })
  };

  cy.showPage_4 = function () { //文字渐现界面

    var _this = this;

    pageArr[4].fadeIn(1000, function () {

      _this.turnPage(4);

      $('.page4-text1').delay(500).fadeIn(1000);
      $('.page4-text2').delay(2000).fadeIn(1000);
      $('.page4-text3').delay(3500).fadeIn(1000, function () {
        pageArr[4].fadeOut(1000, function () {
          pageArr[4].addClass('hide');
          _this.showPage_5();
        });
      });
    });
  };

  cy.showPage_5 = function () { //提示微信信息界面

    this.turnPage(5);
    pageArr[1].removeClass('hide');

    var timeOut;
    window.clearTimeout(timeOut);

    var _this = this;

    $('#page5-close').click(function () {

      audio.message.play();

      pageArr[5].addClass('hide');

      timeOut = window.setTimeout(function () {
        _this.showPage_5();
      }, 1000);

    });

    $('#page5-open').click(function () {

      audio.message.play();

      _this.showPage_6();
    });
  };

  cy.showPage_6 = function () { //微信聊天界面

    this.turnPage(6);

//        alert(typeof this.getCookies().headimgurl);

    var defaultHead = resourceUrl + 'headImg.jpg',
      wxHead = this.getCookies().headimgurl,
      headImgUrl = versions.weixin ? ((wxHead == 'undefined' || wxHead == undefined) ? defaultHead : wxHead) : defaultHead;

//        alert(headImgUrl);

    $('#myHeadImg').css('backgroundImage', 'url(' + headImgUrl + ')');

    var messageArr = $('.page6-message');

    var _this = this;

    messageArr.each(function (index, item) {
      $(item).delay(2000 * index).fadeIn(100, function () {


         $('.page6').scrollTop($('.page6').height());

        if (index == messageArr.length - 1) {
          window.setTimeout(function () {

            $('.page6-alert-content').removeClass('hide');

            $('#closeWX').click(function () {
              _this.showPage_7();
            });

          }, 3000)
        }
      })
    });
  };

  cy.showPage_7 = function () { //来电界面

    this.turnPage(7);

    audio.bell.play();

    var _this = this;

    $('#answer').click(function () {

      audio.bell.pause();
      audio.bell = null;

      _this.showPage_8();
    })
  };

  cy.showPage_8 = function () { //通话界面

    this.turnPage(8);

    audio.mom.play();

    var _this = this;

    $('#hangUp').click(function () {
      audio.mom.pause();
      _this.showPage_9();
    });

    var intervalObj = window.setInterval(function () {

      if (audio.mom.ended == true) {
        window.clearInterval(intervalObj);
        _this.showPage_9();
      }

    }, 500)
  };

  cy.showPage_9 = function () { //滑动页

    var _this = this;

    pageArr[8].addClass('hide');

    audio.ending.play();

    pageArr[9].fadeIn(1000, function () {

          _this.turnPage(9);

          $('.page9-text1').delay(500).fadeIn(1000);
          $('.page9-text2').delay(2500).fadeIn(1000);
          $('.arrow').delay(4500).fadeIn(1000, function () {

              var container = document.getElementById('slipPage');
              var pages = document.querySelectorAll('.roll-page');
              var slip = Slip(container, 'y').webapp(pages);

              slip.end(function () {

                  window.setTimeout(function () {
                      $('.roll-page').css('opacity', 1);
                  }, 500);

              })
          });
      });

    function linkCamera360() {

      // cy.statistics('camera360', function() {
          if (versions.weixin) {

              window.location.href = 'http://um0.cn/2qcv91';

          } else {

              if (versions.android) { //案桌
                  window.location.href = 'https://s3.cn-north-1.amazonaws.com.cn/pg-fe/other/Camera360_v7.0.2_%E9%87%8D%E9%98%B3%E8%8A%82_1444458788067702.apk';
              } else { //IOS及其他
                  window.location.href = 'http://um0.cn/2qcv91';
              }

          }
      // });
    }

    function linkChubao() {
      // cy.statistics('chubao', function() {
          window.location.href = 'http://www.chubao.cn/s/20151014hb/index.html';
      // });
    }

    $('.C360-btn').click(linkCamera360);

    $('.chubao-btn').click(linkChubao);

    $('.wx-btn1').click(linkChubao);

    $('.wx-btn2').click(linkCamera360);

  };

  (function initial() {

    // cy.statistics('pv');

    window.pageArr = [
      $('.page0'),
      $('.page1'),
      $('.page2'),
      $('.page3'),
      $('.page4'),
      $('.page5'),
      $('.page6'),
      $('.page7'),
      $('.page8'),
      $('.page9'),
      $('.load-page')
    ];

    window.audio = {};
    audio.begin = document.getElementById('begin');
    audio.message = document.getElementById('message');
    audio.bell = document.getElementById('bell');
    audio.mom = document.getElementById('mom');
    audio.ending = document.getElementById('ending');

    var checkedPage = (function () {

      if (versions.weixin) {
        return $('.WX-page');
      } else {
        var fromTo = cy.checkFrom()['fromTo'];
        //            console.log(fromTo);
        if (fromTo == 'Camera360') {
          return $('.C360-page');
        } else if (fromTo == 'chubao') {
          return $('.chubao-page');
        } else {
          return $('.WX-page');
        }
      }
    })();

    console.log(checkedPage);

    checkedPage = checkedPage || $('.WX-page');

    checkedPage.removeClass('hide').addClass('roll-page');

//        cy.wxShare();

    cy.showPage_0();

  })();
};
