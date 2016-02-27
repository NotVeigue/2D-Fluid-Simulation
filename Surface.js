
// A shader pass with a buffer associated with it for holding the results of a render if necessary. 
function Surface(renderer, w, h, format, type, material, texUniformName, wrap, filter)
{
	var _this = this;

	_this.buffer = new THREE.WebGLRenderTarget(w, h, {
		wrapS: wrap || THREE.RepeatWrapping,
		wrapT: wrap || THREE.RepeatWrapping,
		minFilter: filter || THREE.NearestFilter,
		magFilter: filter || THREE.NearestFilter,
		format: format,
		type: type,
		stencilBuffer: false
	});

	var scene  = new THREE.Scene();
	var camera = new THREE.OrthographicCamera(-w/2, w/2, h/2, -h/2, -999999, 999999);
	var mesh   = new THREE.Mesh(new THREE.PlaneBufferGeometry(w, h, 1, 1), material);

	scene.add(camera);
	scene.add(mesh);

	_this.render = function(source, target)
	{
		if(source)
		{
			material.uniforms[texUniformName].value = source;
		}

		renderer.render(scene, camera, target, false);
	};

	_this.scene = scene;
	_this.camera = camera;
};