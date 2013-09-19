
(function(){

	var cacheObj={},
		pageWidth=1440,
		imageRatio=0.4;


	//on page ready....
	$().ready(function(){
		var parFx=$(".storyboards"),
			parFxPos=parFx.position(),
			panels=parFx.children(".storyboards__board"),
			$w=$(window),
			panelHeight=panels.eq(0).innerHeight();

		//caching non-changing values...
		cacheObj={
			$body:$("body"),
			parFx:parFx,
			panels:panels,
			$w:$w,
			panelHeight:panelHeight,
			images:panels.find("img")
		}
			
		// setting the events handler
		$w.on("resize",setImageRatio);
		$w.on("scroll resize", function(){
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
		setImageRatio();
		setActivePanel();
		setBGposition();
		
	})

	function setActivePanel(){
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
		var windowHeight=cacheObj.$w.innerHeight(),
			WscrollTop=cacheObj.$w.scrollTop(),
			pageHeight=$("html").innerHeight();

		cacheObj.panels.each(function(index){
			var $this=$(this),
				thisPos=$this.position(),
				imgObj=cacheObj.images.eq(index),

				// height diff between the panel and the image
				imageDeltaH=imgObj.innerHeight()-cacheObj.panelHeight;


				var top=imageDeltaH/(windowHeight/(WscrollTop-thisPos.top));
				imgObj.css({
					top:top
				})
		})
	}


	function setImageRatio(){
		//making sure the images don't lose their ration when resizing
		var bodyWidth=cacheObj.parFx.innerWidth();
		cacheObj.panelHeight=bodyWidth*imageRatio;

		cacheObj.panels.each(function(){
			$(this)
				.css({
					height:Math.floor(cacheObj.panelHeight),
					"font-size":bodyWidth/pageWidth*100 + "%"
				})

		})
	}
	
})();

