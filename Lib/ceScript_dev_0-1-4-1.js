/*
 * Copyright (c) 2013, Abox42 GmbH. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Abox42 or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// JavaScript Document
// ceScript version 0.1.4.1

/**
 * 
 * Removes a certain index from an array. 
 * Example calls:
 * // Remove the second item from the array
 * array.remove(1);
 * // Remove the second-to-last item from the array
 * array.remove(-2);
 * // Remove the second and third items from the array
 * array.remove(1,2);
 * // Remove the last and second-to-last items from the array
 * array.remove(-2,-1);
 *
 */
if(Array.prototype.remove==undefined){
	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from,to){
		var rest = this.slice((to||from)+1||this.length);
		this.length = from<0?this.length+from:from;
		return this.push.apply(this,rest);
	};
}
/**
 *
 * Checks if a certain value (not key) is inside an array
 *
 **/ 
if(Array.prototype.inArray==undefined){
	Array.prototype.inArray = function(value){
		for(var i=0;i<this.length;i++){
			if(this[i]===value) return true;
		}
		return false;
	};
}

// Inspired by jQuery, Ian Hill and John Resig
// Call functions from inside this function using the prefix ceScript.
(function(){
    window.ceScript = function(selector){return new CESCRIPT(selector);};

	if(window.$==undefined) window.$ = window.ceScript;
	window.onerror = function(msg,url,linenumber){
		ceScript.fn.msg('Error :\n    '+msg+'\n    URL: '+url+'\n    Line Number: '+linenumber,'error');
		return false;
	};
	var NAME = 'ceScript Core',
		VERSION = '0.1.4 alpha',
		RELEASE = '2012-08-28',
		AUTHOR = 'Christian Hockenberger (Abox42 GmbH)',
		is_initialized = false,
		/**/
		use_console = false,
		use_debug = false,
		use_output = false,
		/*/
		use_console = true,
		use_debug = true,
		use_output = 'debug_console',
		/**/
		location = window.location
		;
	var msg = function(msg,type){
            
		// Debug-Output
                if(use_output!==false){
			if(type=='debug') if(!use_debug) return true;
			elm = document.getElementById(use_output).innerHTML;
			document.getElementById(use_output).innerHTML = elm+'<p>'+msg+'</p>';
			return true;
		}
		if(use_console){
			if(type=='debug'){
				if(use_debug) return console.debug(NAME+' '+VERSION+' :: '+msg);
				else return true;
			}
			if(type=='info') return console.info(NAME+' '+VERSION+' :: '+msg);
			if(type=='warn') return console.warn(NAME+' '+VERSION+' :: '+msg);
			if(type=='error') return console.error(NAME+' '+VERSION+' :: '+msg);
			if(type===false||type==undefined) return console.log(NAME+' '+VERSION+' :: '+msg);
		}
		return true;
	};

	/**
	*
	* Examples:
	* use ceScript("#div') for selecting an tag with a certain id
	* use ceScript(".div') for selecting all elements with the class "div"
	* use ceScript("<form>"), ceScript("<span>"), ceScript("<div>")  to select all form, span or div elements
	*
        * Returns an array of elements
        *
	*/
	
    var CESCRIPT = function(selector){
        if(!is_initialized) is_initialized = true;
		if(selector==undefined||selector==document){
			msg('Without selector','debug');
			return this;
		}
		if(selector[0]=='#'){
			msg('Selector ID '+selector.substr(1),'debug');
			var node = document.getElementById(selector.substr(1));
			this[0] = node;
			this.length = 1;
			return this;
		}
		if(selector[0]=='.'){
			msg('Selector CLASS '+selector.substr(1),'debug');
			var nodes = document.getElementsByClassName(selector.substr(1));
			for(var i=0;i<nodes.length;i++){
				this[i] = nodes[i];
			}
			this.length = nodes.length;
			return this;
		}
		if(selector[0]=='<'&&selector[selector.length-1]=='>'){
			if(typeof selector !== 'object'){
				msg('Selector TAGNAME '+selector.substr(1,(selector.length-2)),'debug');
				var nodes = document.getElementsByTagName(selector.substr(1,(selector.length-2)));
				for(var i=0;i<nodes.length;i++){
					this[i] = nodes[i];
				}
				this.length = nodes.length;
				return this;
			}
		}
		// If we provide an object as selector, directly return the same object in an array back
		//if(selector[0]!='#'&&selector[0]!='.'&&selector[0]!='<'&&selector[selector.length-1]!='>'){
			if(typeof selector === 'object'){
				msg('Selector OBJECT '+selector,'debug');
				//console.log(selector);
				this[0] = selector;
				this.length = 1;
				return this;
			}
		//}
    };
    /** 
     * Call this after creating a function called "handleKeyCode" which can be called from the event handler , and which checks the parameter (referenced as "kc" by us) regarding key values
     *
     * Example call:
     * ceScript.startup(function()  
     * {
     * ...further initialization calls 
     * }
     */
    
	ceScript.startup = function(callback){

		window.onload = function(){

			if(navigator.appName=='Opera'){
				document.addEventListener("keypress",function(e){
					if(window.handleKeyCode(e.keyCode,e)) e.preventDefault();
				},false);
			}else{
				document.addEventListener("keydown",function(e){ 
					if(window.handleKeyCode(e.keyCode,e)) e.preventDefault();
				},false);
			}
			if(ceScript.fn.grid.isset(callback)) return callback();
			else return true;
		};

	};
	
	/**
	*
	* Example calls: ceScript.fn.{function name}
	*
	* Some functions are prototypes, i.e. use 
	* ceScript("#selector").removeClass, ceScript("#selector").addClass, ceScript("#selector").hasClass
	* ceScript("#selector").changeContent
	*/
    ceScript.fn = CESCRIPT.prototype = {
		msg: msg,
		getHash: function(){
            return (location.hash);
        },
        /** Returns the domain name, i.e. videoweb.de */
		getHost: function(){
            return (location.host);
        },
            /** Returns the name of the page without extension, i.e. index when the page is called index.php */
		getPageName: function(){
			return ceScript.fn.getUrl().replace(/.*\/(.*)(\.|\?|\/).*/,'$1');
		},
            /** Returns the port, i.e. 8888 for localhost:8888 */
		getPort: function(){
            return (location.port);
        },
        /** Returns http: or https: */
		getProtocol: function(){
            return (location.protocol);
        },
            /** Returns the current URL */
		getUrl: function(){
            return (location.href);
        },
           /** Changes window.location.href (the actual URL) */
		goUrl: function(url){
            return (location.href=url);
        },
           /** Reloads the current page */
		reload: function(){
            location.reload();
        },
         /** 
          *
          * Shows the div specified by container, which must be a selection string (i.e. '#div'), or hides it
          *
          * Internally uses the global boolean "use_output"
          *
          * Example call: $.fn.toggleDebug("debug_console","#debugout");
          * 
          * 
          * Use this in combination with html like this:
          * 
          * <div id="testarea" class="removed">
          *  <div id="debugout" class="removed">
          *  	<div id="debug_header"><strong>DEBUG</strong><br />Information about this debug window</div>
          *  	<div id="debug_console">
          *          <p>Debug window</p>
          *      </div>
          *  </div>
	  	  * </div>
          *
          **/
		toggleDebug: function(elm,container){
			if(use_output===false){
				ceScript(container).removeClass('removed'); // Show
				use_output = elm;
			}else{
				use_output = false;
				ceScript(container).addClass('removed'); // Hide
				ceScript('#'+elm).changeContent(''); // change innerHTML
			}
		},
        /**
         *
         * Adds a certain class to the className attribute of a tag, if it does not exist already. The name of the class which should get added gets passed as the parameter "className" to this function.
         *
         * If you specify an integer value using the parameter "i", addClass assumes that the object on which this was called is an array (starting at index 0) of elements 
         * and uses the element at the passed index for changes
         * 
         * If no i value is specified, addClass assumes it is just one dom object
         *
         */
         addClass: function(className,i){
			msg('addClass '+className,'debug');
			if(i==undefined){
				for(var i=0;i<this.length;i++){
					if(!this.hasClass(className,i)){
						if(this[i].className) this[i].className += " "+className;
						else this[i].className = className;
					}
				}
			}else{
				if(!this.hasClass(className,i)){
					if(this[i].className) this[i].className += " "+className;
					else this[i].className = className;
				}
			}
            return this;
        },
        /**
         *
         * Remove a certain class from the className attribute of a tag, which gets passed as the parameter "className" to this function
         *
         * For "i" the same is valid as what's been said about addClass and "i"
         *
         */
		removeClass: function(className,i){
			msg('removeClass '+className,'debug');
			//console.log(arguments);
			if(i==undefined){
				for(var i=0;i<this.length;i++){
					if(this.hasClass(className,i)){
						this[i].className = this[i].className.replace(className,'');
					}
				}
			}else{
				if(this.hasClass(className,i)){
					this[i].className = this[i].className.replace(className,'');
				}
			}
            return this;
        },
        /**
        *
        * Returns true if a the className tag contains the given class 
        *
        * For "i" the same is valid as what's been said about addClass and "i"
        */
        hasClass: function(className,i){
			msg('hasClass '+className,'debug');
			if(i==undefined){
				for(var i=0;i<this.length;i++){
					var str = ' '+this[i].className+' ';
					if(str.match(className)) return true;
					else return false;
				}
			}else{
				var str = ' '+this[i].className+' ';
				if(str.match(className)) return true;
				else return false;
			}
        },
        /** If the className already exists, remove it, otherwise add it */
		toggleClass: function(className){
			msg('toggleClass '+className,'debug');
            for(var i=0;i<this.length;i++){
				if(this.hasClass(className,i)) this.removeClass(className,i);
				else this.addClass(className,i);
            }
            return this;
        }
    };
    /** Extends the fn object, which is an array, by the given object - see below to see examples how this is used */
	ceScript.extend = ceScript.fn.extend = function(obj){
		for(var name in obj){
			ceScript.fn[name] = obj[name];
			ceScript.fn[name].msg = msg;
		}
	};
}());

/** 
 * 
 * Ajax function, call it the following way:
 *
 * ceScript.fn.ajax.call('GET',url,function() {
 *				alert("Callback handler");
 *	});
 * 
 * You can change the variable __REMOTE_CALL_ASYNC to switch from asynchronous to synchronous mode (in order to waits until the request has finished)
 **/
ceScript.fn.extend({
	ajax: {
		'__REMOTE_CALL_TIMEOUT': 30000,
		'__REMOTE_CALL_ASYNC': true,
		'call': function(method,url,func,args,timeout){
			var xmlHttp = null;
			var _timer = undefined;
			if(typeof XMLHttpRequest!='undefined') xmlHttp = new XMLHttpRequest();
			if(xmlHttp){
				ceScript.fn.ajax.msg('AJAX CALL : '+url,'debug');
				xmlHttp.open(method,url,ceScript.fn.ajax.__REMOTE_CALL_ASYNC);
				//xmlHttp.setRequestHeader("Accept","text/html");
				if(typeof(timeout)=='undefined') timeout = ceScript.fn.ajax.__REMOTE_CALL_TIMEOUT;
				_timer = setTimeout(function(){
					xmlHttp.abort();
				},timeout);
				xmlHttp.onreadystatechange = function(){
					if(xmlHttp.readyState==0) ceScript.fn.ajax.msg('AJAX CALL : State 0 "request not initialized"','debug');
					if(xmlHttp.readyState==1) ceScript.fn.ajax.msg('AJAX CALL : State 1 "server connection established"','debug');
					if(xmlHttp.readyState==2) ceScript.fn.ajax.msg('AJAX CALL : State 2 "request received"','debug');
					if(xmlHttp.readyState==3) ceScript.fn.ajax.msg('AJAX CALL : State 3 "processing request"','debug');
					if(xmlHttp.readyState==4){
						clearTimeout(_timer);
						if(xmlHttp.status==200){
							ceScript.fn.ajax.msg('AJAX CALL : State 4 "response received"','debug');
							if(func) func(xmlHttp.responseText,xmlHttp.status,xmlHttp);
						}else{
							ceScript.fn.ajax.msg('AJAX CALL : FAILED','debug');
							if(func) func('FAILED',xmlHttp.status,xmlHttp);
						}
					}
				};
				xmlHttp.setRequestHeader('X-Requested-With','XMLHttpRequest');
				xmlHttp.setRequestHeader('Content-Type','text/plain');
				xmlHttp.send(args);
			}
			return(xmlHttp);
		}
	}
});

/**
 * Handles preloading of images
 *
 * Example call:
 *
 * $.fn.preload.list(
 *				
 *				"<?=branded('img/background.jpg');?>",
 *				"<?=branded('img/pagination-normal.png');?>",
 * 				"<?=branded('img/pagination-active.png');?>", 
 *				"<?=branded('img/arrow.png');?>",
 *				"<?=branded('img/arrow-hover.png');?>",
 *				"<?=branded('img/arrow-black.png');?>",
 *				"<?=branded('img/more.png');?>",
 *				"<?=branded('img/updater.png');?>",
 *				"<?=branded('img/settings.png');?>",
 *				"3rdparty/tiles/android.png",
 *				"3rdparty/tiles/bildde.png",
 *				"3rdparty/tiles/putpat.png",
 *				"3rdparty/tiles/redbull.png",
 *				"wwwres/3rdparty/tiles/home.png",
 *				function(){
 * 				... further initialization, like $.fn.gui.chrome.background.use($('#testarea')[0]); and $.fn.grid.init
 * 				}
 */
ceScript.fn.extend({
	preload: {
		'index': 0, // This gets called after list -> listhandler -> createImage/createDocument got called (in the provided order; list calls listhandler calls createImage/createDocument), inside createImage or createDocument.
		'files': new Array(),
		'callback': false,
		'progress': false,
		'list': function(arr){
		        // Iterates over the arguments. The arguments object in JavaScript is a local variable in any function that provides some nice features we can use in our code.
			for(var i=0;i<arguments.length;i++){
				if (i==arguments.length-1) ceScript.fn.preload.callback = arguments[i]; // The last item in the arguments list must be the callback handler which gets called by listhandler
				else ceScript.fn.preload.files[i] = arguments[i]; // Add to file list until we reach the item which functions as callback handler
			}
			return ceScript.fn.preload.listhandler(); // start execution with listhandler
		},
                 // Gets called from 'list' and from 'createImage' and 'createDocument'
		'listhandler': function(){
			if(ceScript.fn.preload.progress!==false) ceScript.fn.preload.progress(); // By default, progress (in the variable list of this class) is set to false
			if(ceScript.fn.preload.index<ceScript.fn.preload.files.length){ // index is defined at the top and starts at 0
				return ceScript.fn.preload.handle(ceScript.fn.preload.files[ceScript.fn.preload.index]); // i.e. preload.handle("image.jpg")
                                                                                                                         // preload.handle returns the return value from createImage or createDocument
			}else{
				if(ceScript.fn.preload.callback!==false) return ceScript.fn.preload.callback();
				return true;
			}
		},
		'handle': function(url){
                        // These file extensions get used to call either createImage or createDocument
			var imageList = new Array('JPG','JPEG','PNG','GIF','BMP');
			var documentList = new Array('JS');
			var fontList = new Array('EOT','TTF','SVG');
			var fileFormat = ceScript.fn.fileFormat(url);
                        // Creates a new image object, thus preloading the image
			if(imageList.inArray(fileFormat)) return ceScript.fn.preload.createImage(url);
                        // Do an ajax call - and nothing
			if(documentList.inArray(fileFormat)) return ceScript.fn.preload.createDocument(url);
                        // Do an ajax call - and nothing
			if(fontList.inArray(fileFormat)) return ceScript.fn.preload.createDocument(url);
			ceScript.fn.preload.msg('Don\'t know file format of '+url+'! -SKIP','debug');
			ceScript.fn.preload.index = ceScript.fn.preload.index+1;
			return ceScript.fn.preload.listhandler();
		},
                // Gets called by handle for every image 
		'createImage': function(url) {
                        // Get called for every image, increases the index and continues execution with listhandler
			var elm = new Image(); // This is actually the point where the image pre-loading takes place - in two lines
			elm.src = url;	// Setting the src, thus pre-loading the image
			elm.onerror = function() // Set an error handler for the newly created element, so loading can go on
                        {
				ceScript.fn.preload.index = ceScript.fn.preload.index+1; // Thereafter, proceed with the next element
				return ceScript.fn.preload.listhandler();
			}
			elm.onload = function(){  // Set an error handler for the newly created element, so loading can go on
				ceScript.fn.preload.msg(url+' loaded!','debug');
				ceScript.fn.preload.index = ceScript.fn.preload.index+1; // Thereafter, proceed with the next element
				return ceScript.fn.preload.listhandler();
			}
		},
                // Gets called by handle for every document or font
                // In contrast to createImage, which creates a new image object, does an ajax call, and does nothing - let's hope the browser loads it faster the next time'
		'createDocument': function(url){
			ceScript.fn.ajax.call('GET',url,function(){
				ceScript.fn.preload.msg(url+' loaded!','debug');
				ceScript.fn.preload.index = ceScript.fn.preload.index+1;
				return ceScript.fn.preload.listhandler();
			});
		}
	}
});

/**
 *
 * Displays the time and updates it every 20 seconds
 *
 * <body onload="ceScript.fn.clock.clocktimer('#time','DE');">
 * 
 * Called through an onload handler
 *
 * <div id="time"></div>
 * <script>
 * ceScript.fn.clock.clocktimer('#time','DE');
 * </script>
 * 
 * If you are using inline script, position the inline script BEHIND the definition of the div which you are using for displaying the date, otherwise the div 
 * is not parsed previously and cannot be found.
 */
ceScript.fn.extend({
	clock: {
		timer: false,
                /** 
                 *
                 * Returns something like: <strong>January 1</strong>, 2013 (today's date)
                 * Call it the following way: ceScript.fn.clock.today()
                 *
                 **/
 		today: function(format){
		   var d = new Date();
		   var y = d.getFullYear();
		   var m = d.getMonth()+1;
		   var d = d.getDate();
		   if(format=='DE'){
			   var month = new Array("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");
			   if(m<10) m = '0'+m;
			   if(d<10) d = '0'+d;
			   return '<strong>'+d+'.'+month[m-1]+'</strong> '+y;
		   }else{
			   var month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
			   if(m<10) m = '0'+m;
			   if(d<10) d = '0'+d;
			   return '<strong>'+month[m-1]+' '+d+'</strong>, '+y;
		   }
		   return y+'-'+m+'-'+d;
		},
                /**
                 *
                 * Returns the time, i.e. 11:04 or 11:04 a.m./p.m.
                 *
                 * Call it the following way: ceScript.fn.clock.now('DE') or ceScript.fn.clock.now('EN')
                 *
                 */
		now: function(format){
		   var d = new Date();
		   var h = d.getHours();
		   var m = d.getMinutes();
		   if(h<10) h = '0'+h;
		   if(m<10) m = '0'+m;
		   if(format=='DE'){
			   return '<strong>'+h+':'+m+'</strong> Uhr';
		   }
		   if(format=='EN'){
			   suffix = 'a.m.';
			   if(h>12){
				   h = h-12;
				   suffix = 'p.m.';
			   }
			   return '<strong>'+h+':'+m+'</strong> '+suffix;
		   }
		   return h+':'+m;
		},
                /**
                 *
                 * Returns today's date and the current time, for easier callup
                 *
                 */
		timerout: function(format) {
			return	ceScript.fn.clock.today(format)+' | '+ceScript.fn.clock.now(format);
		},
                /**
                 *
                 * Call clocktimer with a DOM element, adding 'EN' or 'DE' as format, to update the time (i.e. January 1, 2013 11:04) every 20 seconds
                 *
                 */
		clocktimer: function(container,format) {
                        var v = ceScript.fn.clock.timerout(format);
                        var c = ceScript(container);
                        
                        
			ceScript(container).changeContent(v);
                        
                        ceScript.fn.clock.timertimer = window.setInterval(function(){ceScript(container).changeContent(ceScript.fn.clock.timerout(format));},20000);
		}
	}
});

/**
 *
 * Countdown functionality - counts down (not up)
 * 
 * Call it the following way:
 * 
 * ceScript.fn.count.start(10, 0, document.getElementById('counter'), function() { alert("CALLBACK"); });
 *
 */
ceScript.fn.extend({
	count: {
		is_running: false,
		__timeout: false,
		down: {
			'layer': false,
			'speedVal': 1000,
			'startVal': 0,
			'endVal': 0,
			'currVal': 0,
			'__timeout': false,
            /** Call this to start the timer. It automatically calls progress */
			'start': function(start,end,layer,callback){
				ceScript.fn.count.is_running = true;
				ceScript.fn.count.down.layer = layer;
				ceScript.fn.count.down.startVal = start+1;
				ceScript.fn.count.down.endVal = end; // i.e. 0
				ceScript.fn.count.down.currVal = start+1; // i.e. 8
				ceScript.fn.count.msg('COUNTDOWN - START : started the countdown!','info');
                                // i.e. start=10 end=0
				if (start>end) return ceScript.fn.count.down.progress(callback);
                                // otherwise, if we reached "end", call finish
				else return ceScript.fn.count.down.finish(callback);
			},
                        /** Gets called by start and calls itself using a timeout */
			'progress': function(callback){
				ceScript.fn.count.is_running = true;
                                
                                // As long as we are counting...
				if(ceScript.fn.count.down.currVal>ceScript.fn.count.down.endVal){
                                        // Decrease the current value by one
					ceScript.fn.count.down.currVal = ceScript.fn.count.down.currVal-1;
                                        // Update the layer
					if(ceScript.fn.count.down.layer!==false){
						ceScript.fn.count.down.layer.innerHTML = ceScript.fn.count.down.currVal;
					}
					ceScript.fn.count.msg('COUNTDOWN - PROGRESS : running the countdown! '+ceScript.fn.count.down.currVal,'debug');
					return ceScript.fn.count.down.__timeout = window.setTimeout("ceScript.fn.count.down.progress("+callback+")",ceScript.fn.count.down.speedVal);
				}else return ceScript.fn.count.down.finish(callback);
			},
                        /** When everything is finished, called by progress,  but also by start (if you made a mistake and "start" is lower than "end" */
			'finish': function(callback){
				ceScript.fn.count.down.__timeout = clearTimeout(ceScript.fn.count.down.__timeout);
				ceScript.fn.count.down.__timeout = false;
                                // Update the layer
				if(ceScript.fn.count.down.layer!==false){
					ceScript.fn.count.down.layer.innerHTML = ceScript.fn.count.down.endVal;
					ceScript.fn.count.down.layer = false;
				}
                                // Reset values
				ceScript.fn.count.down.startVal = 0;
				ceScript.fn.count.down.endVal = 0;
				ceScript.fn.count.down.currVal = 0;
				ceScript.fn.count.is_running = false;
				ceScript.fn.count.msg('COUNTDOWN - FINISH : finished the countdown!','info');
				if(callback) callback();
			}
		}
	}
});

/**
 *
 * More helper functions
 *
 */
ceScript.fn.extend({
    
        /** 
         *
         * Loads a stylesheet with the given url, by creating a new link attribute in the node on which this is called
         *
         **/
	loadCSS: function(url,callback){
		elm = document.createElement('link');
		elm.setAttribute('rel','stylesheet');
		elm.setAttribute('href',url);
		for(var i=0;i<this.length;i++){
			this[i].appendChild(elm);
		}
		ceScript.fn.preload.msg(elm+' appended!','debug');
		if(callback) callback();
		return this;
	},
	/** 
         *
         * Example: ceScript.fn.fileFormat(url) - returns the extension in uppercase ("COM")
         *
         **/
	fileFormat: function(url){
		pDot = url.lastIndexOf(".");
		if(pDot!=-1){
			sSuffix = url.substr(pDot+1);
			if(sSuffix.length>0) return sSuffix.toUpperCase();
		}
		return false;
	},
        /**
         *
         * Hides an array of dom elements (i.e. all children of a <ul> node")
         *
         * Used in combination with a selector
         * 
         * Example: ceScript(".test").hide();
         * 
         */
	hide: function(){
		for(var i=0;i<this.length;i++){
			this[i].style.display = 'none';
		}
		return this;
	},
        /**
         *
         * Removes the element on which this "remove" function is called, of course by using pure javascript and the well-known parent.removeChild
         *
         * Used in combination with a selector
         *
         * Example:
         * 
         * ceScript("#overlayarea").remove();
         *
         */
	remove: function(){
		for(var i=0;i<this.length;i++){
			this[i].parentNode.removeChild(this[i]);
		}
		return this;
	},
        /**
         *
         * Used in combination with a selector to find out if the element could get selected:
         * 
         * if(ceScript("#overlayarea").exists()){
         *
         */
	exists: function(){
		var element = this[0];
		if (typeof(element)!=undefined&&element!=null) return true;
		else return false;
	}
});

/**
 *
 * Functionality to change the innerHTML of an element, provides additional changeContentTemporary for working with a timer
 *
 * Example call:
 * 
 * ceScript('#'+elm).changeContent('new content');
 * ceScript('#'+elm).changeContentTemporary('new content', 3000); // Show the new content for 3 seconds, thereafter restore the original content
 *
 */
ceScript.fn.extend({
	changeContent: function(content){
		for(var i=0;i<this.length;i++){
			this[i].innerHTML = content;
		}
		return this;
	},
	changeContentTemporaryDB: [],
        /**
        *
        * Sets the innerHTML of the given DOM element just for a certain amount of time, and restores it using 'rechangeContentTemporary'
        *
        */
	changeContentTemporary: function(content,time){
		for(var i=0;i<this.length;i++){
			if(ceScript.fn.changeContentTemporaryDB[this[i].id]==undefined||ceScript.fn.changeContentTemporaryDB[this[i].id]===false){
				ceScript.fn.changeContentTemporaryDB[this[i].id] = [];
				ceScript.fn.changeContentTemporaryDB[this[i].id]['content'] = this[i].innerHTML;
			}else{
				window.clearTimeout(ceScript.fn.changeContentTemporaryDB[this[i].id]['timer']);
			}
			theID = this[i].id;
			ceScript.fn.changeContentTemporaryDB[this[i].id]['timer'] = window.setTimeout(function(){ceScript.fn.rechangeContentTemporary(theID);},time);
			this[i].innerHTML = content;
		}
		return this;
	},
	rechangeContentTemporary: function(id){
		ceScript("#"+id)[0].innerHTML = ceScript.fn.changeContentTemporaryDB[id]['content'];
		window.clearTimeout(ceScript.fn.changeContentTemporaryDB[id]['timer']);
		ceScript.fn.changeContentTemporaryDB[id] = false;
	}
});

/**
 *
 * Graphical user interface helper
 *
 */
ceScript.fn.extend({
	gui: {
		overlay: {
			'cssContainer': 'display: block;opacity: 1;position: absolute;top: 50%; left: 50%;margin-left: -640px;margin-top: -360px;width: 1280px;height: 720px;overflow: hidden;z-index: 95;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAALQCAYAAADPfd1WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAMA5JREFUeNrs3LGrp2d6HuD3NwiSLsFFwLvGfk28IUmTJ8wBp1iYox1SuTFpN5BZ/wfTBWM0MyIYB3f5A+w3xTYuwqZwZWulYosYjmCLQEKWsCKwLgMuU30pNDIuUkjyM5l5dF8XGPG5eNm5V7qPnmH2vl3r8cfrc69e//WFb9++ffv27du372/s92+stb4vD9++ffv27du375zv27UeX2ut2wJglutBBsBXd7t7tq6HIwgA+Mo/Q2XAVC8frbXelwMAQIx/JgIAgChPHq217uUAABCjRAAAEOX+0VrriRwAAGI8FwEAQJT3/QlAAIAsJQIAgCj3NgABALLYAAQAyGIDEAAgTIkAACCKDUAAgDA2AAEAstgABAAIUyIAAIhiAxAAIIwNQACALDYAAQDClAgAAKLYAAQACGMDEAAgiw1AAIAwJQIAgCg2AAEAwtgABADIYgMQACBMiQAAIIoNQACAMDYAAQCy2AAEAAhTIgAAiGIDEAAgjA1AAIAsNgABAMKUCAAAotgABAAIYwMQACCLDUAAgDAlAgCAKDYAAQDC2AAEAMhiAxAAIEyJAAAgig1AAIAwNgABALLYAAQACFMiAACIYgMQACCMDUAAgCw2AAEAwpQIAACi2AAEAAhjAxAAIIsNQACAMCUCAIAoNgABAMLYAAQAyGIDEAAgTIkAACCKDUAAgDA2AAEAstgABAAIUyIAAIhiAxAAIIwNQACALE9u13r8cq31MjSAX6y1vuXvAwAAAIBvtL9ca3079Nd+vbeyNwC/ta6Hm38GALLcXqx9vVqfSYLMfwDual0PPxUEwT8Dnl2v1pEEQNy/A13Bv3obgABE2iIgWIkAPwMAIIoNQAAcfxDGBiDpjggACPPEnwAEINEWAcFKBPgZAABR7h+t7A1AADIdERDsuQgIt0UAQBgbgAA4/iBMiQA/AwAgig1AABx/EMYGIOmOCAAIYwMQgEhbBAQrEeBnAABEsQEIQKQjAoLZACTdFgEAYWwAAuD4gzAlAvwMAIAoNgABcPxBGBuApDsiACCMDUAAIm0REKxEgJ8BABDFBiAAkY4ICGYDkHRbBACEsQEIgOMPwpQI8DMAAKLYAATA8QdhbACS7ogAgDA2AAGItEVAsBIBfgYAQBQbgABEOiIgmA1A0m0RABDGBiAAjj8IUyLAzwAAiGIDEADHH4SxAUi6IwIAwtgABCDSFgHBSgT4GQAAUWwAAhDpiIBgNgBJt0UAQBgbgAA4/iBMiQA/AwAgig1AABx/EMYGIOmOCAAIYwMQgEhbBAQrEeBnAABEsQEIQKQjAoLZACTdFgEAYWwAAuD4gzAlAvwMAIAoNgABcPxBGBuApDsiACCMDUAAIm0REKxEgJ8BABDFBiAAkY4ICGYDkHRbBACEsQEIgOMPwpQI8DMAAKLYAATA8QdhbACS7ogAgDA2AAGItEVAsBIBfgYAQBQbgABEOiIgmA1A0m0RABDGBiAAjj8IUyLAzwAAiGIDEADHH4SxAUi6IwIAwtgABCDSFgHBSgT4GQAAUe5v13r88cr9U4DXuh5u0X8L3O4u/xwAAADAN5zf/7jWWqkZ3L+3/AlAcv8BgOk/wGXwdUvvxbq/Xq1Put99um4vP1rXSwnzjv/L77N1PRxBvNUO4kv43qvb/Y9fXJ+8gadfvv4/gK/2r98f3o3+j++/wWg2AAGItN/Qu0e0DGADEF0NAFlsAALgqBzwLnQqEaCrASDK/aO11hM5ABDmOCoJ9lwE6GoAiPK+PwEIQKI97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAsjx5b33+JwA/SfuV3z54+LvXh3fr9uKv/wTkF3/9JOn7+jyL+9Rfv2/fo79fyONv8/0m+v9XfvM/1O0v1t+Xr+93+ft//NKv/vY/erH+szx8v+vf//VP/uTZ+vw3Ad/E+1vevn37/sr//vjBw9j//H7/4/Pf/wh2f7vW449X7p8CvNb1cIv+W+B2d621sjOAsQ32IIOvW30v1r5erc+63326bs8+WteRMO/4z/5a18NPBfFWO4gv4XuvbvvHL67P3sDTz5Y/BQh8nX/9/vBu9H98v/8R/fsf9zYAAUi0h70LnUoE6GoAiGIDEABHZaMjWgawAYiuBoAsT/wJQAAcle/+u9CpRICuBoAo94/WWk/kAECY46gk2HMRoKsBIMr7/gQgAIn2sHehU4kAXQ0AUWwAAuCobHREywA2ANHVAJDFBiAAjsoB70KnEgG6GgCi2AAEINJxVBLMBiC6GgCy2AAEINIe9i50KhGgqwEgig1AAByVjY5oGcAGILoaALLYAATAUTngXehUIkBXA0CU+9u1Hn+8cv8U4LWuh1v03wK3u+vp9ekP1lqffPE3xeu/+vbt2/c39vt//tkf/Mo//Jf/9jfk4Tvx+3e//+v/9Pd/+PN/IA/fqd//7Ud/9Hv/5Ld/5yfy8O3bd9L3R7fHP/f7H3fXWis1g/vbtR4nB+A3ALP/AYDhDfYgg69bfS/W/fXqr//FqM3TdXv50bpeSph3/Gf/s3U9HEG81Q7iS/jeq9v9j19cn7yBp1++/j+Ar/av3x/ejf6P7/c/on//46UNQAAS7Tf07hEtA9gARFcDQBYbgAA4Kge8C51KBOhqAIhy/2it9UQOAIQ5jkqCPRcBuhoAorzvTwACkGgPexc6lQjQ1QAQ5d4GIACOyj5HtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQJT799ZaT9b1kPnLv935WwDQYYk+eDhvJL9rbf+9MMBzf5++9Q6SwZdz3tC7W7QAoXJ//8sGIACR9rB3oVOJAF0NAFFsAALgqGx0RMsANgDR1QCQ5cntWo9/tNb60Vrr37z+f/7H139N+L5fa/0g6Nf7//r+IoPUX79v374Dv3/2S7+6v/O//9er7vf/y2/91T/+F3/6935T3r59+/b9t//+xXf+z4tv/+zvfNb9/p9+57t/8Vs/+8l/l7dv3779/off/0j67/92rccfr+sh808B3u6udT3con8P+HZ3rbWyMwDyqu+Dh319ePdZ97tPr0+ffXR7fCTMO67WWj8Vw1t02QD8Up26bvujdbV39e3Fena98qcAga91P4/+6eP3P4J/D+h2d28DEIBEe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDI8sSfAATAUfnuvwudSgToagCIcv9orfVEDgCEOY5Kgj0XAboaAKK8708AApBoD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiHL/3rIBGO/p9emztdYnX/xN8fqvvn379v2N/f61P/v3f/66+9rff3p9uuXt+13+/t3v//of/v4Pf/5MHm/z+yaPL/d9nq7b7n7/l//5H/3rp+t3tnx9+/b9lb+vuf/5P7o99psf2d6/Xevxta6HW+Qv/3aX+2v/mxmsdfPPAhBVfR883F8f3n3S/e7T69OXH90ev5Qw77hny/8E8u26HmTwZTp13e4/Wld7V99erJfXq6Wrga9zP4/+6eP3P+6Sf//rpQ1AABLtN/TuES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiHL/aNkABCDPcVQS7LkI0NUAEOV9fwIQgER72LvQqUSArgaAKPc2AAFwVPY5omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgyv17K3QD8PZiPbo+/+uz1/+vT74IJen7WmvdPnh4lvrr9+3bd+z3ed19re//8o/++Lu3D37wmXx9v8vfP/xPv/eH3/9X/+6ZPN7i9wt5fJnvX/vuH/z57Sdrv4H39+sbQN6+ffv+at8fPIz9z399eOf3P7J/A/D927UeX+t6uEX+8m93ub/2v5nBWtkZAHnV98HD/fXh3Sfd7z69Pn350e3xSwnzjnu2/E8g367rQQZfplPX7f6jdbV39e3Fenm9Wroa+Dr38+ifPn7/4y75979e2gAEINF+Q+8e0TKADUB0NQBksQEIgKNywLvQqUSArgaAKPePVugGIADRjqOSYM9FgK4GgCjv+xOAACTaw96FTiUCdDUARLm3AQiAo7LPES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASCLDUAAHJUD3oVOJQJ0NQBEsQEIQKTjqCSYDUB0NQBksQEIQKQ97F3oVCJAVwNAFBuAADgqGx3RMoANQHQ1AGSxAQiAo3LAu9CpRICuBoAoNgABiHQclQSzAYiuBoAsNgABiLSHvQudSgToagCIYgMQAEdloyNaBrABiK4GgCw2AAFwVA54FzqVCNDVABDFBiAAkY6jkmA2ANHVAJDFBiAAkfawd6FTiQBdDQBRbAAC4KhsdETLADYA0dUAkMUGIACOygHvQqcSAboaAKLYAAQg0nFUEswGILoaALLYAAQg0h72LnQqEaCrASCKDUAAHJWNjmgZwAYguhoAstgABMBROeBd6FQiQFcDQBQbgABEOo5KgtkARFcDQBYbgABE2sPehU4lAnQ1AESxAQiAo7LRES0D2ABEVwNAFhuAADgqB7wLnUoE6GoAiGIDEIBIx1FJMBuA6GoAyGIDEIBIe9i70KlEgK4GgCg2AAFwVDY6omUAG4DoagDIYgMQAEflgHehU4kAXQ0AUWwAAhDpOCoJZgMQXQ0AWWwAAhBpD3sXOpUI0NUAEMUGIACOykZHtAxgAxBdDQBZbAAC4Kgc8C50KhGgqwEgig1AACIdRyXBbACiqwEgiw1AACLtYe9CpxIBuhoAotgABMBR2eiIlgFsAKKrASDLk9u1Hr9c18PLyF/+7e5a18Mt+m+B293lnwMAAAD4hvP7H7m/B3S7u95bNgAVADC1xGXwdaP74GFfH959JglC1Vrrp2J4q//+JYO3+TPgxXp2vfKnAAGIYgMQgEhbBAQrEeBnAABEsQEIgOMPwtgAJN0RAQBhnvgTgAAk2iIgWIkAPwMAIMr9o2UDEIA8RwQEey4Cwm0RABDGBiAAjj8IUyLAzwAAiGIDEADHH4SxAUi6IwIAwtgABCDSFgHBSgT4GQAAUWwAAhDpiIBgNgBJt0UAQBgbgAA4/iBMiQA/AwAgig1AABx/EMYGIOmOCAAIYwMQgEhbBAQrEeBnAABEsQEIQKQjAoLZACTdFgEAYWwAAuD4gzAlAvwMAIAoNgABcPxBGBuApDsiACCMDUAAIm0REKxEgJ8BABDFBiAAkY4ICGYDkHRbBACEsQEIgOMPwpQI8DMAAKLYAATA8QdhbACS7ogAgDA2AAGItEVAsBIBfgYAQBQbgABEOiIgmA1A0m0RABDGBiAAjj8IUyLAzwAAiGIDEADHH4SxAUi6IwIAwtgABCDSFgHBSgT4GQAAUWwAAhDpiIBgNgBJt0UAQBgbgAA4/iBMiQA/AwAgig1AABx/EMYGIOmOCAAIYwMQgEhbBAQrEeBnAABEsQEIQKQjAoLZACTdFgEAYWwAAuD4gzAlAvwMAIAoNgABcPxBGBuApDsiACCMDUAAIm0REKxEgJ8BABDFBiAAkY4ICGYDkHRbBACEsQEIgOMPwpQI8DMAAKLYAATA8QdhbACS7ogAgDA2AAGItEVAsBIBfgYAQJT727Uef7yuh8w/BXi7+8Va61v+PgAAAAD4RvvLdT18O/JXfru7f28l/wnA1P/igW9KicsA+DqeLf8TyLf976AyAAD+f7IBCAAQxgYgAEAWG4AAAGFKBAAAUe4frbWeyAEAIMZzEQAARHnfnwAEAMhSIgAAiGIDEAAgjA1AAIAsNgABAMKUCAAAotgABAAIYwMQACCLDUAAgDAlAgCAKDYAAQDC2AAEAMhiAxAAIEyJAAAgig1AAIAwNgABALLYAAQACFMiAACIYgMQACCMDUAAgCw2AAEAwpQIAACi2AAEAAhjAxAAIIsNQACAMCUCAIAoNgABAMLYAAQAyGIDEAAgTIkAACCKDUAAgDA2AAEAstgABAAIUyIAAIhiAxAAIIwNQACALDYAAQDClAgAAKLYAAQACGMDEAAgiw1AAIAwJQIAgCg2AAEAwtgABADIYgMQACBMiQAAIMr9e2utJ+t2JwqAaa4HGQBf3e3uuf4AgK/1M1QGTGUDEAAgTIkAACCKDUAAgDA2AAEAstgABAAIUyIAAIhy/2it9UQOAAAxnosAACCKDUAAgDAlAgCAKDYAAQDC2AAEAMjy5L31+Z8AvF9rvXj9/3z1+q++ffv27ftd/r7dycO3b99ftz/+Sh6+ffv27du3b9853/93AJwoyouzh/B/AAAAAElFTkSuQmCC) no-repeat center center;',
			'show': function(){
				if(!ceScript("#overlayarea").exists()){
					elmOverlay = document.createElement('div');
					elmOverlay.id = 'overlayarea';
					elmOverlay.setAttribute('style',ceScript.fn.gui.overlay.cssContainer);
					document.body.appendChild(elmOverlay);
				}
			},
			'hide': function(){
				if(ceScript("#overlayarea").exists()){
					ceScript("#overlayarea").remove();
				}
			}
		},
		chrome: {
                        /** 
                         *
                         * Example call: 
                         * 
                         * $.fn.gui.chrome.background.use($('#testarea')[0]);
                         *
                         * Move the given element #testarea into an element called "maincanvas" which is a child div of the body element. If maincanvas does not exist yet, it gets created.
                         * The css for the maincanvas is specified in the variable background.css
                         * In the end everything from #testarea is contained inside the div maincanvas, providing a background containing the color #222
                         *
                         **/
			background: {
				'element': false,
				'cssBase': 'display: block;opacity: 1;position: absolute;top: 50%; left: 50%;margin-left: -640px;margin-top: -360px;width: 1280px;height: 720px;overflow:hidden;background: #222;z-index: 1;',
                                /**
                                 *
                                 * Gets called from $.fn.gui.chrome.background.use
                                 *
                                 * Creates a div with the id "maincanvas", sets the background to #222 (or to the css from cssBase) and appends the maincanvas to the body
                                 *
                                 * Sets "element" to the newly created div/element
                                 *
                                 */
				'build': function(){
					if(!ceScript("#maincanvas").exists()){
                                                /* Create a div with the id "maincanvas" */
						baseElm = document.createElement('div');
						baseElm.id = 'maincanvas';
                                                /* set the background to the css from cssBase */
						baseElm.setAttribute('style',ceScript.fn.gui.chrome.background.cssBase);
						document.body.appendChild(baseElm);
                                                /* append the maincanvas to the body */
						ceScript.fn.gui.chrome.background.element = ceScript("#maincanvas")[0];
					}
				},
                                 /**
                                  *
                                  * Calls 'build' for creating a div with the id "maincanvas"
                                  * 
                                  * Removes the provided element which gets passed with the parameter name "elm" and adds it to maincanvas
                                  *
                                  * Example call:
                                  * 
                                  * $.fn.gui.chrome.background.use($('#testarea')[0]);
                                  * 
                                  * Returns the newly created element
                                  * 
                                  */
				'use': function(elm){
					ceScript.fn.gui.chrome.background.build(); // This is where maincanvas gets added to the body
					//ceScript("#maincanvas")[0].innerHTML = elm.innerHTML;
					
					container = ceScript("#maincanvas")[0];
					//console.log(container);
					//childs = elm.childNodes;
					//console.log(childs);
					container.appendChild(elm.parentNode.removeChild(elm));
					
					
					/*
					//container.appendChild(childs);
					console.log(childs.length);
					for(var i=0;i<childs.length;i++){
						//if(typeof childs[i] !== 'object'){
					console.log(i);
							console.log(childs[i]);
							container.appendChild(childs[i]);
						//}
					}
										
					//var content = elm;
					//$(elm).remove();
										
					//var item = $('#item-id');  // item to move
					//var want = $('#new-div');  // container to receive it
					//item.remove();
					//want.append(item);
										
					/*
					for(var i=0;i<this.length;i++){
						console.log('fack');
						ceScript("#maincanvas")[0].innerHTML(this[i].innerHTML);
						console.log('fickj');
						//$(this[i]).remove();
					}
					*/
					return ceScript.fn.gui.chrome.background.element;
				}
			}
		},
                /**
                 *
                 * Take a look at the function description of "build" to see how to call this. You must have initialized a functional grid beforehand for this to work.
                 *
                 */
		popup: {
			// requires gridJS 0.9.5
			'cssBase': 'display: block;opacity: 1;position: absolute;top: 50%; left: 50%;margin-left: -640px;margin-top: -360px;width: 1280px;height: 720px;overflow:hidden;background: rgba(40,40,40,0.75);z-index: 99;',
			'cssContent': 'display: inline-block;position: absolute;top: 0; bottom: 0; left: 0; right: 0;margin:  auto auto;width: 600px;min-width: 300px;max-width: 900px;height: auto;height:350px;min-height: 150px;max-height: 600px;text-align: left;background: #000;border-radius: 15px;border: #fff 3px solid;box-shadow: 0 5px 50px #000;overflow: hidden;font-family: Arial, Helvetica, sans-serif;',
			'cssHeadline': 'margin:0;padding: 20px;padding-bottom: 12px;line-height: 1em;letter-spacing: 1px;font-size: 26px;color: #fff;background: #282828;border-top-left-radius: 15px;border-top-right-radius: 15px;border-bottom: #ffac00 2px solid;',
			'cssParagraph': 'margin:0;line-height: 1.2em;letter-spacing: 1px;padding: 20px;font-size: 22px;color: #ddd;',
			'cssPopupMenu': 'ul.popupmenu{text-align:center;position: relative;display: block;list-style: none;margin: 50px;margin-top: 10px;padding: 0;border-bottom: none;overflow: hidden;color: #eee;font-size: 22px;}ul.popupmenu.current{}ul.popupmenu li{position: relative;display:inline-block;margin: 0;padding: 7px 30px;border-radius: 7px;width: auto;border: none;}ul.popupmenu.current li.active{color: #000;background: #ffac00;}',
			'layer': new Array(),
			'prevMenu': false,
			'searchElementByName': function(str){
                                // Select the layer
				var elms = ceScript.fn.gui.popup.layer;
				for(i=0;i<elms.length;i++) if(elms[i].name==str) return i;
				return false;
			},
                        /* Evaluates the parameters provided, i.e.
                         * 
                         * ceScript.fn.gui.popup.build({
			 *	name: 'popupeins',
                         *      width: '600px',
			 *	height: '500px',
			 *	headline: 'Überschrift',
			 *	content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
			 *	buttons:{
			 *		'01':{
			 *			'name': 'Weiter',
			 *			'action': 'console.log(\'WEITER!\');'
			 *		},
			 *		'02':{
			 *			'name': 'Abrechen',
			 *			'action': '$.gui.popup.hide(\'popupeins\');'
			 *		}
			 *	},
			 *	callback: ....
                         * 
                         */
			'build': function(vars){
				if(vars!=undefined){
                                        // Set the callback handler which gets called right after this function
					callback = vars.callback!=undefined?vars.callback:false;
                                        // If the popup was not added before...
					if(ceScript.fn.gui.popup.searchElementByName(vars.name)===false){
                                                // Create a new one...
						elmBase = document.createElement('div');
						elmBase.setAttribute('style',ceScript.fn.gui.popup.cssBase);
						
						elmContent = document.createElement('div');
                                                
                                                // Use the style from the variable cssContent
						elmContent.setAttribute('style',ceScript.fn.gui.popup.cssContent);
                                                
                                                // also evaluate vars.width and vars.height
						if(vars.width!=undefined) elmContent.style.width = vars.width;
						if(vars.height!=undefined) elmContent.style.height = vars.height;
						
                                                // Create a header element from vars.headline
						elmHeadline = document.createElement('h1');
						elmHeadline.setAttribute('style',ceScript.fn.gui.popup.cssHeadline);
						elmHeadline.innerHTML = vars.headline!=undefined?vars.headline:'Information';
						
                                                // Create the p element from vars.content
						elmParagraph = document.createElement('p');
						elmParagraph.setAttribute('style',ceScript.fn.gui.popup.cssParagraph);
						elmParagraph.innerHTML = vars.content!=undefined?vars.content:'&nbsp;';
						
						elmContent.appendChild(elmHeadline);
						elmContent.appendChild(elmParagraph);
						
                                                // Evaluate the buttons parameter
						buttons = vars.buttons!=undefined?vars.buttons:false;
						if(buttons!==false) {
							elmButtons = document.createElement('ul');
							elmButtons.setAttribute('id','popupmenu'+vars.name);
							elmButtons.setAttribute('class','popupmenu');
							elmButtons.style.background = '';
							for(var i in buttons){
								action = buttons[i].action!=undefined?buttons[i].action:'';
								hoveraction = buttons[i].hoveraction!=undefined?buttons[i].hoveraction:'';
                                                                // Create a <li> element for every button
								elmButtons.innerHTML = elmButtons.innerHTML+'<li action="'+action+'" hoveraction="'+hoveraction+'">'+buttons[i].name+'</li>';
							}
							elmContent.appendChild(elmButtons);
							
							if(ceScript('#popupmenusheet').exists()===false){
								headCSS = document.createElement('style');
								headCSS.setAttribute('id','popupmenusheet');
								headCSS.innerHTML = ceScript.fn.gui.popup.cssPopupMenu;
								document.head.appendChild(headCSS);
							}
							
						}
						
						elmBase.appendChild(elmContent);
						
                                                // Push it to the layers
						ceScript.fn.gui.popup.layer.push({
							'name': vars.name,
							'container': elmBase
						});
						
					}
					if(callback!=false) return callback();
				}
			},
			'show': function(id){
                                /** 
                                 *
                                 * show should be called in the callback handler when calling build during the initialization process of the popup
                                 * (when the popup sould appear), take a look at the callback definition in the following code:
                                 *
                                 *  ceScript.fn.gui.popup.build({
				 *  name: 'popupeins',
                                 *  ...
                                 *  content: 'Lorem ipsum dolor sit amet',
                                 *   buttons:{
				 * 	...
                                 *   },
                                 *   callback: function(){
                                 *   ceScript.fn.gui.popup.show('popupeins');
				 * }
                                 * 
                                 */
                                
                                
				ceScript.fn.gui.popup.prevMenu = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].name;
				document.body.appendChild(ceScript.fn.gui.popup.layer[ceScript.fn.gui.popup.searchElementByName(id)].container);
				ceScript.fn.grid.element('popupmenu'+id,{
					'name': 'popupmenu'+id,				// ([A-Za-z])* -No Spaces, no special chars, UNIQUE
					'type': 'horizontal',				// vertical | horizontal | grid
					'key':{
						'ENTER': function(lib,elm){
							ceScript.fn.grid.doit('action');
						},
						'EXIT': function(lib,elm){
							ceScript.fn.gui.popup.hide(id);
						}
					},
					'hover': function(lib,elm){
						lib.doitHover('hoveraction',120);
					}
				});
				ceScript.fn.grid.use('popupmenu'+id);
				
			},
                        /**
                         *
                         * Removes the popup menu of the given id, i.e. popupeins - using grid.del - so it is really removed and not just hidden
                         *
                         */
			'hide': function(id){
				ceScript(ceScript.fn.grid.activeItem()).removeClass(ceScript.fn.grid.itemsActiveClassName);
				ceScript.fn.grid.use(ceScript.fn.gui.popup.prevMenu);
				ceScript.fn.grid.del('popupmenu'+id);
				document.body.removeChild(ceScript.fn.gui.popup.layer[ceScript.fn.gui.popup.searchElementByName(id)].container);
				ceScript.fn.gui.popup.prevMenu = false;
			}

		}
	}
});
ceScript.gui = ceScript.fn.gui;

/**
 *
 * gridJS - take a look at the larger function descriptions, like 'init', 'sel', 'use' etc.
 * 
 * An introduction to gridJS is available on our website
 *
 */ 
ceScript.fn.extend({
	grid: {
	//	GLOBAL VARIABLES
		'NAME': 'gridJS',
		'VERSION': '0.9.6',
		'RELEASE': '2012-05-08',
		'AUTHOR': 'Christian Hockenberger (VideoWeb GmbH)',
		'is_initialized': false,
		'use_console': true,
		'use_debug': false,
	//	LIB VARIABLES
		'elements': new Array(),
		'elementsLenght': 0,
		'elementsCurrent': false, // // Contains which element is the current and element, and gets changed using this.set
		'elementsCurrentClassName': 'current', // Placeholder is used several times, used for indicating which <ul> element is the current one
		'itemsActiveClassName': 'active', // This also is a placeholder, used for indication which <li> element is the active one
		'__style': false,
		'__timeout': false,
	//	GLOBAL FUNCTIONS
		/** Standard getter, replacement for document.getElementById, use without # */
		'id': function(id){
			/* Simplify code */
			return document.getElementById(id);
		},
		/** Used by 'init' to find out if a function got passed as callback handler, or the type of the parameter != "undefined" */
		'isset': function(){
			/* Simplify code */
			var a=arguments; var l=a.length; var i=0;
			while(i!=l){
				if(typeof(a[i])=='undefined') return false;
				else i++;
			}
			return true;
		},
		/** Checks if the parameter is numeric */
		'isint': function(input){
			/* Simplify code */
			return typeof(input)=='number'&&parseInt(input)==input;
		},
		/** Checks if the passed parameter is a function */
		'isfunction': function(input){
			/* Simplify code */
			return typeof(input)=='function';
		},
		/** Checks if the parameter is a string */
		'isstring': function(input){
			/* Simplify code */
			return typeof(input)=='string';
		},
        /** 
         *
         * Initialize the grid in the following way: 
         * 
         * gridJS.init('fancy',function(init) {
         * ...
         * });
         * 
         * Calls the callback function with the parameter init, which is pointing to this (this class)
         * 
         **/
		'init': function(style,callback){
			/* Initializing the gridJS library */
			ceScript.fn.grid.__style = style;
			ceScript.fn.grid.is_initialized = true;
			if(ceScript.fn.grid.isset(callback)) callback(ceScript.fn.grid);
			return ceScript.fn.grid.msg('INIT : Finished initializing successfull!','info');
		},
		/**
		*
		* In case the grid should change, i.e. through an ajax call which reloads the list of <li> elements, you should call update to keep the grid up-to-date
                * 
                * This does not read the <li> list anew, because it is referenced differently
		*
		*/
		'update': function(id,callback){
			if(ceScript.fn.grid.is_initialized){
				if(ceScript.fn.grid.isint(id)) id = id;
				else{
					var elmname = ceScript.fn.grid.searchElementByName(id);
					if(elmname!==false) id = elmname;
					else return ceScript.fn.grid.msg('UPDATE : FAILED to update Grid-Element ('+id+')! Elementname does not exist.','warn');
				}
				if(ceScript.fn.grid.elements[id]!=undefined){
					var elm = ceScript.fn.grid.elements[id];
					elm.htmlWidth = elm.html.offsetWidth;
					elm.htmlHeight = elm.html.offsetHeight;
					elm.items = elm.html.getElementsByTagName('li');
					elm.itemsLength = elm.html.getElementsByTagName('li').length;
					elm.itemsWidth = elm.html.getElementsByTagName('li')[0].offsetWidth;
					elm.itemsHeight = elm.html.getElementsByTagName('li')[0].offsetHeight;
					elm.active = 0;
					if(elm.type=='grid'){
						// Special handling for grid types
					}
					ceScript.fn.grid.msg('UPDATE : Grid-Element "'+id+'" updated!','info');
					if(ceScript.fn.grid.isset(callback)) return callback();
				}else return ceScript.fn.grid.msg('UPDATE : FAILED to update Grid-Element ('+id+')! Elementname does not exist.','warn');
			}else ceScript.fn.grid.msg('UPDATE : FAILED to update Grid-Element "'+id+'"! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
         /**
         *
         *  Sample call:
         *
         *  gridJS.element('mainmenu',{
         *                               'name': 'mainmenu',			
         *                               'type': 'vertical',					
         *                               'is_moveable': true
         *                             });
         *
         * Use the id of the <ul> element as id, to have the the list of <li> elements loaded correctly.
         * 
         * callback won't be called
         */
		'element': function(id,vars,callback){
			/* Register the different navigation elements */
			if(ceScript.fn.grid.is_initialized){
				var itemListTemp = ceScript.fn.grid.id(id).children;
				var itemList = new Array();
				for(var i=0;i<itemListTemp.length;i++){
					if(itemListTemp[i].tagName=='LI') itemList.push(itemListTemp[i]);
				}
				ceScript.fn.grid.elements.push({
                                
                                /** 
                                 *
                                 * Evaluates fields from the variables "id", "itemList" or "vars"
                                 *
                                 * 
                                 * vars.border["LEFT"] - assign a function to this which shall get executed when the border got reached
                                 * vars.border["UP"] - assign a function to this which shall get executed when the border got reached
                                 * vars.border["RIGHT"] - assign a function to this which shall get executed when the border got reached
                                 * vars.border["DOWN"] - assign a function to this which shall get executed when the border got reached
                                 * 
                                 * vars.itemsFixed - after how many list entries scrolling should occur
                                 * vars.itemsStart - if vars.enterlastitem is set to true, set the value of this variable as default selection when starting grid navigation. Do not use it if vars.enterlastitem is undefined.
                                 * 
                                 * vars.enterlastitem - boolean which defines if the previously selected item of the element should get restored when returning from another element to a previously selected element
                                 * vars.hover - boolean which defines an action whwnever sel and forceSel gets called (everytime the selection changes)
                                 * vars.callback - a function which gets called after navigate got called
                                 * vars.key - keycode handler, if it is set array function gets called with parameters (this, elm) (whereby elm is the currently selected element)
                                 * 
                                 **/
					'name': vars.name!=undefined?vars.name:'Undefined', // define any name you want for this element, but use the correct id to the <ul> element in element(id...
					'htmlid': id, // not used from within
					'html': ceScript.fn.grid.id(id), // link to the direct DOM object, i.e. use ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].html.addClass
					'htmlWidth': ceScript.fn.grid.id(id).offsetWidth,
					'htmlHeight': ceScript.fn.grid.id(id).offsetHeight,
					'type': vars.type!=undefined?vars.type:'vertical', // either "horizontal" or "vertical"
					'is_moveable': vars.is_moveable!=undefined?vars.is_moveable:false, // if the list should scroll, set this to true
					'is_pageable': vars.is_pageable!=undefined?vars.is_pageable:false,
					'is_pageable_straight': vars.is_pageable_straight!=undefined?vars.is_pageable_straight:false,
					'has_action': vars.has_action!=undefined?vars.has_action:false,
					'border': vars.border!=undefined?{
						'LEFT': vars.border["LEFT"]!=undefined?vars.border["LEFT"]:'hold', // assign a function to this which shall get executed when the left border got reached
						'UP': vars.border["UP"]!=undefined?vars.border["UP"]:'hold', // assign a function to this which shall get executed when the upper border got reached
						'RIGHT': vars.border["RIGHT"]!=undefined?vars.border["RIGHT"]:'hold', // assign a function to this which shall get executed when the right border got reached
						'DOWN': vars.border["DOWN"]!=undefined?vars.border["DOWN"]:'hold' // assign a function to this which shall get executed when the down border got reached
					}:{
						'LEFT': 'hold',
						'UP': 'hold',
						'RIGHT': 'hold',
						'DOWN': 'hold'
					},
					'items': itemList, // Array with <li> elements
					'itemsLength': itemList.length, // Contains the number of <li> elements
					'itemsWidth': itemList[0].offsetWidth,
					'itemsHeight': itemList[0].offsetHeight,
					'itemsFixed': vars.itemsFixed!=undefined?vars.itemsFixed:0, // after how many list entries scrolling should occur
					'itemsFixedLast': vars.itemsFixedLast!=undefined?vars.itemsFixedLast:true,
					'itemstart': vars.itemsStart!=undefined?vars.itemsStart:0, // if vars.enterlastitem is set to true, set the value of this variable as default selection when starting grid navigation. Do not use it if vars.enterlastitem is undefined.
					'itemsOffset': vars.itemsOffset!=undefined?vars.itemsOffset:0,
					'active': vars.itemsStart!=undefined?vars.itemsStart:0,
					'enterlastitem': vars.enterlastitem!=undefined?vars.enterlastitem:true, // boolean which defines if the previously selected item of the element should get restored when returning from another element to a previously selected element
					'grid': vars.type=='grid'?{
						'cells': Math.floor(ceScript.fn.grid.id(id).offsetWidth/itemList[0].offsetWidth),
						//'rows': Math.ceil(ceScript.fn.grid.id(id).children.getElementsByTagName('li').length/Math.floor(ceScript.fn.grid.id(id).offsetWidth/itemList[0].offsetWidth))
						'rows': Math.ceil(ceScript.fn.grid.id(id).getElementsByTagName('li').length/Math.floor(ceScript.fn.grid.id(id).offsetWidth/itemList[0].offsetWidth))
					}:{
						'cells': 0,
						'rows': 0
					},
					'hover': vars.hover!=undefined?vars.hover:false, // boolean which defines an action whenever sel and forceSel gets called (everytime the selection changes)
					'key':vars.key!=undefined?vars.key:{}, // keycode handler, if it is set array function gets called with parameters (this, elm) (whereby elm is the currently selected element)
					'register_auto': vars.register_auto!=undefined?vars.register_auto:false,
					'callback': vars.callback!=undefined?vars.callback:false, // Callback which gets directly called at the end of this init function - so set it here to carry through the remaining actions
				});
				ceScript.fn.grid.elementsLenght = ceScript.fn.grid.elements.length;
				var elm = ceScript.fn.grid.elements[ceScript.fn.grid.elementsLenght-1];
				/**/
				if(elm.active==0){ // If no vars.itemsStart was specified (which would result in elm.active!=0) check the current selection, and set it to the element if class "active" got found in class descriptor
					for(var i=0;i<elm.itemsLength;i++){
						if(ceScript(elm.items[i]).hasClass(ceScript.fn.grid.itemsActiveClassName)){
							elm.active = i;
							ceScript.fn.grid.msg('ELEMENT : Grid-Element "'+id+'" has Item "'+i+'" with active class name!','debug');
						}
					}
				}
				for(var i=0;i<elm.itemsLength;i++){
					if(ceScript(elm.items[i]).hasClass('DELETE')){
						ceScript.fn.grid.del(ceScript.fn.grid.elementsLenght-1);
						ceScript.fn.grid.msg('ELEMENT : Grid-Element "'+id+'" will be removed immediately!','debug');
					}
				}
				/**/
				ceScript.fn.grid.msg('ELEMENT : Grid-Element "'+id+'" added!','info');
				if(elm.callback!=false) return elm.callback(ceScript.fn.grid,elm);
			}else ceScript.fn.grid.msg('ELEMENT : FAILED to add Grid-Element "'+id+'"! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		'autohandlerindex': 0,
		'autohandlercheck': true,
                 /**
                 *
		 * When returning to an url, you can specify that the grid should restore the original selection. For this, some helper functionality is required to create a javascript array like this:
		 *
                 * 1. Create an array like this:
		 * jumpin[0] = "cloud"; jumpin[1] = "jsapi"; jumpin[2] = "showcase01"; jumpin[3] = "australien"; 
                 * 
                 * The order must be the same as when specifying the elements, and every time you create a new element, if it shall get used, the value of the jumpin key must be set:
                 * 
                 * $.fn.grid.element('filterapps',{
                 *                                              'name': 'filterapps',
		 *						'type': 'horizontal',
		 *						...
		 *						'register_auto': 3,  <-- i.e. for jumpin[2]
                 * 
                 * Pay attention to the fact that searchElementByAutoHandle starts counting at 1, whereby the jumpin array starts at 0.
                 * 
                 * Call $.fn.grid.autohandler(jumpin);
		 *
		 */

                'autohandler': function(arr,callback){
			if(ceScript.fn.grid.is_initialized){
                                // Checks if a jumpin array got provided. 2nd, autohandler can get turned off by setting 'autohandlercheck' to false.
				if(arr.length>0&&arr[0]!=''&&ceScript.fn.grid.autohandlercheck===true){
                                                // This will be the counter
						index = ceScript.fn.grid.autohandlerindex;
                                                //  Store the element belonging to the current index, and the index starts at 1 (because 'autohandlerindex' is by default set to 0, and index = ceScript.fn.grid.autohandlerindex
						elm = ceScript.fn.grid.searchElementByAutohandle(index+1);
						if(elm!==false){
                                                        // increase the index by 1, and set the new value
							ceScript.fn.grid.autohandlerindex = index+1;
                                                        // Further autohandling is turned off when the size of the jumpin array got reached (we only need this once most likely right at the start)
							if(ceScript.fn.grid.autohandlerindex>=arr.length) ceScript.fn.grid.autohandlercheck = false;
							items = ceScript.fn.grid.elements[elm].items;
                                                        /** Start counting at 0 */
							for(jj=0;jj<items.length;jj++){
                                                                /**
                                                                 * For explanation, let's have a closer look at the ul wheel_type, which is referenced by jumpin[0]
                                                                 * 
                                                                 * <ul id="wheel_type" class="wheel">
                                                                 * <li class="menu-home " hoveraction="changeTypeWheel('home','Home');changeFooterUrl(appcatalog);promo(text_homepage);" style="margin-top: -90px;">
                                                                 * <li class="menu-local" hoveraction="changeTypeWheel('local','Local');changeFooterUrl(appcatalog);promo(text_local);">
                                                                 * <li class="menu-cloud active" hoveraction="changeTypeWheel('cloud','Cloud');changeFooterUrl(appcatalog);promo(text_cloud);">
                                                                 * <li class="menu-player" hoveraction="changeTypeWheel('player','Player');changeFooterUrl(appcatalog);promo(text_player);">
                                                                 * </ul>
                                                                 *
                                                                 * So, one of the <li> elements (referenced using items[jj]) must have the class "menu-cloud" (assuming that jumpin[0] = "cloud" and index=0)
                                                                 *
                                                                 */
								if(ceScript(items[jj]).hasClass('menu-'+arr[index])){
                                                                        // Use the element before changing its selection
									ceScript.fn.grid.use(elm,function(){
										ceScript.fn.grid.sel(jj,function(){
                                                                                        // Change the selection of the element
											ceScript.fn.grid.doitHover('hoveraction',10,function(){
                                                                                                // This is adapted to a certain template by VideoWeb, where the second element contains an action tag that should
                                                                                                // be called. So, only on the second element call an action tag. Adjust this if clause according to your needs.
												if(index==2){
													ceScript.fn.grid.doit('action',function(){
														return window.setTimeout(function(){ceScript.fn.grid.autohandler(arr,callback)},190);
													});
												}else return window.setTimeout(function(){ceScript.fn.grid.autohandler(arr,callback)},190);
											});
										});
									});
									break;
								}
							}
						}else{
							ceScript.fn.grid.autohandlercheck = false;
							return ceScript.fn.grid.autohandler(arr,callback);
						}
				}else{
					if(ceScript.fn.grid.isset(callback)) return callback(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent]);
				}
			}else return ceScript.fn.grid.msg('AUTOHANDLER : FAILED to use Grid-Element ('+id+')! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
        /** 
         *
         * Select one navigation element for usage 
         * 
         * You can either pass an index or a name of an id, i.e. gridJS.use('scroll_panel');
         *
         **/
		'use': function(id,callback){
			/* Select one navigation element for usage */
			if(ceScript.fn.grid.is_initialized){
				// Either the passed parameter is numeric, or if it is a name find out at what position the element is located
				if(ceScript.fn.grid.isint(id)) id = id;
				else{
					// Returns the position of the element with the specific name in this.elements - every element got added previously using gridJS.element('i.e. mainmenu', function(){});
					var elmname = ceScript.fn.grid.searchElementByName(id);
					// Only if element name could get found change index (id)
					if(elmname!==false) id = elmname;
					else return ceScript.fn.grid.msg('USE : FAILED to use Grid-Element ('+id+')! Elementname does not exist.','warn');
				}
				// Check if we got the numeric index defined
				if(ceScript.fn.grid.elements[id]!=undefined){
					// Remove the class "current" (this.elementsCurrentClassName = "current") from the current selection
					if(ceScript.fn.grid.elementsCurrent!==false) ceScript(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].html).removeClass(ceScript.fn.grid.elementsCurrentClassName);
					// Change the current selection
					ceScript.fn.grid.elementsCurrent = id;
					// Add the class "current" to the newly selected <ul> (!) element 
					ceScript(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].html).addClass(ceScript.fn.grid.elementsCurrentClassName);
					ceScript.fn.grid.msg('USE : Grid-Element with ID '+id+' selected!','info');
					// Depending on enterlastitem, either select the currently selected button on the newly selected element, or set it to itemstart
					ceScript.fn.grid.sel(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].enterlastitem===true?ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].active:ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].itemstart);
					if(ceScript.fn.grid.isset(callback)) return callback(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent]);
				}else return ceScript.fn.grid.msg('USE : FAILED to use Grid-Element ('+id+')! Element does not exist.','error');
			}else return ceScript.fn.grid.msg('USE : FAILED to use Grid-Element ('+id+')! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		'unUse': function(callback){
			/* Deselect the current navigation element for usage */
			if(ceScript.fn.grid.is_initialized){
				if(ceScript.fn.grid.elementsCurrent!==false){
					var elm = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent];
					//elm.items[elm.active].removeClass(this.itemsActiveClassName);
					//elm.active = false;
					ceScript(elm.html).removeClass(ceScript.fn.grid.elementsCurrentClassName);
					ceScript.fn.grid.elementsCurrent = false;
					ceScript.fn.grid.msg('UNUSE : Grid-Element deselected!','info');
					if(ceScript.fn.grid.isset(callback)) return callback(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent]);
				}else return ceScript.fn.grid.msg('UNUSE : FAILED to unuse Grid-Element! Element is not in use.','warn');
			}else return ceScript.fn.grid.msg('UNUSE : FAILED to unuse Grid-Element ('+id+')! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		'del': function(id,callback){
			/* Delete one navigation element, you can either pass an index or a name of an id, just like 'use' */
			if(ceScript.fn.grid.is_initialized){
				if(ceScript.fn.grid.isint(id)) id = id;
				else{
					var elmname = ceScript.fn.grid.searchElementByName(id);
					if(elmname!==false) id = elmname;
					else{
						if(ceScript.fn.grid.isset(callback)) return callback(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent]);
						return ceScript.fn.grid.msg('DELETE : FAILED to delete Grid-Element ('+id+')! Elementname does not exist.','warn');
					}
				}
				if(ceScript.fn.grid.elements[id]!=undefined){
					if(id==ceScript.fn.grid.elementsCurrent) ceScript.fn.grid.unUse();
					ceScript.fn.grid.elements.remove(id);
					ceScript.fn.grid.msg('DELETE : Grid-Element with ID '+id+' deleted!','info');

					if(ceScript.fn.grid.isset(callback)) return callback(ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent]);
				}else return ceScript.fn.grid.msg('DELETE : FAILED to delete Grid-Element ('+id+')! Element does not exist.','error');
			}else return ceScript.fn.grid.msg('DELETE : FAILED to delete Grid-Element ('+id+')! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
        /** 
         *
         * Used by 'use' to look for the id belonging to the element's name 
         * 
         */
		'searchElementByName': function(str){
			if(ceScript.fn.grid.is_initialized){
				var elms = ceScript.fn.grid.elements;
				// Check if the name attribute of the <ul> element equals str, if so return the index
				for(i=0;i<elms.length;i++) if(elms[i].name==str) return i;
				return false;
			}else return ceScript.fn.grid.msg('SEARCHELEMENTSBYNAME : FAILED to search! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		/**
		* When returning to an url, you can specify that the grid should restore the original selection. For this, some helper functionality is required to create a javascript array like this:
		*
		* jumpin[0] = "cloud"; jumpin[1] = "jsapi"; jumpin[2] = "showcase01"; jumpin[3] = "australien"; 
		*
		*/
		'searchElementByAutohandle': function(str){
			if(ceScript.fn.grid.is_initialized){
				var elms = ceScript.fn.grid.elements;
				for(i=0;i<elms.length;i++) if(elms[i].register_auto==str) return i;
				return false;
			}else return ceScript.fn.grid.msg('SEARCHELEMENTSBYAUTOHANDLE : FAILED to search! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		/**
		 *
		 *  Returns the active <li> element, retrieves it using elm.active from within elm.items. The current element gets retrieved using ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent];
		 *
		 */
		'activeItem': function(){
			if(ceScript.fn.grid.is_initialized){
				var elm = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent]; // current element
				var searchitem = elm.items[elm.active]; // current item
				ceScript.fn.grid.msg('activeItem : Item '+searchitem+' is selected!','debug');
				return searchitem;
			}else return ceScript.fn.grid.msg('activeItem : FAILED to search for active Item! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
        /**
         *
         *  Select one item inside the currently active element
         *  
         *  is externally used the following way:
         *  
         *  \code
         *  gridJS.use('selector_menu',function(elm){
         *  gridJS.sel(0);
         *  });
         *  \endcode
         *  
         *  and is internally used by this.navigate, but this.navigate normally does not get called from inside
         */
		'sel': function(id,callback,direction){
			if(ceScript.fn.grid.is_initialized){
				var elm = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent];
				// The passed id is most likely numeric and starts at the index of 0
				if(elm.items[id]!=undefined){
				    // Change the direction variable to the boolean "false" if it is not set 
					var direction = ceScript.fn.grid.isset(direction)==true?direction:false;
					// On the current selected <li> item, remove the class name "active", so it is not selected visibly anymore
					ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
					// Change the active li element
					elm.active = id;
					// To the newly selected li element, add the class "active", so this one is visibly selected
					ceScript(elm.items[id]).addClass(ceScript.fn.grid.itemsActiveClassName);
					// Check if the item bar has to get scrolled
					if(elm.is_moveable===true) {
					    // In most cases the element is not pageable
						if(elm.is_pageable===false) ceScript.fn.grid.move();
						else{
							if(direction=='RIGHT'&&id%elm.is_pageable==0){
								if(elm.is_pageable_straight===true||elm.is_pageable_straight=='right'){
									ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
									elm.active = elm.active-1;
									ceScript(elm.items[elm.active]).addClass(ceScript.fn.grid.itemsActiveClassName);
									ceScript.fn.grid.border('RIGHT');
								}else ceScript.fn.grid.move();
							}
							if((direction=='LEFT'&&(id+1)%elm.is_pageable==0)){
								if(elm.is_pageable_straight===true||elm.is_pageable_straight=='left'){
									ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
									elm.active = elm.active+1;
									ceScript(elm.items[elm.active]).addClass(ceScript.fn.grid.itemsActiveClassName);
									ceScript.fn.grid.border('LEFT');
								}else ceScript.fn.grid.move(-(elm.is_pageable-1));
							}
						}
					}
					if(elm.hover!==false) elm.hover(ceScript.fn.grid,elm);
					ceScript.fn.grid.msg('SEL : Item with ID '+id+' selected!','debug');
					if(elm.has_action!==false) elm.has_action(ceScript.fn.grid,elm);
					if(ceScript.fn.grid.isset(callback)) return callback(ceScript.fn.grid);
				}else return ceScript.fn.grid.msg('SEL : FAILED to select Grid-Item ('+id+')! Element does not exist.','error');
			}else return ceScript.fn.grid.msg('SEL : FAILED to select Grid-Item ('+id+')! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		'manualPaging': function(id,direction){
			if(ceScript.fn.grid.is_initialized){
				if(ceScript.fn.grid.isint(id)) id = id;
				else{
					var elmname = ceScript.fn.grid.searchElementByName(id);
					if(elmname!==false) id = elmname;
					else return ceScript.fn.grid.msg('USE : FAILED to use Grid-Element ('+id+')! Elementname does not exist.','warn');
				}
				var elm = ceScript.fn.grid.elements[id];
				if(elm.is_moveable===true){
						if(direction=='RIGHT'){
							ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
							elm.active = elm.active+elm.is_pageable;
							if(elm.active>=elm.itemsLength-1) elm.active = elm.itemsLength-1;
							currPage = Math.floor((elm.active)/elm.is_pageable);
							move = elm.itemsWidth*(currPage*elm.is_pageable);
							ceScript.fn.grid.changeLeftOfAllItems(elm.items,'-'+(move)+'px');
							if(elm.has_action!==false) elm.has_action(ceScript.fn.grid,elm);
						}
						if(direction=='LEFT'){
							ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
							elm.active = elm.active-elm.is_pageable;
							if(elm.active<=0) elm.active = 0;
							currPage = Math.floor((elm.active)/elm.is_pageable);
							move = elm.itemsWidth*(currPage*elm.is_pageable);
							ceScript.fn.grid.changeLeftOfAllItems(elm.items,'-'+(move)+'px');
							if(elm.has_action!==false) elm.has_action(ceScript.fn.grid,elm);
						}
				}
			}else return ceScript.fn.grid.msg('SEL : FAILED to select Grid-Item ('+id+')! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
        /**
         *
         * Select one item of navigation element (<ul>)
         *
         * Provide the element id to switch to a different element - different to sel because you can define the element id and do not have to use the id of the current element
         *   
         **/
		'forceSel': function(id,num,callback){
			/* Fake Select one item of navigation element */
			if(ceScript.fn.grid.is_initialized){
				if(ceScript.fn.grid.isint(id)) id = id;
				else{
					var elmname = ceScript.fn.grid.searchElementByName(id);
					if(elmname!==false) id = elmname;
					else return ceScript.fn.grid.msg('FORCESEL : FAILED to use Grid-Element ('+id+')! Elementname does not exist.','warn');
				}
				/** Using the parameter "id" for getting to the correct element */
				if(ceScript.fn.grid.elements[id]!=undefined){
					elm = ceScript.fn.grid.elements[id];
					if(num>=0&&num<elm.itemsLength){
					   	/** Deselect old item */
						ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
						/** Select new item */
						elm.active = num;
						ceScript(elm.items[num]).addClass(ceScript.fn.grid.itemsActiveClassName);
						//if(elm.is_moveable===true) ceScript.fn.grid.move();
						if(elm.is_moveable===true){
							if(elm.is_pageable===false) ceScript.fn.grid.move();
							else{
								if(direction=='RIGHT'&&id%elm.is_pageable==0){
									if(elm.is_pageable_straight===true||elm.is_pageable_straight=='right'){
										ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
										elm.active = elm.active-1;
										ceScript(elm.items[elm.active]).addClass(ceScript.fn.grid.itemsActiveClassName);
										ceScript.fn.grid.border('RIGHT');
									}else ceScript.fn.grid.move();
								}
								if((direction=='LEFT'&&(id+1)%elm.is_pageable==0)){
									if(elm.is_pageable_straight===true||elm.is_pageable_straight=='left'){
										ceScript(elm.items[elm.active]).removeClass(ceScript.fn.grid.itemsActiveClassName);
										elm.active = elm.active+1;
										ceScript(elm.items[elm.active]).addClass(ceScript.fn.grid.itemsActiveClassName);
										ceScript.fn.grid.border('LEFT');
									}else ceScript.fn.grid.move(-(elm.is_pageable-1));
								}
							}
						}
						if(elm.hover!==false) elm.hover(ceScript.fn.grid,elm);
						ceScript.fn.grid.msg('SEL : Item with ID '+id+' selected!','debug');
						if(ceScript.fn.grid.isset(callback)) return callback(ceScript.fn.grid);
					}
				}else return ceScript.fn.grid.msg('FORCESEL : FAILED to use Grid-Element ('+id+')! Element does not exist.','error');
			}else return ceScript.fn.grid.msg('FORCESEL : FAILED to use Grid-Element ('+id+')! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		/**
		*
		* Gets used to iterate over all <li> elements of the current <ul> element
		*
		* and changes the css style.top value of the given objects to str
		*
		*/
		'changeTopOfAllItems': function(obj,str){
			/* Changes the css-top-parameter of all elements (important for grid-style) */
			if(ceScript.fn.grid.is_initialized){
				for(i=0;i<obj.length;i++) obj[i].style.top = str;
			}else return ceScript.fn.grid.msg('CHANGETOPOFALLITEMS : FAILED use this function! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		/**
		*
		* Gets used to iterate over all <li> elements of the current <ul> element
		*
		* and changes the css style.left value of the given objects to str
		*
		*/
		'changeLeftOfAllItems': function(obj,str){
			/* Changes the css-top-parameter of all elements (important for grid-style) */
			if(ceScript.fn.grid.is_initialized){
				for(i=0;i<obj.length;i++) obj[i].style.left = str;
			}else return ceScript.fn.grid.msg('CHANGELEFTOFALLITEMS : FAILED use this function! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
         /**
         *
         * Scrolls the items inside a navigation element using marginTop and marginLeft
         *  
         **/
		'move': function(skip,grid){
			/* Move the items inside of an navigation element */
			if(ceScript.fn.grid.is_initialized){
				var skip = ceScript.fn.grid.isset(skip)==true?skip:0;
				var grid = ceScript.fn.grid.isset(grid)==true?grid:ceScript.fn.grid.elementsCurrent;
				var elm = ceScript.fn.grid.elements[grid];
				var currRow = Math.floor((elm.active)/elm.grid.cells);
				if(elm.type=='grid'){
					var useStatic = currRow-elm.itemsFixed;
					if(elm.itemsFixedLast===true) if((currRow)>=(elm.grid.rows-1)-elm.itemsFixed) useStatic = (elm.grid.rows-1)-(elm.itemsFixed*2);
					// Set offset to 0 if scrolling should not start due to elm.itemsFixed or elm.itemsFixedLast
					if(useStatic<=0||(elm.itemsFixedLast===true&&useStatic==((elm.grid.rows-1)-(elm.itemsFixed*2)))) var offset = 0;
					else var offset = elm.itemsOffset;
				}
				else{
					var useStatic = elm.active-elm.itemsFixed;
					if(elm.itemsFixedLast===true) if((useStatic+elm.itemsFixed)>=(elm.itemsLength-1)-elm.itemsFixed) useStatic = (elm.itemsLength-1)-(elm.itemsFixed*2);
					// Set offset to 0 if scrolling should not start due to elm.itemsFixed or elm.itemsFixedLast
					if(useStatic<=0||(elm.itemsFixedLast===true&&useStatic==((elm.itemsLength)-(elm.itemsFixed*2)))) var offset = 0;
					else var offset = elm.itemsOffset;
				}
				// Scrolling gets effective here, by setting the marginTop if it's a vertical navigation
				if(elm.type=='vertical') elm.items[0].style.marginTop = '-'+((((useStatic+skip)>0?(useStatic+skip):0)*elm.itemsHeight)+(((useStatic+skip)>0?(useStatic+skip):0)*offset))+'px';
				//if(elm.type=='vertical') ceScript.fn.grid.changeTopOfAllItems(elm.items,'-'+(((useStatic>0?useStatic:0)*elm.itemsHeight)+((useStatic>0?useStatic:0)*offset))+'px');
				//if(elm.type=='horizontal') elm.items[0].style.marginLeft = '-'+(((useStatic>0?useStatic:0)*elm.itemsWidth)+offset)+'px';
				// Scrolling gets effective here, by setting the marginLeft of all items if it's a horizontal navigation
				if(elm.type=='horizontal') ceScript.fn.grid.changeLeftOfAllItems(elm.items,'-'+((((useStatic+skip)>0?(useStatic+skip):0)*elm.itemsWidth)+(((useStatic+skip)>0?(useStatic+skip):0)*offset))+'px');
				//if(elm.type=='horizontal') ceScript.fn.grid.changeLeftOfAllItems(elm.items,'-'+((((useStatic>0?useStatic:0)*elm.itemsWidth)+((useStatic>0?useStatic:0)*offset))+(((skip>0?skip:0)*elm.itemsWidth)+((skip>0?skip:0)*offset)))+'px');
				// Vertical scrolling is also available to grid elements
				if(elm.type=='grid') ceScript.fn.grid.changeTopOfAllItems(elm.items,'-'+(((useStatic>0?useStatic:0)*elm.itemsHeight)+offset)+'px');
			}else return ceScript.fn.grid.msg('MOVE : FAILED use move function! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
        /**
    	 *
         *  Navigate inside a navigation element 
         *  
         *  Gets executed from outside, i.e.:
         *  
         *  function handleKeyCode(kc){
         *
         *  switch(kc){   
         *  
         *  case VK_UP:	// UP
         *	gridJS.navigate('UP');
         *	return true;
         *  break;
         *  ...
         *
         **/
		'navigate': function(direction,callback){
			/* Navigate inside of an navigation element */
			if(ceScript.fn.grid.is_initialized){
				if(ceScript.fn.grid.elementsCurrent!==false){
					var elm = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent];
					switch(direction){
						case 'UP':
							if(elm.type=='vertical'){
								if(elm.active-1>=0) return ceScript.fn.grid.sel(elm.active-1,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							if(elm.type=='horizontal') return ceScript.fn.grid.border(direction);
							if(elm.type=='grid'){
								if(elm.active-elm.grid.cells>=0) return ceScript.fn.grid.sel(elm.active-elm.grid.cells,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							return false;
						break;
						case 'DOWN':
							if(elm.type=='vertical'){
								if(elm.active+1<elm.itemsLength) return ceScript.fn.grid.sel(elm.active+1,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							if(elm.type=='horizontal') return ceScript.fn.grid.border(direction);
							if(elm.type=='grid'){
								if(elm.active+elm.grid.cells<elm.itemsLength) return ceScript.fn.grid.sel(elm.active+elm.grid.cells,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							return false;
						break;
						case 'LEFT':
							if(elm.type=='vertical') return ceScript.fn.grid.border(direction);
							if(elm.type=='horizontal'){
								if(elm.active-1>=0) return ceScript.fn.grid.sel(elm.active-1,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							if(elm.type=='grid'){
								if(elm.active-1>=0&&elm.active%elm.grid.cells!=0) return ceScript.fn.grid.sel(elm.active-1,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							return false;
						break;
						case 'RIGHT':
							if(elm.type=='vertical') return ceScript.fn.grid.border(direction);
							if(elm.type=='horizontal'){
								if(elm.active+1<elm.itemsLength) return ceScript.fn.grid.sel(elm.active+1,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							if(elm.type=='grid'){
								if(elm.active+1<elm.itemsLength&&(elm.active+1)%elm.grid.cells!=0) return ceScript.fn.grid.sel(elm.active+1,callback,direction);
								else return ceScript.fn.grid.border(direction);
							}
							return false;
						break;
						default: return false; 
					}
				}else return ceScript.fn.grid.msg('NAVIGATE : Can not navigate, no Element in use.','warn');
			}else return ceScript.fn.grid.msg('NAVIGATE : FAILED to navigate '+id+'! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
		 
        /** 
         *
         * Actions for usage if you navigate out of a border of an navigation element 
         *
         * This can be called manually, but it is called in this.navigate most frequently (it does a ceScript.fn.grid.border(direction))
         * 
         * if it's a vertical navigation if the user is at the last entry (direction==DOWN) or at the first position (DIRECTION==UP)
         * 
         * if it's a horizontal navigation if the user is at the very left entry (direction==LEFT) or at the very right position (DIRECTION==RIGHT)
         * 
         * Additionally border gets called when it's a vertical navigation and the user pressed RIGHT or LEFT, or if it's a horizontal navigation
         * 
         * and the user presses UP or DOWN, but this is only true if the cursor keys have been set up for these directions (see below).
         * 
         * direction - pass a direction: LEFT, RIGHT, UP, DOWN
         * 
         * In order for something to happen, you have to setup the border when initializing using gridJS.element, the following way:
         * 
         *                                                      $.fn.grid.element('wheel_type',{ 
         * 								'border':{
    	 *								'RIGHT': function(elm){
	 *									$.fn.grid.use('wheel_category');
	 *								}
	 *							},...
         *
         *
         **/
		'border': function(direction){
			/* Actitions for usage if you navigate to a border of an navigation element */
			if(ceScript.fn.grid.is_initialized){
				var elm = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent];
				if(elm.border[direction]=='hold') return true;
				if(ceScript.fn.grid.isint(elm.border[direction])) return ceScript.fn.grid.use(elm.border[direction]);
				if(ceScript.fn.grid.isfunction(elm.border[direction])) return elm.border[direction](ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent]);
				if(ceScript.fn.grid.isstring(elm.border[direction])) return ceScript.fn.grid.searchElementByName(elm.border[direction]);
				return false;
			}else return ceScript.fn.grid.msg('BORDER : FAILED to use Border-Functions! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
	 /** 
         *
         * Submit a keystroke manually, i.e. pass the VK_ENTER from a keycode handler on to the grid by issueing:
         * 
         * gridJS.keystroke('VK_ENTER');
         *
         * The actions for keycodes can be initialized at the same time when initializing the grid (using gridJS.element), by providing a 'key' object key, i.e.:
         *  
         *  'key':{
         *		'VK_ENTER': function(lib,elm){
         *			$.fn.grid.doit('action');
	 *		},'VK_LEFT': function(lib,elm){
         *			$.fn.grid.use('nav');
         *		}
	 *	}
         */
		'keystroke': function(kc){
			if(ceScript.fn.grid.is_initialized){
				if(ceScript.fn.grid.elementsCurrent!==false){
					var elm = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent];
					if(ceScript.fn.grid.isset(elm.key[kc])) elm.key[kc](ceScript.fn.grid,elm);
					else return true;
				}else return ceScript.fn.grid.msg('KEYSTOKE : FAILED to use KEYSTROKE-Functions! No Element in use.','warn');
			}else return ceScript.fn.grid.msg('KEYSTOKE : FAILED to use KEYSTROKE-Functions! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
         /**
         *
         * You can also call this.doit manually and pass the attribute name to it, i.e. for "action":
         * 
         * gridJS.doit('action');
         * 
         * This executes the action attribute of a <li> element.
         * 
         * This is often used inside a key handler for VK_ENTER, and in combination with the attribute "action" of <li> elements
         *
         */
		'doit': function(attrName,callback){
			if(ceScript.fn.grid.is_initialized){
				var i = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].items[ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].active];
				if(i.getAttribute(attrName)!=undefined){
					var fn = i.getAttribute(attrName);
					eval(fn);
					if(ceScript.fn.grid.isset(callback)) callback();
				}else return false;
			}else return ceScript.fn.grid.msg('DOIT : FAILED to do it! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		},
        /**
         *
         * Difference to "doit" is that the value inside the attrName is called using setTimeout
         *
         * Is used in combination with the <li> attribute "hoveraction"
         */
		'doitHover': function(attrName,duration,callback){
			if(ceScript.fn.grid.is_initialized){
				ceScript.fn.grid.__timeout = window.clearTimeout(ceScript.fn.grid.__timeout);
				ceScript.fn.grid.__timeout = false;
				var i = ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].items[ceScript.fn.grid.elements[ceScript.fn.grid.elementsCurrent].active];
				if(i.getAttribute(attrName)!=undefined){
					var fn = i.getAttribute(attrName);
					ceScript.fn.grid.__timeout = window.setTimeout(function(){ceScript.fn.grid.__timeout=false;eval(fn);if(ceScript.fn.grid.isset(callback)){callback();}},duration);
				}else return false;
			}else return ceScript.fn.grid.msg('DOITHOVER : FAILED to do it! '+ceScript.fn.grid.NAME+' is not initialized.','error');
		}
	}
});
var gridJS = ceScript.fn.grid;
