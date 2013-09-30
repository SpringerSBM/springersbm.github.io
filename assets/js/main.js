(function(){

	var cacheObj={},
		pageWidth=1440,
		settings={
			mobileBreakPoint:1024,
			isMobile:function(){
				return cacheObj.$w.innerWidth()<=settings.mobileBreakPoint;
			},
			imageRatio:function(){
				return this.noParallax()?0.5:0.4;
			},
			isTouch:(('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)),
			noParallax:function(){
				return settings.isMobile()||settings.isTouch;
			}
		};


	//on page ready....
	$().ready(function(){
		
		//JS check!
		$("html").removeClass("no-js");

		// generating the QRcode markup
		var QRdiv=$("<div/>")
			.addClass("QRcode")

			$("<img/>")
				.attr({src:"https://chart.googleapis.com/chart?cht=qr&chs=75x75&chl=" + location.href})
				.appendTo(QRdiv)

			$("<span/>")
				.text(location.href)
				.appendTo(QRdiv)
		// adding it to the Role page
		QRdiv.appendTo($(".roles .home-section__heading"))


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

			$(document.body).toggleClass("noParallax",settings.noParallax());

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
		if(settings.noParallax()){
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
		if(settings.noParallax()){
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
					"-webkit-transform":"translateY(" + top + "px)",
					"-moz-transform":"translateY(" + top + "px)",
					"-ms-transform":"translateY(" + top + "px)",
					"transform":"translateY(" + top + "px)"
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
    	// ignoring retina on smaller devices (including iPad3!)
    	var ignoreRetina=settings.isMobile();

		// storyboard images
		responsiveImages.noscriptHack(
			$(".storyboards").find(".responsive"),
			{
        		"_smartphone":600,
        		"_tablet":1024, 
        		"_widescreen":99999
        	},
        	setBGposition,
        	ignoreRetina
		);

		// our-workplace, our-culture, our-people
		responsiveImages.noscriptHack(
			$(".our-workplace .home-section__grid, .our-culture, .home-section--our-people, .looking-for__photo").find(".responsive"),
			{
        		"_tablet":1024, 
        		"_widescreen":99999
        	},
        	null,
        	ignoreRetina
		);

		// our-workplace, product images
		responsiveImages.noscriptHack(
			$(".our-workplace .map, .our-products__product").find(".responsive"),
			{
        		"_tablet":1024, 
        		"_widescreen":99999
        	}
		);

    }

})();

