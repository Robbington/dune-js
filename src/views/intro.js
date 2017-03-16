_global = _global || {}

_global.tmp = function(viewManager) {

	var id = 'intro', 
	display = {
		ref : 'houseSelect',
		init : function() {
			viewManager.transitions.fadeout(3000, function() {
				display.ref = 'playVideo';
			}, true);
		},
		views : {
			playVideo : function() {
				viewManager.getAssets('intro').render();
			},
			showMenu : function() {
				viewManager.getAssets('title').render(0, 0);
				var e = viewManager.createSingleInstanceEntity(
					'menu', 'main_menu', {
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
								click : function() {
									if(!this['clickActive']) {
										viewManager.transitions.fade(
											2000, 
											function() {
												display.update('houseSelect');
											},
											true,
											false
										);
									}
								}
							}
						}
					}
				);

				if(e){e.render();}	
			},
			houseSelect : function() {
				var e = viewManager.createSingleInstanceEntity('menu', 'house_select', {
					x : 0,
					y : 0,
					height : 200,
					width  : 375,
					buttons : {
						harkonen : {
							label : '',
							background : function() {
								viewManager.getAssets('houses').render('harkonen', 0, 0, 0);
							},
							click : function(){}
						},
						ordos : {
							background : function() {
								//viewManager.getAssets('houses').render('ordos', 0, 0, 0);
							},
							click : function(){}
						},
						atradies : {
							background : function() {
								//viewManager.getAssets('houses').render('atradies', 0, 0, 0);
							},
							click : function(){}
						}
					}
				});

				if(e){e.render();}
			}
		},
		current : function(){
			this.beforeRender();
			
			if(this.ref !== 'current' && this.ref !== 'paused') {
				
				if(typeof this.views[this.ref] == 'function') {
					this.views[this.ref]();
				}
			}
		},
		update : function(ref, transition) {
			
			if(typeof transition === 'function') {
				display.ref = function() {
					this.retval = transition(this.retval);
					if(!this.retval) {
						display.ref = ref;
					}
				}
			}
			this.ref = ref;
		}, 
		beforeRender: function(){
			//viewManager.refresh();
			//viewManager.renderBackground('#000');
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
			}, 
			'title' : {
				'type' : 'image',
				'src' : '/assets/title.png'
			},
			'houses' : {
				'type' : 'sprite',
				'src'  : '/assets/sprites/house_select.png',
				'sprites' : {
					'h' : 91,
					'w' : 83,
					'atradies' : {},
					'ordos'    : {},
					'harkonen' : {}
				}
			}
		},
		entities : {
			'menu' : '/src/entities/menu.js'
		},
		events : {
			click : [
				function(e) {
					if(display.ref == 'playVideo') {
						display.update('showMenu', function(){});
					}
				}
			], 
			keydown : [
				function(e) {
					display.update('showMenu');
				} 
			]	
		}
	}
	var init = false;
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
