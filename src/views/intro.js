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
					height:300,
					width:300,
					background : '#fff'
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
