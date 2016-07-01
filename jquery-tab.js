;(function($) {
	$.fn.tab = function(options) {
		var settings = $.extend({
			sEvent: 'mouseover',
			nTimeout: 0,
			fCallback: null,
			nAuto: 0
		}, options);
		var self = $(this),
			oTabMenuWrap = self.find('.j-tab-menu'),
			oTabMenus = self.find('.j-tab-nav'),
			oTabBoxWrap = self.find('.j-tab-box'),
			oTabBoxs = self.find('.j-tab-item'),
			oTabAdd = self.find('.j-tab-add')
			oTimer = null,
			nAutoIndex = -1;

		var fMenuHandle = function($menu, fCallback) {
				$menu.siblings()
					.removeClass('tab-menu-current')
					.end()
					.addClass('tab-menu-current');
				oTabBoxs.siblings()
					.addClass('tab-box-hide')
					.eq($menu.index())
					.removeClass('tab-box-hide');
				if (settings.fCallback) {
					settings.fCallback();
				};
			},
			fDelayHandle = function($menu, nTimeout, fCallback) {
				nTimeout ? setTimeout(function() {
					fMenuHandle($menu, fCallback)
				}, nTimeout) : fMenuHandle($menu, fCallback);
			},
			fAutoPlay = function() {
				oTimer = setInterval(function() {
					nAutoIndex = nAutoIndex + 1;
					if (nAutoIndex >= oTabMenus.length) {
						nAutoIndex = 0;
					};
					fMenuHandle(oTabMenus.eq(nAutoIndex), settings.fCallback);
				}, settings.nAuto);
			},
			fTabAdd = function(){
				var nLen = oTabMenus.length;
				$(oTabMenus[0]).clone().find('a').html('Tab ' + nLen).end().insertBefore(oTabAdd);
				$(oTabBoxs[0]).clone().html('').appendTo(oTabBoxWrap);
				oTabMenus = self.find('.j-tab-nav'),
				oTabBoxs = self.find('.j-tab-item');
			};

		//绑定事件
		self.on(settings.sEvent, '.j-tab-nav', function() {
			fDelayHandle($(this), settings.nTimeout, settings.fCallback);
		});
		self.on('click','.j-tab-add',function(){
			fTabAdd();
		});
		//自动播放
		if (settings.nAuto) {
			fAutoPlay();
			self.hover(function() {
				clearInterval(oTimer);
				oTimer = null;
			}, function() {
				fAutoPlay();
			});
		};
	};
})(jQuery);