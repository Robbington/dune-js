_global = _global || {}

_global.tmp = function(viewManager) {

	var id = 'intro', 
	display = {
		ref : 'playVideo', 
		playVideo : function() {
			viewManager.getAssets('intro').render();
		},
		showMenu : function() {
			var e = viewManager.createSingleInstanceEntity(
				'menu', {
					x : 325,
					y :335,
					height:160,
					width:375,
					font : '30px dos',
					colour : '#cccccc',
					lineheight : 65,
					background : 'box',
					font_color : '#fff',
					font_stroke:true,
					buttons : {
						start : {
							label : 'Play a game',
							indent : 35,
							onclick : function(){

							}
						}
					}
				}
			);

			if(e){e.render();}	
		},
		current : function(){
			if(this.ref !== 'current' && this.ref !== 'paused') {
				if(typeof this[this.ref] == 'function') {
					this[this.ref]();
				}
			}
		}
	},
	setup = {
		assets : {
			'intro' : {
				'type' : 'video',
				'src'  : '/assets/intro.mp4',
				'onload' : function(video) {
					video.onend = function() {
						display.ref = 'showMenu';
					}
				}
			}	
		},
		entities : {
			'menu' : '/src/entities/menu.js'
		},
		events : {
			click : [
				function(e) {
					display.ref = 'showMenu';
				}
			], 
			keydown : [
				function(e) {
					display.ref = 'showMenu';
				}
			]	
		}
	}

	return {
		label : id,
		render : function(cxt, canvas){
			display.current();
		},
		getSetup : function(){
			return setup;
		}
	}
}
