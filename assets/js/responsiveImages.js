

// using the noscript hack to implement responsive images
// mqBreakPoints is an optional object:
// 	{
// 		"_smartphone":600,
// 		"_tablet":1024, 
//		...
// 		"_widescreen":99999
// 	}
// the image filename is created as follow: baseimg + [mqBreakPoint] + [isRetina] + file extension

(function(){

	//setting the class name on page load only	
	$(document.body).toggleClass("mobile",$(window).innerWidth()<1024);

	window.responsiveImages={
		noscriptHack:function ($noScriptTags,mqBreakPoints,onLoadFn) {
		    var imgFormat=responsiveImages.getImagePrefix(mqBreakPoints);
		    
		    //creating the IMG element and adding it to the DOM
		    $noScriptTags.each(function(){

				var noScriptElem=$(this),
					imgClass=noScriptElem.data("imgclass"),
					altText=noScriptElem.attr("alt"),
					imgPath=responsiveImages.buildImagePath(noScriptElem.data("baseimg"),imgFormat),
					img = window.document.createElement("img"),
					$img=$(img);

				if(onLoadFn){
					$img.on("load",onLoadFn);
				}

				img.src=imgPath;
				
				$img
					.addClass(imgClass)
					.attr("alt",altText)
					.insertAfter(noScriptElem);

		    })
		},

		getImagePrefix:function (mqBreakPoints){
			//checking the retina display
			var isRetina = responsiveImages.isRetina,  	
			windowWidth=$(window).innerWidth()
			imgFormat="";


		    //test for available width in current browser window
		    for (var bp in mqBreakPoints){
		        if(windowWidth < mqBreakPoints[bp]){ 
		          imgFormat = bp;
		          break;
		        }
		    }

		    imgFormat=isRetina?imgFormat+"@2x":imgFormat;	

		    return imgFormat;
		},

		buildImagePath:function (filePath,imgPrefix){
			var baseImgArr=filePath.split("."),
				imgUrl=baseImgArr[0],
				imgExt=baseImgArr[1];

			return imgUrl + imgPrefix + "." + imgExt;

		},

		isRetina : (
			window.devicePixelRatio > 1 ||
			(window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)
		)
	}

})();

