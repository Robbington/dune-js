var _global = _global || {}

_global.tmp = function(ctx, canvas) {
	
	canvas.getCentre = function(prop, adj) {
		var a = prop / 2;
		if(parseInt(adj) > 0) {
			a = a - (adj / 2);
		}
		return a
	};

	var _tmp = {},
	draw  = function(f, ref) {
		ctx.save();
		f();
		ctx.restore();
	},
	write = function(text, x, y, font, c, s){
		ctx.save();
		//save(['font', 'fillStyle'])
		
		if(typeof font == 'string') {
			ctx.font = font;
		}

		if(typeof c == 'string') {
			ctx.fillStyle = c;
		}

		ctx.fillText(text, x, y);
		if(s) {
			ctx.strokeText(text, x, y);
  		}
  		ctx.restore();
	},
	save  = function(ref) {
		for(var r=0;r<ref.length;r++){
			_tmp[ref[r]] = ctx[r];
		}
	},
	reset = function(){
		for(var r in _tmp) {
			ctx[r] = _tmp[r];
		}
		_tmp = {};
	}, 
	getX = function(x, w) {
		if(x == true) {
			return canvas.getCentre(canvas.getWidth(), w);
		}
		return x;
	},
	getY = function(y, h){
		if(y == true) {
			return canvas.getCentre(canvas.getHeight(), h);
		}
		return y;
	}

	return {
		rect : function(x,y,w,h,c,lw) {
			draw(function(){
				ctx.beginPath();
				x = getX(x, w);
				y = getY(y, h);
				if(lw) {
					ctx.lineWidth=lw;
					if(c) {
						ctx.strokeStyle=c;		
					}
				}
				if(c && !lw) {
					ctx.fillStyle = c;
   					ctx.fillRect(x,y,w,h);
				} else {
					ctx.rect(x,y,w,h);
					ctx.stroke();
				}
				
			}, ['lineWidth', 'strokeStyle', 'fillStyle']);
		},
		write : write,
		background: function(bg) {
			if(typeof(bg) === 'string') {
				this.rect(0, 0, canvas.getWidth(), canvas.getHeight(), bg, false);
			}
		}, 
		fade : function(inc, set) {
			var opacity = parseFloat(canvas.element.style.opacity || 1);
			if(set) {
				opacity = set;
			}
			else{
				opacity += inc;
			}

			canvas.element.style.opacity = opacity;
		}
	}
}