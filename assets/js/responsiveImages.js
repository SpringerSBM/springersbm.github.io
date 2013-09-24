

// using the noscript hack to implement responsive images
// mqBreakPoints is an optional object:
// 	{
// 		"_smartphone":600,
// 		"_tablet":1024, 
//		...
// 		"_widescreen":99999
// 	}
// the image filename is created as follow: baseimg + [mqBreakPoint] + [isRetina] + file extension

function responsiveImages($images,mqBreakPoints,onLoadFn) {
    	//checking the retina display
		var isRetina = (
			window.devicePixelRatio > 1 ||
			(window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)
		),  	
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
    
    //creating the IMG element and adding it to the DOM
    $images.each(function(){

		var noScriptElem=$(this),
			imgClass=noScriptElem.data("imgclass"),
			baseImgArr=noScriptElem.data("baseimg").split("."),
			imgUrl=baseImgArr[0],
			imgExt=baseImgArr[1],
			img = window.document.createElement("img"),
			$img=$(img);

		if(onLoadFn){
			$img.on("load",onLoadFn);
		}

		img.src=imgUrl + imgFormat + "." + imgExt;
		$img.addClass(imgClass);
		$img.insertAfter(noScriptElem);

    })

}