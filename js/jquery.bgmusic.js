/*
 * bgmusic - jQuery plugin for Mobile page background muscio controller
 *
 * Copyright (c) 2014-2014 Cheney Lin
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Useage:
 *   $("#bgmusic").bgmusic({"url":"images/bg.mp3","autoplay":true,"loop":true});
 * Version:  1.0.0
 *
 */
(function($) { 
	// 
	// plugin definition 
	// 
	$.fn.bgmusic = function(options) { 
		
		// build main options before element iteration 
		var opts = $.extend({}, $.fn.bgmusic.defaults, options); 
		// iterate and reformat each matched element 
		return this.each(function() { 
		$this = $(this); 
		$this.css('position','absolute','width','100%','height','48px','z-index','9999','left','0','top','0');
		// build element specific options 
		var o = $.meta ? $.extend({}, opts, $this.data()) : opts; 
		// update element styles 
		$("body").append($.fn.bgmusic.init(o.url,o.autoplay,o.loop));
		
		$this.html('<div id="jq-bgmusic-controller" style="width:28px;height:28px;float:right;margin:5px;padding:10px;"><img src="'+o.imgoff+'" width="28" height="28"></div>');
		
		$('#jq-bgmusic-controller').bind("touchstart",function(event){
			$.fn.bgmusic.toggle(options);
			event.stopPropagation();
		});
		var bgsound = document.getElementById("jq-bgmusic-mp3");
		bgsound.addEventListener("playing", function () {
			$("body").unbind('touchstart.bgmusic');
		  //debug('startfix unbind');
			if(!opts.controllerstyle==""){
				$("#jq-bgmusic-controller").attr('style',opts.controllerstyle);
				}
			$("#jq-bgmusic-controller").html('<img src="'+o.imgon+'" width="28" height="28">');
		 }, false);
		bgsound.addEventListener("ended", function () {
			if(!opts.controllerstyle==""){
				$("#jq-bgmusic-controller").attr('style',opts.controllerstyle);
				}
			$("#jq-bgmusic-controller").html('<img src="'+o.imgoff+'" width="28" height="28">');
		 }, false);
		 
		$(window).blur(function(){
			$.fn.bgmusic.pause(options);
			});
		$("body").blur(function(){
			$.fn.bgmusic.pause(options);
			});
		if(o.autoplay){
			bgsound.play();
			$("body").one('touchstart.bgmusic',function(){
				//debug('startfix run');
				$this.show().bgmusic.startfix();
				});
			}
	}); 
}; 

$.fn.bgmusic.toggle = function(options) { 

		var opts = $.extend({}, $.fn.bgmusic.defaults, options); 
		
		var bgsound = document.getElementById("jq-bgmusic-mp3");
		if(bgsound.paused){
			bgsound.play();
		}
		else
		{
			if(!opts.controllerstyl==""){
				$("#jq-bgmusic-controller").attr('style',opts.controllerstyle);
				}
			$("#jq-bgmusic-controller").html('<img src="'+opts.imgoff+'" width="28" height="28">');
			bgsound.pause();
		}
	}

$.fn.bgmusic.play = function(options) { 

		var opts = $.extend({}, $.fn.bgmusic.defaults, options); 
		
		var bgsound = document.getElementById("jq-bgmusic-mp3");
		if(bgsound.paused){
			bgsound.play();
		}
	}

$.fn.bgmusic.startfix = function(options) { 
		var opts = $.extend({}, $.fn.bgmusic.defaults, options); 
		var bgsound = document.getElementById("jq-bgmusic-mp3");
		if(bgsound.paused){
			bgsound.play();
		}
	}

$.fn.bgmusic.pause = function(options) { 

		var opts = $.extend({}, $.fn.bgmusic.defaults, options); 
		
		var bgsound = document.getElementById("jq-bgmusic-mp3");
		if(!bgsound.paused){
			if(!opts.controllerstyl==""){
				$("#jq-bgmusic-controller").attr('style',opts.controllerstyle);
				}
			$("#jq-bgmusic-controller").html('<img src="'+opts.imgoff+'" width="28" height="28">');
			bgsound.pause();
		}
	}

// 
// define and expose our format function 
// 
$.fn.bgmusic.init = function(url,autoplay,loop) { 
	var s;
	s='<audio id="jq-bgmusic-mp3"';
	if(autoplay)
	s+=' autoplay="autoplay"';
	if(loop)
	s+=' loop="loop"';
	s+='><source src="'+url+'"/></audio>';
	return s;
}; 
// 
// plugin defaults 
// 
$.fn.bgmusic.defaults = { 
	imgon: 'images/splay.png',
	imgoff: 'images/sclose.png',
	url: 'bg.mp3',
	autoplay: true, 
	controllerstyle:'',
	loop: true
}; 
// 
// end of closure 
// 
})(jQuery);