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
		var parFx=$(".storyboards__wrapper"),
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


		//tweaking the header font-size
		cacheObj.fitTexts.each(function(){
			var $this=$(this);

			$this.fitText(
				parseFloat($this.data("fittextcompressor")||1),
				{
					minFontSize:parseFloat($this.data("fittextminsize")||14)
				}
			);
			
		})
			
		// setting the events handler
		$w.on("resize",function(){

			$(document.body).toggleClass("noParallax",settings.isMobile());

			setImageRatio();
			setActivePanel();
			setBGposition();


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

		//setting the responsive images
		setResponsiveImages();

		// setting the imageFlipper widget
		$(".imageFlipper").imageFlipper();
		
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

		// storyboard images
		responsiveImages.noscriptHack(
			$(".storyboards").find(".responsive"),
			{
        		"_smartphone":600,
        		"_tablet":1024, 
        		"_widescreen":99999
        	},
        	setBGposition
		);

		// products images
		responsiveImages.noscriptHack(
			$(".our-products__product, .looking-for__photo").find(".responsive")
		);

		// our-workplace, our-cultire, our-people
		responsiveImages.noscriptHack(
			$(".our-workplace, .our-culture, .home-section--our-people").find(".responsive"),
			{
        		"_tablet":1024, 
        		"_widescreen":99999
        	}
		);


    }

})();

