_global = _global || {}

	

_global.tmp = function(viewManager) {

	var id = 'intro';

	viewManager.registerAssets(id, {
		'background' : {
			type : 'image',
			src  : '/assets/title.jpg',
			dims : {w:true,h:true},
		}	
	});

	viewManager.registerEntities({


	});	

	return {
		label : id,
		render : function(cxt, canvas){
			viewManager.renderAsset(id, 'background', 0, 0);
		}
	}
}