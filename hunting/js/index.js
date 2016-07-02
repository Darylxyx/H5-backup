;$(function() {
	
	function SubType() {
		// page1 需要添加动画DOM
		this.$page1Dom = $('.page1');
		this.$p1MainDom = this.$page1Dom.find('.page1-main');
		this.$p1StarDom = this.$page1Dom.find('.page1-star');
		this.$p1Letter1Dom = this.$page1Dom.find('.page1-letter1');
		this.$p1Letter2Dom = this.$page1Dom.find('.page1-letter2');
		this.$p1Cloud1Dom = this.$page1Dom.find('.page1-cloud1');
		this.$p1Cloud2Dom = this.$page1Dom.find('.page1-cloud2');
		this.$p1TextDom = this.$page1Dom.find('.page1-text');
		this.$p1DescDom = this.$page1Dom.find('.desc');
		// page2
		this.$page2Dom = $('.page2');
		this.$p2MainDom = this.$page2Dom.find('.page2-main');
		this.$p2StarDom = this.$page2Dom.find('.page2-star');
		this.$p2LocalDom = this.$page2Dom.find('.page2-local');
		this.$p2Cloud1Dom = this.$page2Dom.find('.page2-cloud1');
		this.$p2Cloud2Dom = this.$page2Dom.find('.page2-cloud2');
		this.$p2TitleDom = this.$page2Dom.find('.title');
		this.$p2DescDom = this.$page2Dom.find('.desc');

		// page3
		this.$page3Dom = $('.page3');
		this.$p3MainDom = this.$page3Dom.find('.page3-main');
		this.$p3StarDom = this.$page3Dom.find('.page3-star');
		this.$p3TitleDom = this.$page3Dom.find('.title');
		this.$p3DescDom = this.$page3Dom.find('.desc');

		// page4
		this.$page4Dom = $('.page4');
		this.$p4MainDom = this.$page4Dom.find('.page4-main');
		this.$p4StarDom = this.$page4Dom.find('.page4-star');
		this.$p4IconDom = this.$page4Dom.find('.page4-icon');
		this.$p4LetterDom = this.$page4Dom.find('.page4-letter');
		this.$p4TitleDom = this.$page4Dom.find('.title');
		this.$p4DescDom = this.$page4Dom.find('.desc');

		// page5
		this.$page5Dom = $('.page5');
		this.$p5MainDom = this.$page5Dom.find('.page5-main');
		this.$p5QRcodeDom = this.$page5Dom.find('.page5-QRcode');
		this.$p5TitleDom = this.$page5Dom.find('p');
		this.$p5PicDom = this.$page5Dom.find('.page5-pic');
	}

	SubType.prototype = {
		init: function() {

			this.addAnimation(0);

		},

		addAnimation: function(pageIndex) {

			switch (pageIndex) {
				case 0:
					this.$p1MainDom.addClass('scale-light');
					this.$p1StarDom.addClass('scale-heavy');
					this.$p1Letter1Dom.addClass('scale-heavy');
					this.$p1Letter2Dom.addClass('scale-heavy');
					this.$p1Cloud1Dom.addClass('p1-move-left');
					this.$p1Cloud2Dom.addClass('p1-move-right');
					this.$p1TextDom.addClass('fadeIn');
					this.$p1DescDom.addClass('fadeIn');
					break;
				case 1:
					this.$p2MainDom.addClass('scale-light');
					this.$p2StarDom.addClass('scale-light');
					this.$p2LocalDom.addClass('zoom');
					this.$p2Cloud1Dom.addClass('p2-move-left');
					this.$p2Cloud2Dom.addClass('p2-move-right');
					this.$p2TitleDom.addClass('zoom');
					this.$p2DescDom.addClass('fadeIn');
					break;
				case 2:
					this.$p3MainDom.addClass('scale-light');
					this.$p3StarDom.addClass('scale-heavy');
					this.$p3TitleDom.addClass('zoom');
					this.$p3DescDom.addClass('fadeIn');
					break;
				case 3:
					this.$p4MainDom.addClass('scale-light');
					this.$p4StarDom.addClass('scale-heavy');
					this.$p4LetterDom.addClass('zoom');
					this.$p4IconDom.addClass('scale-light');
					this.$p4TitleDom.addClass('zoom');
					this.$p4DescDom.addClass('fadeIn');
					break;
				case 4:
					this.$p5MainDom.addClass('zoom');
					this.$p5QRcodeDom.addClass('zoom');
					this.$p5TitleDom.addClass('zoom');
					this.$p5PicDom.addClass('move-top');
					break;
			}
		},

		removeAnimtaion: function(prevIndex) {

			switch (prevIndex) {
				case 0:
					this.$p1MainDom.removeClass('scale-light');
					this.$p1StarDom.removeClass('scale-heavy');
					this.$p1Letter1Dom.removeClass('scale-heavy');
					this.$p1Letter2Dom.removeClass('scale-heavy');
					this.$p1Cloud1Dom.removeClass('p1-move-left');
					this.$p1Cloud2Dom.removeClass('p1-move-right');
					this.$p1TextDom.removeClass('fadeIn');
					this.$p1DescDom.removeClass('fadeIn');
					break;
				case 1:
					this.$p2MainDom.removeClass('scale-light');
					this.$p2StarDom.removeClass('scale-light');
					this.$p2LocalDom.removeClass('zoom');
					this.$p2Cloud1Dom.removeClass('p2-move-left');
					this.$p2Cloud2Dom.removeClass('p2-move-right');
					this.$p2TitleDom.removeClass('zoom');
					this.$p2DescDom.removeClass('fadeIn');
					break;
				case 2:
					this.$p3MainDom.removeClass('scale-light');
					this.$p3StarDom.removeClass('scale-heavy');
					this.$p3TitleDom.removeClass('zoom');
					this.$p3DescDom.removeClass('fadeIn');
					break;
				case 3:
					this.$p4MainDom.removeClass('scale-light');
					this.$p4StarDom.removeClass('scale-heavy');
					this.$p4LetterDom.removeClass('zoom');
					this.$p4IconDom.removeClass('scale-light');
					this.$p4TitleDom.removeClass('zoom');
					this.$p4DescDom.removeClass('fadeIn');
					break;
				case 4:
					this.$p5MainDom.removeClass('zoom');
					this.$p5QRcodeDom.removeClass('zoom');
					this.$p5TitleDom.removeClass('zoom');
					this.$p5PicDom.removeClass('move-top');
					break;	
			}
		}
	};

	var superType = new SubType();
	superType.init();

	var mySwiper = new Swiper ('.swiper-container', {
		speed: 500,
	    direction: 'vertical',
	    onSlideChangeStart: function(swiper) {
	    	superType.addAnimation(swiper.activeIndex);
	    	superType.removeAnimtaion(swiper.previousIndex);
	    } 
	});

});