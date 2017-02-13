_global = _global || {}

_global.tmp = function(ctx) {
	
	var _tmp = {},
	draw  = function(f, ref) {
		save(ref);
		f();
		reset();
	},
	save  = function(ref) {
		for(var r=0;r<ref.length;r++){
			_tmp[ref[r]] = ctx[r];
		}
	},
	reset = function(){
		for(var r in tmp) {
			ctx[r] = _tmp[r];
		}
		tmp = {};
	};

	return {
		rect : function(x,y,w,h,c,lw) {
			draw(function(){
				ctx.beginPath();
				if(lw) {
					ctx.lineWidth=lw;
				}
				if(c) {
					ctx.strokeStyle=c;		
				}
				ctx.rect(x,y,w,h);
				ctx.stroke();
			}, ['lineWidth', 'strokeStyle']);
		}, 
		draw : 
	}
}