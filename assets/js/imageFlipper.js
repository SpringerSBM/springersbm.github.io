/*
* imageFlipper
*
* Alessio Carnevale
*
* Date: September 2013
*/

(function( $ ){

  $.fn.imageFlipper = function( options ) {

    // Setup options
    var settings = $.extend({
	    		rows	: 3,
	    		columns	: 9,
	        }, options);

    var people = [
    	"Jim, software engineer.",
    	"Aditya, ux designer.",
    	"Pat, technical principal.",
    	"Rob, front-end developer.",
    	"Chris, software engineer.",
    	"Hilverd, software engineer.",
    	"Uthman, quality analyst.",
    	"Dan, software engineer.",
    	"Ben, agile coach.",
    	"Cris, software engineer.",
    	"Rizwan, software engineer.",
    	"Stephen, business analyst.",
    	"Reshma, all round great person.",
    	"Brian, product owner.",
    	"Ai, software engineer.",
    	"Ross, technical architect.",
    	"Hector, platform engineer.",
    	"Paulo, ux designer.",
    	"John, software engineer.",
    	"Mike, technical architect.",
    	"Kristen, business analyst.",
    	"Charles, quality analyst.",
    	"Todd, front-end developer.",
    	"Anjalie, business analyst.",
    	"Andrew, ui designer.",
    	"Simon, platform engineer.",
    	"Rob, software engineer."
    ];



    return this.each(function(){

	    // Store the object
	    var $this = $(this),

	    	imgPrefix=responsiveImages.getImagePrefix({
        		"_tablet":1023,
        		"_widescreen":99999
        	}),
	    	frontImgUrl=responsiveImages.buildImagePath($this.data("frontimage"),imgPrefix),
	    	backImgUrl=responsiveImages.buildImagePath($this.data("backimage"),imgPrefix),
	    	frontImg=$("<img/>"),
	    	backImg=$("<img/>"),
	    	cssPrefix=$this.data("cssprefix"),
	    	tileWidth=0,
	    	tileHeight=0,
	    	ul=$("<ul/>").addClass("imageFlipper");

	    frontImg.on("load",function(){
	    	var img=this,
	    		retinaFactor=responsiveImages.isRetina?2:1;

	    	tileHeight=img.height/settings.rows/retinaFactor;
	    	tileWidth=img.width/settings.columns/retinaFactor;

	    	var x=0,
	    		r=0,
	    		c=0;

	    	while(x<settings.rows*settings.columns){
	    		var li=$("<li title='"+people[x]+"'/>")
	    				.css({
	    					width:tileWidth,
	    					height:tileHeight
	    				})
	    				.attr("tabIndex",0)
	    				.on("click",function(){
	    					var $this=$(this);

	    					$this.addClass("over").siblings().removeClass("over")
	    				})
	    				.appendTo(ul),

	    			div=$("<div/>").appendTo(li),
	    			fSpan=$("<span class='front'/>")
	    					.css({
	    						backgroundImage:"url(" + cssPrefix + frontImgUrl + ")",
	    						backgroundPosition:-tileWidth*c+"px -" + (tileHeight*r) + "px",
	    						backgroundSize:img.width/retinaFactor + "px " + (img.height/retinaFactor) + "px",
	    						width:tileWidth,
	    						height:tileHeight,
	    						display:"block"
	    					})
	    					.appendTo(div),
	    			bSpan=$("<span class='back'/>")
	    					.css({
	    						backgroundImage:"url(" + cssPrefix + backImgUrl + ")",
	    						backgroundPosition:-tileWidth*c+"px -" + (tileHeight*r) + "px",
	    						backgroundSize:img.width/retinaFactor + "px " + (img.height/retinaFactor) + "px",
	    						width:tileWidth,
	    						height:tileHeight,
	    						display:"block"
	    					})
	    					.appendTo(div);

	    		x++;
	    		r=Math.floor((x)/settings.columns);
	    		c=(x)%settings.columns;

	    	}


	    	//loading the back image after the front one to improve performance
	    	backImg.attr("src",cssPrefix + backImgUrl);

	    	// inserting the ul into the dom
	    	ul.insertAfter($this);
	    })

	    frontImg.attr("src",cssPrefix + frontImgUrl);


    });

  };



})( jQuery );