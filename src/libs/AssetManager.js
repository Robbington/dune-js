var _global = _global || {}

_global.tmp = function(game){

	var cache = {},
	_render = function(a, x, y) { 
		var w = a.width  || game.canvas.w,
			h = a.height || game.canvas.h,
			x = x || 0, 
			y = y || 0;
			try{
				game.canvas.cxt.drawImage(a, x, y, 1000, 500);
 			}
 			catch(e) {
 				if (e.name == "NS_ERROR_NOT_AVAILABLE") {
 					//Tmp Fix For Shitty Firefox bug
 				}
 			}
 		}, 
 		_clip = function(a,sx,sy,sw,sh,x,y,w,h){
 			game.canvas.ctx.drawImage(a, sx,sy,sw,sh,x,y,w,h);
 		};

	validate = function(item) {
		if(typeof item !== 'object') {
			return false;
		}

		var validation = {
			'src'  : true,
			'type' : true
		};
		for(var v in validation) {
			if(typeof item[v] === 'undefined') {
				return false;
			}
			if(typeof validation[v] == 'string') {
				if(typeof item[v] !== validation[v]) {
					return false;
				}
			}
		}
		return true;
	}, 
	image = function(a) {
		var image  = new Image(), 
			loaded = false;

        image.onload = function(){
        	if(typeof a.onload == 'function') {
        		a.onload();
        	}
        	loaded = true;
        }

        image.src = a.src;
        return {
        	isLoaded : function(){ return (loaded === true)},
        	render : function(x, y){
        		return _render(image, x,y)
        	}, 
        	getType: function(){
        		return a.type;
        	}, 
        	clip : function(sx,sy,sw,sh,x,y,w,h) {
        		_clip(image, sx,sy,sw,sh,x,y,w,h);
        	}
        }
	},
	sprite = function(a) {
		asset = image(a);


	}, 
	audio = function(a){

	}, 
	video = function(a) {
		var video = document.createElement("video"),
			play  = function(){
				if(!video.playing){
					video.playing = true;
					video.play();
				}
				return video;
			} 		
		video.oncanplay = function(){
			if(typeof a.onload == 'function') {
        		a.onload(video);
        	}
		}
		video.remaining = function(){
			return (this.duration - this.currentTime).toFixed(2);
		}
		video.currentTime = 180;
		video.lastFrame = 0;

		video.src = a.src;
		video.playing = false;

		return {
			render : function(x ,y){
				if(this.isReady()) {
					_render(play(), x, y);
					//Todo: this isnt a very good way of making sure the onend event fires
					if(video.remaining() < 0.05) {
						if(typeof video.onend == 'function') {
							 video.onend();
						}
					}
				}
			},
			isReady : function(){
				return (video.readyState === 4);
			}
		}
	};

	return {
		register : function(id, asset) {
			if(validate(asset)) {
				item = {};
				switch(asset.type) {
					case 'image':
						item = image(asset);
						break;
					case 'sprite':
						item = sprite(asset);
						break;
					case 'audio':
						item = audio(asset);
						break;
					case 'video':
						item = video(asset);
						break;
					default:
						throw Error("Failed to Identify Asset Type");
				}
				item.type = asset.type;
				cache[id] = item;
			}
		}, 
		get : function(id) {
			if(typeof cache[id] == 'object') {
				return cache[id];
			} 
			return false;
		},
		render: function(id) {
			if(a = this.get(id)) {
				if(a.type == 'image' || a.type == 'sprite') {



				}
			}
		}
	}
};