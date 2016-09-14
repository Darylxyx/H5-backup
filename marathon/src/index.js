import './main.css';
import $ from 'jquery';

function SubType() {
	this.$pageArr = $('.page');
	this.$popArr = $('.pop');
	this.$shareBtnArr = $('.share-btn');
	
	// root
	this.$rootPage = $('.page-root');
	this.$downloadBar = $('.download-bar');
	this.$ruleBtn = this.$rootPage.find('.root-rule');
	this.$beginBtn = this.$rootPage.find('.root-begin');
	this.$rankBtn = this.$rootPage.find('.root-rank');
	this.$rootPagePop = this.$rootPage.find('.pop');
	this.$rootPopShare = this.$rootPagePop.eq(0);
	this.$rootPopEnd = this.$rootPagePop.eq(1);
	this.$rootPopRule = this.$rootPagePop.eq(2);
	this.$rootPopRank = this.$rootPagePop.eq(3);
	this.$rootRankList = this.$rootPopRank.find('ul');

	// answer
	this.$answerPage = $('.page-answer');
	this.$askBoard = this.$answerPage.find('.ask-board');
	this.$askText = this.$answerPage.find('p');
	this.$answerOptions = this.$answerPage.find('.answer-group li');

	// result
	this.$resultPage = $('.page-result');
	this.$answerPage = this.$resultPage.find('.pop');
	this.$score = this.$resultPage.find('.score-board p');
	this.$fightBtn = this.$resultPage.find('.fight');
	this.$onemoreBtn = this.$resultPage.find('.onemore');
	this.$resultRankList = this.$resultPage.find('.range-area ul');
	this.$resultPagePop = this.$resultPage.find('.pop');
	this.$resultPopShare = this.$resultPagePop.eq(0);
	this.$resultPopEnd = this.$resultPagePop.eq(1);
	this.$resultPopOmg = this.$resultPagePop.eq(2);

	this.askNo = 0;
	this.correctCount = 0;
	this.host = window.location.href.indexOf('h5.kankanapp.com.cn') > -1 ? 'https://prod-api.kankanapp.com.cn' : 'http://stage.pub.hzvb.kankanapp.com.cn';
}

SubType.prototype = {

	init() {
		const params = this.getQuery();
		this.userId = params['uId'];
		this.token = params['token'];
		this.versions = (function() {
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
	            isTanqu: u.indexOf('tanqu') > 0,
				isMobile: u.match(/AppleWebKit.*Mobile.*/)
	        };
		})();
		this.handleRootEvent();
	},

	handleRootEvent() {
		// root
		this.$ruleBtn.on('click', () => {
			this.$rootPopRule.show();
		});

		this.$rankBtn.on('click', () => {
			this.checkRank();
		});
		
		this.$popArr.on('click', () => {
			this.$popArr.hide();
		});

		if (this.versions.isTanqu) {
			this.$downloadBar.show();
			this.$rootPage.css('marginTop', '16%');
			this.$beginBtn.on('click', () => {
				window.location.href = 'http://g06.channel.tanqu.com.cn/';
			});
			return;
		}

		this.$beginBtn.on('click', () => {
			this.gameStart(this.$rootPopShare, this.$rootPopEnd);
		});

		this.$shareBtnArr.on('click', (e) => {
			e.stopPropagation();
			this.appShare();
		});

		// result
		this.$fightBtn.on('click', () => {
			this.$resultPopOmg.show();
		});

		this.$onemoreBtn.on('click', () => {
			this.gameStart(this.$resultPopShare, this.$resultPopEnd);
		});
	},

	checkRank() {
		const data = {topSize: 8};
		this.server(data, (this.host+'/api/v3/marathonActivity/userRank'), (res) => {
			// console.log(JSON.stringify(res));
			if (res.responseJSON.meta.statusCode == 200) {
				var templ = res.responseJSON.content.map(function(item, index) {
					return `<li><span class="range l">${index+1}</span><span class="l">${item.user.nickname}</span><span class="r">最高答对${item.correctAnswers}条</span></li>`;
				});
				this.$rootRankList.html(templ);
				this.$rootPopRank.show();
			}
		});
	},

	gameStart(sharePop, endPop) {
		this.askNo = 0;
		this.correctCount = 0;
		const data = {userId: this.userId, token: this.token};
		this.server(data, (this.host+'/api/v3/marathonActivity'), (res) => {
			// console.log(JSON.stringify(res));
			if (res.responseJSON.meta.statusCode == 200) {
				this.askData = res.responseJSON.content;
				if (this.askData.tryCount == 3) { //没有答题机会了
					if (!this.askData.isShared) {
						sharePop.show();
						return;
					}
					endPop.show();
					return;
				}
				this.initAskPage();
				this.turnPage(1);
			}
		});
	},

	initAskPage() {
		const currentAsk = this.askData.questions[this.askNo];
		console.log(currentAsk);
		const askTitle = (this.askNo+1)+'. '+currentAsk.titleContent;

		if (currentAsk.titleUrl) {
			this.$askBoard.css('backgroundImage', 'url('+currentAsk.titleUrl+')');
			this.$askText.text(askTitle);
		} else {
			this.$askBoard.css('backgroundColor', '#fecd30').text(askTitle);
		}

		for (let i = 0, max = this.$answerOptions.length; i < max; i ++) {
			this.$answerOptions.eq(i).find('span').text(currentAsk.answers[i]);
		}

		const correct = window.atob(currentAsk.correctAnswer);
		// console.log(correct);
		this.$answerOptions.on('click', (e) => {
			var $target = $(e.currentTarget),
				choice = $target.attr('data-id');
			this.$answerOptions.off('click');
			if (choice == correct) {
				$target.addClass('right');
				this.askNo ++;
				this.correctCount ++;
				
				window.setTimeout(() => {
					this.$answerOptions.removeClass();
					this.initAskPage();
				}, 1000);
			} else {
				$target.addClass('wrong');

				let data = {
					userId: this.userId,
					correctAnswer: this.correctCount,
					token: this.token
				};

				this.server(data, this.host+'/api/vs/marathonActivity/userAnswer', (res) => {
					console.log(JSON.stringify(res));
				});

				window.setTimeout(() => {
					this.$answerOptions.removeClass();
					this.handleResultEvent();
				}, 1000);
			}
		});
	},

	handleResultEvent() {
		this.$score.text('本次共答对' + this.correctCount + '道题');
		const data = {topSize: 8};
		this.server(data, (this.host+'/api/v3/marathonActivity/userRank'), (res) => {
			// console.log(JSON.stringify(res));
			if (res.responseJSON.meta.statusCode == 200) {
				var templ = res.responseJSON.content.map(function(item, index) {
					return `<li><span class="range l">${index+1}</span><span class="l">${item.user.nickname}</span><span class="r">最高答对${item.correctAnswers}条</span></li>`;
				});
				this.$resultRankList.html(templ);
				this.turnPage(2);
			}
		});
	},

	turnPage(pageIndex) {
		this.$pageArr.hide();
		this.$popArr.hide();
		this.$pageArr.eq(pageIndex).show();
	},

	appShare() {
		if (this.versions.ios) {
			window.webkit.messageHandlers.AppModel.postMessage({Share: true});
		} else if (this.versions.android) {
			window.control.androidShare();
		}
	},

	server(data, url, callback, type) {
		$.ajax({
			type: type || 'GET',
			data: data || {},
			url: url,
			dataType: 'jsonp',
			complete(res, msg) {
				callback && callback(res);
			}
		});
	},

	getQuery() {
		var search = location.search,
			theRequest = {};
		if (search.indexOf('?') < 0) {
			return;
		}
		search = search.substr(1);
		var paramArr = search.split('&'),
			max = paramArr.length;
		for (var i = 0; i < max; i ++) {
			theRequest[paramArr[i].split('=')[0]] = unescape(paramArr[i].split('=')[1]);
		}
		return theRequest;
	}
};

var a = new SubType();

a.init();