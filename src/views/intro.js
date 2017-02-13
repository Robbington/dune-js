_global = _global || {}

_global.tmp = function(viewManager) {

	var id = 'intro', 
	display = {
		ref : 'playVideo', 
		playVideo : function() {
			viewManager.getAssets('intro').render();
		},
		showMenu : function(){
			//viewManager.getAssets('background').render(0, 0);
			//viewManager.getEntity('menu').render(50, 50);
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
			'menu' : {
				'src'  : '/entities/menu.js',
				'args' : {
					width : 300,
					height: 300,
					background: 'white',
					color : 'white',
					font  : 'ariel'  
					x     : 100,
					y     : 100 
					buttons : {
						start : {
							label : 'start new game',
							click : function(){

							}
						}
					}
				}	
			}	
		},
		events : {
			click : [
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
