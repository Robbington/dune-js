var _global = (function(){

	var services = {
			Asset : {
				_class  : '/src/libs/AssetManager.js',
				'onInit' : function(game) {
				}
			},
			Entity : {
				_class   : '/src/libs/EntityManager.js',
				'onInit' : function(game) {
				}
			},
			Stage : {
				_class   : '/src/libs/StageManager.js',
				'onInit' : function(game) {
					var state = game.getState();
					if(state.stage) {
						//ToDo, see main.js
					} else {
						state.state = stages['intro']
					}
				},
				stages : {
					'intro' : {},
					'menu'  : {},
 					'map'	: {}
				}
			}
		}

	return {
		getServices : function(){
			return services;
		}
	}
})();

