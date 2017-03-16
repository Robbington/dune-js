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
	}, game = game;

	if(typeof args =='object') {
		for(r in render_map) {
			if(typeof args[r] !== 'undefined') {
				render_map[r] = args[r];
			}
		}
	}

	var _renderObjBg = function(bg, obj) {
		switch(typeof bg) {
			case 'function':
				return bg();
			case 'string':
				if(bg == 'box') {
					game.canvas.wrapper.rect(
						obj.x || 0,
						obj.y || 0,
						obj.width  || '',
						obj.height || '',
						obj.colour || ''
					); 
				}
				break;
		}
	},
	renderButtons = function() {
		for(var b in render_map.buttons) {
			var button = render_map.buttons[b];
			_renderObjBg(button.background, button);
			game.canvas.wrapper.write (
				button.label || '',
				button.x,
				button.y,
				render_map.font,
				render_map.font_color,
				render_map.font_stroke
			);
		}
	},
	setupButtons = (function() {
		var line = render_map.y + (render_map.lineheight / 2),
			x    = render_map.x;
		for(var b in render_map.buttons) { 
			
			var but = render_map.buttons[b],
				t_x = (but.indent) ? x + but.indent : x;

			render_map.buttons[b].x = t_x;
			render_map.buttons[b].y = line;
			render_map.buttons[b].state  = false;
			render_map.buttons[b].hoverActive = false;
			render_map.buttons[b].width  = but.width  || render_map.width;
			render_map.buttons[b].height = but.height || render_map.height;

			line = line + render_map.lineheight;
		}
	})();

	handleButtonEvents = function(e) {
		for(var but in render_map.buttons) {
			var b = render_map.buttons[but];
			if(typeof b[e.type] == 'function') {
				if(e._in(b.x,b.y,b.width,b.height)) {
					b[e.type]();
					b[e.type+"Active"] = true;
					break;
				} 
				else if (b.hoverActive) {

				}
			}
		}
	};

	return {
		render : function() {
			if(typeof render_map.render === 'function'){
				return render_map.render(game);
			}

			_renderObjBg(render_map.background, render_map);
			renderButtons();
		}, 
		handleEvent : function(e) {
			if(e.type == 'click' || e.type =='hover'){
				var rm = render_map;
				if(e._in(rm.x, rm.y, rm.width, rm.height)) {
					handleButtonEvents(e);					
				}
			}
		}
	}
}