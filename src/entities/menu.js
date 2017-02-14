_global = _global || {}


_global.tmp = function(args, game) {
	var render_map = {
		width : 0,
		height: 0,
		background: false,
		colour : false,
		font   : false,
		font_size : false,
		font_color : false,
		font_stroke : false,
		x      : 0,
		y      : 0, 
		buttons : {},
		render : false,
		lineheight : 0
	}, game = game, 
	renderBackground  = function(){
		if(render_map.background) {
			let bg = render_map.background
			if(typeof bg == 'function') {
				return bg();
			}
			else if(typeof bg == 'string') {
				switch(bg) {
					case 'box':
						game.canvas.wrapper.rect(
							render_map.x,
							render_map.y,
							render_map.width,
							render_map.height,
							render_map.colour
						); 
						break;
				}
			}
		}
	},
	renderButtons = function() {

		var line = render_map.y + (render_map.lineheight / 2),
			x    = render_map.x; 
		for(var b in render_map.buttons) {
			var but = render_map.buttons[b],
			t_x = (but.indent) ? x + but.indent : x;
			
			game.canvas.wrapper.write (
				but.label || '',
				t_x,
				line,
				render_map.font,
				render_map.font_color,
				render_map.font_stroke
			);
			line = line + render_map.lineheight;
		}
	}

	if(typeof args =='object') {
		for(r in render_map) {
			if(typeof args[r] !== 'undefined') {
				render_map[r] = args[r];
			}
		}
	}

	return {
		render : function() {
			if(typeof render_map.render === 'function'){
				return render_map.render(game);
			}

			//renderBackground();
			renderButtons();
			game.loop.stop();
		}, 
		handle : function(e) {
			console.log(e);
		}
	}
}