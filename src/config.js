var _global = (function() {

	var services = {
			Assets : {
				_class  : '/src/libs/AssetManager.js',
				instance : false,
				'onInit' : function(instance) {
					this.instance = instance;
				}
			},
			Entity : {
				_class   : '/src/libs/EntityManager.js',
				instance : false,
				'onInit' : function(instance) {
					this.instance = instance;
				}
			},
			View : {
				_class   : '/src/libs/ViewManager.js',
				instance : false,
				onInit   : function(instance, state, cb) {
					this.instance = instance;
					view = this.getView(state.view.label || 'intro', function(view){
					if(view) {
						state.view.label = view.label;
						state.view.instance = view.instance; 
					}
						cb(view);
					});
				},
				getView : function(label, callback) {
					cb = (typeof callback == 'function') ? callback : function(){}
					
					if(!this.instance.get(label)) {
						var that = this,
							path = '/src/stages/' + label + '.js';  
						
						services.game.autoload(path, function() {
							cb(that.instance._register(label));	
						}); 
					}
					else{
						cb(this.instance.get(label));
					}
				}
			}
		}, loaded = false;


	return {
		tmp : false,
		loadServices : function(game, cb) {
			if(loaded) { 
				return; 
			}
			services.game = game;
			game.autoload(services.Assets._class, function() {
				services.Assets.onInit(_global.tmp(game))
				game.autoload(services.Entity._class, function() { 
					services.Entity.onInit(_global.tmp(services.Assets.instance, game));
					game.autoload(services.View._class, function() { 
						var e =services.Entity.instance, a=services.Assets.instance;
						services.View.onInit(_global.tmp(e,a, game), game.state, cb);
						_global.tmp = false;
						loaded = true;
						game.state.ready = 1;
					});
				});
			});
		}
	}
})();

