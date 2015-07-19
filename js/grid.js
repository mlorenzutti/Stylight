(function ( $ ) {
 
    $.fn.stylightPinterest = function( options ) {
 		
    	var mainGrid = this;

        var settings = $.extend({
            margin: 14,
            width: 240,
            numColumn: 4,
            elemClass: '.elem',
        }, options );
 		var c=0;

 		var privateMethods = {
 			// check column number related to grid container width
 			checkColumns : function(restartIfNeed){

 			var currNumColumn = settings.numColumn;
 			settings.numColumn = Math.floor((mainGrid.width())/(settings.width));

 			if ((restartIfNeed)&&(currNumColumn!==settings.numColumn)){
 				moveItems();
 			}

 			},
 			// get the first available coordinates for a box
 			getAvailablePosition : function(){
        	var group = $('.touse');
        	var elemArray = new Array();
			group.each(function(){
				elemArray.push(new Array($(this).position().left,$(this).position().top+$(this).height(),$(this).data("num")));
			});

			elemArray.sort(function(a, b) {
			    return a[1] - b[1];
			});

			return elemArray[0];
        	},
        	// find the last product and define grid total Height
        	setGridHeight : function(){
        	var lastItems = $(settings.elemClass+".touse");
        	var elemArray = new Array();
        	lastItems.each(function(){
				elemArray.push($(this).position().top+$(this).height());
			});
        	elemArray.sort(function(a,b){return b - a})
        	mainGrid.height(elemArray[0]+settings.margin);
        	}

 		}
        
 		 

       
 		// cycle that allow the creation of the pinterest like grid
        var moveItems = function(){
        	privateMethods.checkColumns();
        	$(settings.elemClass).each(function(){

			if (c<settings.numColumn){

			$(this).css({left:(settings.width*c),top:0}).addClass("touse");
			}else {
				var availablePosition = privateMethods.getAvailablePosition();

				$(this).css({left:availablePosition[0],top:availablePosition[1]+settings.margin}).addClass("touse");
				$(settings.elemClass+'[data-num="'+availablePosition[2]+'"]').removeClass("touse");
			}
			c++;

			});

        	privateMethods.setGridHeight();

			c=0;

        };

        $(window).on("resize",function(){

        	privateMethods.checkColumns(true);
        });

        moveItems();
        
       	
 
    };
 
}( jQuery ));


$('.grid').stylightPinterest();


