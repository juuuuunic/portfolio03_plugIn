
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
		anchors: ['1st', '2nd', '3th', '4th', '5th', '6th', '7th'],
		menu: '#gnbs',
	
		onLeave: function(prevIndex, index, nextIndex) {
			// console.log("hihi~")
			$('.fixed-cont').removeClass('up down hide-down hide-up');

			var nowIndex = index.index;
			if (prevIndex.index < nowIndex) {
				console.log('hihi')
				console.log(nowIndex)
				$('.fixed-cont:eq(' + (nowIndex - 1) + ')').addClass('hide-down');
				effectTimerId = setTimeout(function() {
					$('.fixed-cont:eq(' + (nowIndex - 1) + ')').removeClass('hide-down');
					$('.fixed-cont:eq(' + nowIndex + ')').addClass('up');
				}, 300);
				
			} else if(prevIndex.index < 7) {
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
        }
			
	}); 

    //toggle
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

});
