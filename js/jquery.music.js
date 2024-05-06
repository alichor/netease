/*
 * jquery-sound.js
 * by zhangxinxu	http://www.zhangxinxu.com/
 * 2011-04-28 v1.0
 */
 
(function($) {
	$.fn.music = function(idMp3,callback) {
		var a=$("#" + idMp3).get(0);
		a.play();
		if($('#' + idMp3).attr('data-event')!='true'){
			$('#' + idMp3).attr('data-event',"true");
			a.addEventListener('pause',function(){
				callback();
			});  
			a.addEventListener('ended',function(){  
				callback();
			});  
			}
		};
	$.fn.musicPause = function(idMp3) {
		var a=$("#" + idMp3).get(0);
		a.pause();
		};			
})(jQuery);
 
 
 
 