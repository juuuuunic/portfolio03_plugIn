
$(document).ready(function(){

  
	// fullpage customization
	$('#fullpage').fullpage({
		easing:'easeOutSine',
   		scrollingSpeed: '600',
		sectionSelector: '.vertical-scrolling',
		slideSelector: '.horizontal-scrolling',
		controlArrows: false, 
		navigation: true,
        showActiveTooltip: true,
		anchors: ['1st', '2nd', '3th', '4th', '5th', '6th', '7th','8th'],
		menu: '#gnbs',
	
		onLeave: function(prevIndex, index, nextIndex) {
			// console.log("hihi~")
			console.log('.gnb.length:'+$('.gnb').length)
			$('.fixed-cont').removeClass('up down hide-down hide-up');

			var nowIndex = index.index;
			var length = $('.gnb').length;
			if (prevIndex.index < nowIndex) {
				//console.log('hihi')
				console.log('nowIndex:'+nowIndex)
				$('.fixed-cont:eq(' + (nowIndex - 1) + ')').addClass('hide-down');
				effectTimerId = setTimeout(function() {
					$('.fixed-cont:eq(' + (nowIndex - 1) + ')').removeClass('hide-down');
					$('.fixed-cont:eq(' + nowIndex + ')').addClass('up');
				}, 300);
				
			} else if(prevIndex.index < length) {
				$('.fixed-cont:eq(' + (nowIndex + 1) + ')').addClass('hide-up');
				effectTimerId = setTimeout(function() {
						$('.fixed-cont:eq(' + nowIndex + 1 + ')').removeClass('hide-up');
						$('.fixed-cont:eq(' + nowIndex + ')').addClass('down');
					}, 250);	
			}
        },

        afterLoad: function(prevIndex, index, anchors) {
			
			$('#gnbs').css({"left":"-100%"});
			$('.bars').removeClass('active');

			if(index.index == 0) {
				$('.fixed-cont:eq(0)').addClass('down');
				$('#fp-nav').css({"display":"none"}, 100);
			} else {
				$('#fp-nav').stop().fadeIn();
			}

			interval = setInterval(up_slides, 2500);
			interval2 = setInterval(down_slides, 2500);
        }
			
	}); 

    // toggle
    var gnbMove = false;
    $(".bars").click(function(){
        
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

	// slide
	var n = 1;
	var length = $('#up_slides > li').length;

	//up_slides
	var interval;
	function up_slides() {
		//console.log('length:'+length)
		$("#up_slides").stop().animate({"left":-(n*100)+"%"}, 700, function(){
			if(n == length-1) {
				n = 0;
				$(this).css({"left":0});
			}
			n++;
		});
	}
	$("#up_slides").hover(function(){
		clearInterval(interval);
	}, function(){
		interval = setInterval(up_slides, 2500);
	});
	
	//down_slides
	var n2 = 1;
	var interval2;
	function down_slides() {
		$("#down_slides").stop().animate({"left":-(n2*100)+"%"}, 700, function(){
			if(n2 == length-1) {
				n2 = 0;
				$(this).css({"left":0});
			}
			n2++;
		});
	}
	$("#down_slides").hover(function(){
		clearInterval(interval2);
	}, function(){
		interval2 = setInterval(down_slides, 2500);
	});

});
