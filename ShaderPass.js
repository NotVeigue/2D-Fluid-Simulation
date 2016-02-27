
// Performs a pass of the shader specified by material on a given source, rendering to a specifed target.
function ShaderPass(renderer, w, h, material, texUniformName)
{
	var _this = this;

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