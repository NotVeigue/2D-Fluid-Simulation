function DoubleBuffer(renderer, w, h, format, type, material, texUniformName, wrap, filter)
{
	var _this = this;

	_this.front = new THREE.WebGLRenderTarget(w, h, {
		wrapS: wrap || THREE.RepeatWrapping,
		wrapT: wrap || THREE.RepeatWrapping,
		minFilter: filter || THREE.LinearFilter,
		magFilter: filter || THREE.LinearFilter,
		format: format,
		type: type,
		stencilBuffer: false
	});
	_this.back = _this.front.clone();

	var scene  = new THREE.Scene();
	var camera = new THREE.OrthographicCamera(-w/2, w/2, h/2, -h/2, -999999, 999999);
	var mesh   = new THREE.Mesh(new THREE.PlaneBufferGeometry(w, h, 1, 1), material);

	scene.add(camera);
	scene.add(mesh);

	_this.render = function(source, target)
	{
		material.uniforms[texUniformName].value = source;
		renderer.render(scene, camera, target, false);
	};

	_this.swap = function()
	{
		var temp = _this.front;
		_this.front = _this.back;
		_this.back = temp;
	};

	// Just for debugging
	_this.scene = scene;
	_this.camera = camera;
};