var rand_color
var rand_color_1

var renderer, scene, camera, composer, planet;

const score = 0;

window.onload = function init() 
{

  // const canvas = document.getElementById( "gl-canvas" );
  renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xA6CDFB, 1, 1000);
  console.log('camera');
  console.log(window.innerWidth);
  console.log(window.innerHeight);


  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 3;
  camera.position.x = 0;
  camera.position.y = 100;
  scene.add(camera);

  planet = new THREE.Object3D();
  scene.add(planet);

  planet.position.y = -300;
  planet.position.z = -150;

  var geom = new THREE.IcosahedronGeometry(15, 2);
  // var mat = new THREE.MeshPhongMaterial({
  //   color: 0xBD9779,
  //   shading: THREE.FlatShading
  // });
  var mat = createMaterial();

  var mesh = new THREE.Mesh(geom, mat);
  mesh.scale.x = mesh.scale.y = mesh.scale.z = 18;
  planet.add(mesh);

  var ambientLight = new THREE.AmbientLight(0xf1eae4);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  const loader = new THREE.GLTFLoader();
  loader.load('../models/littlePrincess_2.glb', function(glb){
    princess = glb.scene.children[0];
    princess.scale.set(20, 20 , 20);
    princess.position.x = 50;
    princess.position.y = -30;
    princess.position.z = -90;
    scene.add(glb.scene)
  }, undefined, function (error) {
     console.error(error);
  });

  window.addEventListener('resize', onWindowResize, false);

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 5;
  camera.position.z = 3;
  
    {
      const color = 0xFFFFFF;
      const intensity = 0.8;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

  const boxWidth = 0.6;
  const boxHeight = 0.6;
  const boxDepth = 0.6;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x, y) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;

    return cube;
  }

  randomColor();

  const random_array = {rand_color, rand_color_1};
  console.log(random_array);

  answer_cube = Math.floor(Math.random()*8);
  console.log(answer_cube);

  const x = [-1.0, 0.0, 1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0];
  const y = [0.9, 0.9, 0.9, 0.0, 0.0, 0.0, -0.9, -0.9, -0.9,];
  const cubes = [];

  for(var i=0; i<9; i++){
    if(i==answer_cube){
      cubes.push(makeInstance(geometry, rand_color_1, x[i], y[i]));
    }
    else{
      cubes.push(makeInstance(geometry, rand_color, x[i], y[i]));
    }
    console.log(cubes.length);

  }

  function render(time) {
    time *= 0.001;  // convert time to seconds

    cubes.forEach((cube, ndx) => {
      const speed = 0.3 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function randomColor() {
    var r = Math.random();
    var g = Math.random();
    var b = Math.random();
    r1 = r-0.2;
    g1 = g-0.2;
    b1 = b-0.2;
    rand_color = new THREE.Color(r, g, b);
    rand_color_1 = new THREE.Color(r1, g1, b1);

  };



  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  function animate() {
    requestAnimationFrame(animate);
  
    planet.rotation.z += .001;
    planet.rotation.y = 0;
    planet.rotation.x = 0;
    renderer.clear();
  
    renderer.render( scene, camera );
  };



 
  let onMouseClick = function(e){
    let gap1 = e.clientX - e.offsetX
    let gap2 = e.clientY - e.offsetY
    mouse.x = ( (e.clientX - gap1)/(window.innerWidth*0.375) )*2 -1;
    mouse.y =  -( (e.clientY-gap2)/(window.innerHeight*0.375) )*2 +1;
    
    var x = mouse.x;
    var y = mouse.y;
    console.log(x);
    console.log(y);

    var user_answer;

    if(0.85<=x && x<=1.25){
      if(-0.91<=y && y<=-0.25){
        user_answer = 0;
      }
      if(-1.97<=y && y<=-1.31){
        user_answer = 3;
      }
      if(-3.14<=y && y<=-2.35){
        user_answer = 6;
      }
    }
    else if(1.45<=x && x<=1.82){
      if(-0.91<=y && y<=-0.25){
        user_answer = 1;
      }
      if(-1.97<=y && y<=-1.31){
        user_answer = 4;
      }
      if(-3.14<=y && y<=-2.35){
        user_answer = 7;
      }
    }
    else if(2.05<=x && x<=2.45){
      if(-0.91<=y && y<=-0.25){
        user_answer = 2;
      }
      if(-1.97<=y && y<=-1.31){
        user_answer = 5;
      }
      if(-3.14<=y && y<=-2.35){
        user_answer = 8;
      }
    }

    console.log(user_answer);

    if(user_answer == answer_cube){
      window.location.href = '../yes.html';
      console.log('Bingo');
      score++;
    }
    else{
      window.location.href = '../no.html';
      console.log('NOOOOOOOOOOOOO');
      score--;
    }
    console.log('score', score);

    rayCast.setFromCamera(mouse,camera);
  }

  

  requestAnimationFrame(render);	
  renderer.render(scene, camera);

  animate();

  rayCast = new THREE.Raycaster();

  mouse = new THREE.Vector2();

  mouse.x = mouse.y = -1;

  document.getElementById('canvas').appendChild(renderer.domElement);

  // renderer.domElement.addEventListener("click",onMouseClick,false);
  document.getElementById('canvas').addEventListener("click", onMouseClick, false);

 
}

function createMaterial(){
  var discoTexture = THREE.ImageUtils.loadTexture("rainbow1.jpg");
  var discoMaterial = new THREE.MeshBasicMaterial({
    // color: 0xBD9779,
    // shading: THREE.FlatShading
});
  discoMaterial.map = discoTexture;

  return discoMaterial;
}