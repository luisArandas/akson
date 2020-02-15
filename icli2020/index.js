var glitchPass;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );*/

composer = new THREE.EffectComposer(renderer);
composer.addPass( new THREE.RenderPass( scene, camera ) );

composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

glitchPass = new THREE.GlitchPass();
composer.addPass(glitchPass);
glitchPass.renderToScreen = false;

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  composer.render();
}
animate();
/*var camera, scene, renderer, composer;
			var object, light;


			init();
			animate();

			function init() {

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

				object = new THREE.Object3D();
				scene.add( object );

				var geometry = new THREE.SphereBufferGeometry( 1, 4, 4 );

				for ( var i = 0; i < 100; i ++ ) {

					var material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), flatShading: true } );

					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
					mesh.position.multiplyScalar( Math.random() * 400 );
					mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
					object.add( mesh );

				}

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				// postprocessing

				composer = new THREE.EffectComposer(renderer);
				composer.addPass( new THREE.RenderPass( scene, camera ) );

				glitchPass = new THREE.GlitchPass();
				composer.addPass( glitchPass );


				//

				window.addEventListener( 'resize', onWindowResize, false );
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				composer.setSize( window.innerWidth, window.innerHeight );


			}

			function animate() {

				requestAnimationFrame( animate );

				object.rotation.x += 0.005;
				object.rotation.y += 0.01;

				composer.render();

			}
*/
