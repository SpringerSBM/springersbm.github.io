(function(){

	var cacheObj={},
		pageWidth=1440,
		settings={
			mobileBreakPoint:1024,
			isMobile:function(){
				return cacheObj.$w.innerWidth()<=settings.mobileBreakPoint;
			},
			imageRatio:function(){
				return this.noParallax()?0.4:0.4;
			},
			isTouch:(('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)),
			isIe:$("html").is(".ie9, .lt-ie9"),
			ieVer:(function(){
				var $html=$("html"),
					ver=null;

				for(var x=7;x<10;x++){
					if($html.is(".ie" + x)){
						ver=x;
						break;
					}
				}

				return ver;
			})(),
			noParallax:function(){
				return true;
				// return settings.isMobile()||settings.isTouch|| settings.isIe;
			}
		};


	//on page ready....
	$().ready(function(){
		
		//JS check!
		$("html").removeClass("no-js");

		// render job feed
		renderJobviteFeed();

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
			if(!settings.noParallax()){
				setBGposition();
			}


		});
		$w.on("scroll", function(){
			setActivePanel();
			if(!settings.noParallax()){
				setBGposition();
			}
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
    	if(!settings.ieVer || settings.ieVer>8){
    		$(".imageFlipper").imageFlipper();
    	}		
		
		//triggering the resize event handler
		$w.resize();
		
	})

	function setActivePanel(){

		// enabling the text animation only on desktops
		// if(settings.noParallax()){
		// 	return false;
		// }

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
    	// var ignoreRetina=settings.isMobile();
    	var ignoreRetina=true;

		// storyboard images
		responsiveImages.noscriptHack(
			$(".storyboards").find(".responsive"),
			{
        		"_smartphone":600,
        		"_tablet":1024, 
        		"_widescreen":99999
        	},
        	function(){
        		if(!settings.noParallax()){
        			setBGposition()
        		}
        	},
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
    
    //  http://hire.jobvite.com/CompanyJobs/Xml.aspx?c=q8w9Vfws

    function renderJobviteFeed() {
      $.ajax({
        url: "http://feed.jobvite.com/CompanyJobs/Xml.aspx?c=q8w9Vfws&cs=9QCaVfwh",
        dataType: "xml",   
        crossDomain: true,   
        success: function (xml, status) {
            var json = $.xml2json(xml);

            if(typeof json == "object" && json.hasOwnProperty("job")) {

              for(var i = 0; i < json.job.length; i++) {

                if(json.job[i].hasOwnProperty("category") && json.job[i].category == "Information Technology") {

	              var job = json.job[i];
	              var location = job.location.replace(/United Kingdom/gi,'UK');
	              var el = '<li class="job-vacancies__vacancy"><a class="vacancy__role" href="' + job.detail_url + '"><strong>';
	              el += job.title.split("-")[0].trim() + '</strong> <span class="vacancy__location">' + location + '</span></a></li>';
	              $(el).insertBefore(".job-vacancies__vacancy.cross-link");

                }     

              }

            }
        },
        error: function(xhr, error) {
        	    var jobviteSearchResults = "http://feed.jobvite.com/CompanyJobs/Careers.aspx?c=q8w9Vfws&cs=9QCaVfwh";
                var el = '<li class="job-vacancies__vacancy"><a class="vacancy__role" href="' + jobviteSearchResults + '"><strong>View current vacancies</strong></a></li>';
                $(el).insertBefore(".job-vacancies__vacancy.cross-link");
            }
          });
    }
   

})();

