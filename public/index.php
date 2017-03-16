
<html>
	<head>
		<title></title>
		<script type='text/javascript' src='src/main.js'></script>
	</head>
	<body> 
		<div id="wrapper">
			<canvas height='500' width='1000' id='canvas'></canvas>
		</div>
		<script type='text/javascript'>
			var g = main.init(document.getElementById('canvas')); 		
		</script>
		<style type='text/css'>
			* {
				margin:0;
				padding:0;
			}
			body {
				background-color: #000;
			}
			#wrapper {
				width:100%;
				height:100%;
				margin-top:80px;
				text-align: center;
			}
			#canvas {
				width:1000px;
				height:500px;
				background-color: #fff;
			}

			@font-face {
    			font-family: 'dos';
    			src: url('/assets/fonts/dos_vga.ttf');
			}

		</style>
	</body>
</html>