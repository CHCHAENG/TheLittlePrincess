
var renderer, scene, camera, composer, planet;

var num_2="";
var num_2_2 = "";
var num_10 = -1 ;
var input;
var result;
var flag = 0;

makeBinaryNum();
changeBinaryToDecimal();

function makeBinaryNum(){

    // 4bit 2진수 랜덤으로 숫자 생성
    var i = 4;
    while (i > 0){
        const num = Math.round(Math.random());
        num_2 = num_2 + num.toString();
        i--;
    }

    //html에 표시할 변수에 저장
    num_2_2 = num_2;
}

function changeBinaryToDecimal(){
    // 10진수로 바꾸기
    if(num_2 == "0000") {
        num_10= parseInt(0);
    }
    else {
        num_10 = (parseInt(num_2,2));
    }
}

function checkAnswer(answer){
    // 값 맞는지 확인
   if (num_10 == answer){
       alert("정답!");
   }else{
       alert("오답!");
   }
}

window.onload = function() {
  init();
  animate();

  var btn = document.getElementsByClassName("btn")[0];

  //html에서 버튼 클릭시 값 갖고와서 확인
  btn.addEventListener("click", function(){
      var answer = document.getElementById("answer").value;
      answer = parseInt(answer);
      checkAnswer(answer);
  });

  hlight = new THREE.AmbientLight (0x404040,50);
	scene.add(hlight);
	light = new THREE.DirectionalLight(0xc4c4c4,10);
	light.position.set(0,3000,5000);
	scene.add(light);

	const loader = new THREE.GLTFLoader();
	loader.load('./models/littlePrincess_2.glb', function(gltf){
    console.log("GOOD");
	  scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});
}

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x00000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xA6CDFB, 1, 1000);

  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  camera.position.x = 0;
  camera.position.y = 100;
  scene.add(camera);

  planet = new THREE.Object3D();
  scene.add(planet);

  planet.position.y = -180;
 
  var geom = new THREE.IcosahedronGeometry(15, 2);
  // var mat = new THREE.MeshPhongMaterial({
  //   color: 0xBD9779,
  //   shading: THREE.FlatShading
  // });

  var mat = createMaterial();
  var mesh = new THREE.Mesh(geom, mat);
  mesh.scale.x = mesh.scale.y = mesh.scale.z = 18;
  planet.add(mesh);


  var ambientLight = new THREE.AmbientLight(0xBD9779);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);


  window.addEventListener('resize', onWindowResize, false);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function createMaterial(){
  var bitTexture = THREE.ImageUtils.loadTexture("green.jpg");
  var bitMaterial = new THREE.MeshBasicMaterial();
  bitMaterial.map = bitTexture;

  return bitMaterial;
}

function animate() {
  requestAnimationFrame(animate);
  planet.rotation.z += .002;
  planet.rotation.y = 0;
  planet.rotation.x = 0;
  renderer.clear();
  renderer.render( scene, camera );
};