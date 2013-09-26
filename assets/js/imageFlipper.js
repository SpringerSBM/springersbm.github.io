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

    var people = [];
    people.push("Jim, software engineer.");
    people.push("Aditya, ux designer.");
    people.push("Pat, technical principal.");
    people.push("Rob, front-end developer.");
    people.push("Chris, software engineer.");
    people.push("Shalini, quality analyst.");
    people.push("Uthman, quality analyst.");
    people.push("Dan, software engineer.");
    people.push("Ben, agile coach.");
    people.push("Cris, software engineer.");
    people.push("Rizwan, software engineer.");
    people.push("Stephen, business analyst.");
    people.push("Reshma, all round great person.");
    people.push("Brian, product owner.");
    people.push("Ai, software engineer.");
    people.push("Ross, technical architect.");
    people.push("Hector, platform engineer.");
    people.push("Paulo, ux designer.");
    people.push("John, software engineer.");
    people.push("Mike, technical architect.");
    people.push("Kristen, business analyst.");
    people.push("Charles, quality analyst.");
    people.push("Todd, front-end developer.");
    people.push("Anjalie, business analyst.");
    people.push("Andrew, ui designer.");
    people.push("Simon, platform engineer.");
    people.push("Rob, software engineer.");

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
	    		var li=$("<li/>")
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

	    			div=$("<div title='"+people[x]+"'/>").appendTo(li),
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