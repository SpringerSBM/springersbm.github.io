(function(){

	var cacheObj={},
		pageWidth=1440,
		settings={
			mobileBreakPoint:1024,
			isMobile:function(){
				return cacheObj.$w.innerWidth()<=settings.mobileBreakPoint;
			},
			imageRatio:function(){
				return this.isMobile()?0.5:0.4;
			}
		};


	//on page ready....
	$().ready(function(){
		var parFx=$(".storyboards"),
			parFxPos=parFx.position(),
			panels=parFx.children(".storyboards__board"),
			$w=$(window),
			panelHeight=panels.eq(0).innerHeight();

		//caching non-changing values...
		cacheObj={
			parFx:parFx,
			panels:panels,
			$w:$w,
			panelHeight:panelHeight,
			fitTexts:$(".fitText")
		}
			
		// setting the events handler
		$w.on("resize",function(){

			$(document.body).toggleClass("mobile",settings.isMobile());

			setImageRatio();
			setActivePanel();
			setBGposition();

			//tweaking the header font-size
			cacheObj.fitTexts.fitText(
				1.45,
				{minFontSize:36}
			);
		});
		$w.on("scroll", function(){
			setActivePanel();
			setBGposition();
		})

		// down-arrow click handler
		parFx.on("click", "a", function(e){
			e.preventDefault();
			var nextPanel=$(this).closest(".storyboards__board").next(),
				windowHeight=cacheObj.$w.innerHeight()
				scrollTop=nextPanel.position().top-windowHeight/2+nextPanel.innerHeight()/2;


			$("html,body").animate({scrollTop:scrollTop},600)
		})

		//running the functions on page ready
		setResponsiveImages();
		
		//triggering the resize event handler
		$w.resize();
		
	})

	function setActivePanel(){

		// enabling the text animation only on desktops
		if(settings.isMobile()){
			return false;
		}

		var WscrollTop=cacheObj.$w.scrollTop(),
			windowHeight=cacheObj.$w.innerHeight(),
			//getting the index of the panel currently showing it self in the center of the screen (-ish)
			i=Math.floor((WscrollTop+windowHeight/2-cacheObj.parFx.position().top)/(cacheObj.panelHeight));

		cacheObj.panels
			.removeClass("active")
			.eq(i)
				.addClass("active");		
	}

	function setBGposition(){

		//enabling the parallax effect only on desktops
		if(settings.isMobile()){
			//repositioning the images 
			cacheObj.panels.find("img").css({top:"0px"});
			return false;
		}
		var windowHeight=cacheObj.$w.innerHeight(),
			WscrollTop=cacheObj.$w.scrollTop(),
			pageHeight=$("html").innerHeight();

		cacheObj.panels.each(function(index){
			var $this=$(this),
				thisPos=$this.position(),
				imgObj=$this.find("img"),
				isNotVisible=(thisPos.top>(windowHeight+WscrollTop)||(thisPos.top+$this.innerHeight())<WscrollTop);

			if (!isNotVisible){
				// height diff between the panel and the image
				var imageDeltaH=imgObj.innerHeight()-cacheObj.panelHeight;

				var top=imageDeltaH/(windowHeight/(WscrollTop-thisPos.top));
				imgObj.css({
					top:top
				})
				
			}
		})
	}


	function setImageRatio(){
		//making sure the images don't lose their ratio when resizing
		var bodyWidth=cacheObj.parFx.innerWidth();
		cacheObj.panelHeight=bodyWidth*settings.imageRatio();

		cacheObj.panels.each(function(){
			$(this)
				.css({
					height:Math.floor(cacheObj.panelHeight),
					"font-size":bodyWidth/pageWidth*100 + "%"
				})

		})
	}
	
    function setResponsiveImages() {
    		//looking for the noscript tag
        var responsiveImages = $(".responsive"),
        	//checking the retina display
			isRetina = (
				window.devicePixelRatio > 1 ||
				(window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)
			),  	
			//setting the break-points
        	mqBreakPoints = {
        		"_smartphone":600,
        		"_tablet":1024, 
        		"_widescreen":99999
        	},
        	imgFormat="";


        //test for available width in current browser window
        for (var bp in mqBreakPoints){
	        if(cacheObj.$w.innerWidth() < mqBreakPoints[bp]){ 
	          imgFormat = bp;
	          break;
	        }
        }

        imgFormat=isRetina?imgFormat+"@2x":imgFormat;
        
        //creating the IMG element and adding it to the DOM
        responsiveImages.each(function(){

			var noScriptElem=$(this),
				imgUrl=noScriptElem.data("baseimg"),
				img = window.document.createElement("img"),
				$img=$(img).addClass('board__image');

			//setting the image as soon as it gets loaded
			$img.on("load",function(){
				setBGposition();
			});

			img.src=imgUrl + imgFormat + ".jpg";
			$img.insertAfter(noScriptElem);

        })

    }

})();

