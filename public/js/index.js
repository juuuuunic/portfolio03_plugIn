


//객체 :function(){}()
var WheelScroll = (function() {
	function WheelScroll(_opt) {
		var obj = this;  //this = function
		if(_opt) {
			if(_opt.page)  this.page = $(_opt.page);
			else this.page = $(".page");
			//만약 _opt에서 page가 존재한다면 이 함수의 page는 $(_opt.page); 이다.
			//_opt에서 page가 존재하지 않는다면 이 함수의 page는 $(".page"); 이다.
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
			//만약 _opt에서 speed가 존재한다면 이 함수의 page는 $(_opt.page); 이다.
			//_opt에서 speed가 존재하지 않는다면 이 함수의 speed는 200 이다.
		}
		else {
			this.page = $(".page");
			this.speed = 200;
		}
		this.scTop = $(document).scrollTop();
		this.gap = [];
		this.oldNow = 0;
		this.now = 0;
		this.dir = 0;
		this.speedGap = 0;
		
		$(document).resize(function() {
			$(obj.page).each(function(i) {
				obj.gap[i] = $(this).offset().top; 
			});
		}).trigger("resize");
		this.init(this);
		if(_opt.nav) this.navAdd(obj, _opt.nav);
	}
		
	WheelScroll.prototype.init = function(obj) {
		if(obj.now == 0) $('.pageFix:eq(' + 0 + ')').addClass('up');
		$(document).on("mousewheel DOMMouseScroll", wheelFn);
		function wheelFn(e) {
			e.preventDefault();
			e.stopPropagation();
			obj.dir = e.originalEvent.wheelDelta;
			obj.scTop = $(document).scrollTop();	
			$(document).off("mousewheel DOMMouseScroll");

			for(var i=0; i<obj.gap.length; i++) {
				if(obj.scTop <= obj.gap[i]) {
					obj.now = i;
					break;
				}
			}
			obj.oldNow = obj.now;
			if(obj.dir > 0) { if(obj.now > 0) obj.now--; }
			else { if(obj.now < obj.gap.length-1) obj.now++; }
			obj.animation(obj, function() {
					$(document).on("mousewheel DOMMouseScroll", wheelFn);
			});
		};
	}
	WheelScroll.prototype.navAdd = function(obj, navObj) {
		$(navObj).on("click", function() {
			obj.oldNow = obj.now;
			obj.now = $(this).data("now");
			obj.animation(obj, function() {
				$('#gnbs').css({"left":"-100%"});
				$('.nav').removeClass('active');
				
			});
		});
		
	}
	WheelScroll.prototype.animation = function(obj, fn) {
		obj.speedGap = Math.abs(obj.now - obj.oldNow);
		$("html, body").stop().animate({"scrollTop":obj.gap[obj.now]+"px"}, obj.speed*obj.speedGap, fn);
		
		
		detailShow();
		var effectTimerId = '';
		function detailShow(e) {
			// console.log(obj.oldNow)
			// console.log(obj.now)
			clearTimeout(effectTimerId);
			if(obj.oldNow !== obj.now) {
				$('.pageFix').removeClass('up down hide-down hide-up');

				if (obj.dir == -120) {
					$('.pageFix:eq(' + (obj.now - 1) + ')').addClass('hide-down');
					effectTimerId = setTimeout(function() {
						$('.pageFix:eq(' + (obj.now - 1) + ')').removeClass('hide-down');
						$('.pageFix:eq(' + obj.now + ')').addClass('up');
					}, 200);
					
				} else if(obj.dir == 120) {
					$('.pageFix:eq(' + (obj.now + 1) + ')').addClass('hide-up');
					effectTimerId = setTimeout(function() {
							$('.pageFix:eq(' + obj.now + 1 + ')').removeClass('hide-up');
							$('.pageFix:eq(' + obj.now + ')').addClass('down');
						}, 200);	
				} 
			}
		}

		onTop();
		function onTop(n) {
			$('.wrap > a.top').removeClass('hide show');
			if(obj.now == 0) $('.wrap > a.top').addClass('hide');
			else {$('.wrap > a.top').addClass('show');}
			return;
		}
	
	}
	return WheelScroll;
}());



var gnbMove = false;
$(".nav").click(function(){
	
	if(gnbMove) {
		//보이면
		$(this).removeClass('active');
		$('#gnbs').css({"left":"-100%"});
		gnbMove = false;
	}
	else {
		//안보이면
		$(this).addClass('active');
		$('#gnbs').css({"left":"30px"});
		gnbMove = true;
	}
});

// reset
document.onbeforeunload = function () {
	document.scrollTo(0, 0);
};