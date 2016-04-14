;(function($) {
	$.fn.tab = function(options) {
		var settings = $.extend({
			sEvent: 'mouseover',
			nTimeout: 0,
			fCallback: null,
			nAuto: 0
		}, options);
		var self = $(this),
			oTabMenus = self.find('li.tab-menu-item'),
			oTabBoxs = self.find('div.tab-box-item'),
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
			};

		//绑定事件
		self.on(settings.sEvent, 'li.j-menu-item', function() {
			fDelayHandle($(this), settings.nTimeout, settings.fCallback);
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