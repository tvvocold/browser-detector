
function BrowserTester() {
// DEFAULT VALUES
var flashVersion = "Flash is not Installed :(";
var screen_size = "Screen Size not detected :(";
var cookies = "disabled";
var javascript = "disabled";

//Browser Detector http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Internet Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

//http://www.prodevtips.com/2008/11/20/detecting-flash-player-version-with-javascript/
function getFlashVersion(){
  // ie
  try {
    try {
      // avoid fp6 minor version lookup issues
      // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
      var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
      try { axo.AllowScriptAccess = 'always'; }
      catch(e) { return '6,0,0'; }
    } catch(e) {}
    return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
  // other browsers
  } catch(e) {
    try {
      if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
        return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
      }
    } catch(e) {}
  }
  return '0,0,0';
}
flashVersion = getFlashVersion();
flashVersion = flashVersion.replace(/,/g, ".");

screen_size =  screen.width + " x " + screen.height;

if (navigator.cookieEnabled) cookies = "enabled";

if (navigator.javaEnabled()) javascript = "enabled";

$(document).ready( function() {
	
	//Fill Table Details
	//$('#btBrowser td:eq(1)').append(BrowserDetect.browser + " " + BrowserDetect.version);
	$('#btOs td:eq(1)').append(BrowserDetect.OS);
	$('#btFlash td:eq(1)').append(flashVersion);
	$('#btScreen td:eq(1)').append(screen_size);
	$('#btCookies td:eq(1)').append("Cookies are " + cookies);
	$('#btJavscript td:eq(1)').append("Javascript is " + javascript);
	
	if (BrowserDetect.browser == "Chrome") $('#btTableBrowser').addClass('c-browser');
	if (BrowserDetect.browser == "Safari") $('#btTableBrowser').addClass('s-browser');
	if (BrowserDetect.browser == "Internet Explorer") $('#btTableBrowser').addClass('i-browser');
	if (BrowserDetect.browser == "Firefox") $('#btTableBrowser').addClass('f-browser');
	if (BrowserDetect.browser == "Opera") $('#btTableBrowser').addClass('o-browser');
	
	$('#btTableBrowser').html(BrowserDetect.browser + " " + BrowserDetect.version);	
	
	//Fill Form Fields
	$('#btFormBrowser').val(BrowserDetect.browser + " " + BrowserDetect.version);
	$('#btFormOs').val(BrowserDetect.OS);
	$('#btFormFlash').val(flashVersion);
	$('#btFormScreen').val(screen_size);
	$('#btFormCookies').val(cookies);
	$('#btFormJavscript').val(javascript);
	
	$('.btQa h3').click (function() {
		var btqaClick = $(this).index('.btQa h3');
		$('.btQa p').eq(btqaClick).slideToggle(200, 'linear');
	});		
		
});

}BrowserTester();

