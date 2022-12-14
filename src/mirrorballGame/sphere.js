
var renderer, scene, camera, composer, planet, mixer, clock;
var stars=[];

var quiz = [];
var quizArrow = [];
var answer = [];
var keyArray = [37, 38, 39, 40];
var arrow = ["⇦", "⇧", "⇨", "⇩"];


//quiz 랜덤 출제
for(var i = 0; i < 6; i++ ){
  j = Math.floor(Math.random() * 4);
  console.log(j);
  quiz.push(keyArray[j]);
  quizArrow.push(arrow[j]);
  console.log(quiz);
}

//방향키 누르면 값 받아서 answer array에 저장
//6번 누르게 될경우 정답과 비교하는 함수 호출
$(document).keydown(function(e) {
  if (e.which==37) {
    $('.left').addClass('pressed'); 
    $('.lefttext').text('LEFT');
    $('.left').css('transform', 'translate(0, 2px)');
    if(answer.length == 5) {
      answer.push(37);
      quizResult();}else{
      answer.push(37);
      console.log(answer);
    }
  } else if (e.which==38) {
    $('.up').addClass('pressed');
    $('.uptext').text('UP');
    $('.left').css('transform', 'translate(0, 2px)');
    $('.down').css('transform', 'translate(0, 2px)');
    $('.right').css('transform', 'translate(0, 2px)');
    if(answer.length == 5) {
      answer.push(38);
      quizResult();}else{
      answer.push(38);
      console.log(answer);
    }
  } else if (e.which==39) {
    $('.right').addClass('pressed');
    $('.righttext').text('RIGHT'); 
    $('.right').css('transform', 'translate(0, 2px)');
    if(answer.length == 5) {
      answer.push(39);
      quizResult();}else{
      answer.push(39);
      console.log(answer);
    }
  } else if (e.which==40) {
    $('.down').addClass('pressed');
    $('.downtext').text('DOWN');
    $('.down').css('transform', 'translate(0, 2px)');
    if(answer.length == 5) {
      answer.push(40);
      quizResult();} else{
      answer.push(40);
      console.log(answer);
    }
  }
});

$(document).keyup(function(e) {
  if (e.which==37) {
    $('.left').removeClass('pressed');
    $('.lefttext').text('');   
    $('.left').css('transform', 'translate(0, 0)');  
  } else if (e.which==38) {
    $('.up').removeClass('pressed');
    $('.uptext').text('');
    $('.left').css('transform', 'translate(0, 0)');
    $('.down').css('transform', 'translate(0, 0)');
    $('.right').css('transform', 'translate(0, 0)');
  } else if (e.which==39) {
    $('.right').removeClass('pressed'); 
    $('.righttext').text(''); 
    $('.right').css('transform', 'translate(0, 0)');
  } else if (e.which==40) {
    $('.down').removeClass('pressed');
    $('.downtext').text('');
    $('.down').css('transform', 'translate(0, 0)');
  }  
});


//정답과 비교하는 함수
function quizResult() {
  for(var i = 0; i < answer.length; i++){
    if(answer[i] != quiz[i]){
      window.location.href = '../no.html';
      break;
    }
    else{
      if(i == 5){
        window.location.href = '../yes.html';
      }
    }
  }
}

window.onload = function() {
  init();
  addSphere();

  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
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

  clock = new THREE.Clock();
  

  const loader = new THREE.GLTFLoader();
	loader.load('littlePrincess_2.glb', function(glb){
	  princess = glb.scene.children[0];
	  princess.scale.set(20, 20 ,20);
    princess.position.x = 50;
    princess.position.y = 90;
    princess.position.z = 150;

    mixer = new THREE.AnimationMixer(glb.scene);

		var action = mixer.clipAction( glb.animations[ 0 ] );
		action.play();
    
	  scene.add(glb.scene);


	}, undefined, function (error) {
		console.error(error);
	});

  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function createMaterial(){
  var discoTexture = THREE.ImageUtils.loadTexture("disco.jpeg");
  var discoMaterial = new THREE.MeshBasicMaterial({
    // color: 0xBD9779,
    // shading: THREE.FlatShading
});
  discoMaterial.map = discoTexture;

  return discoMaterial;
}

function animate() {
  requestAnimationFrame(animate);

  planet.rotation.z -= .001;
  planet.rotation.y = 0;
  planet.rotation.x = 0;
  renderer.clear();

  var delta = clock.getDelta();
	if ( mixer ) mixer.update( delta );

  
  animateStars();
  renderer.render( scene, camera );
};


function addSphere(){

  // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
  for ( var x= -400; x < 400; x+=10 ) {

    // Make a sphere (exactly the same as before). 
    var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
    var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var sphere = new THREE.Mesh(geometry, material)

    // This time we give the sphere random x and y positions between -500 and 500
    sphere.position.z = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;

    // Then set the z position to where it is in the loop (distance of camera)
    sphere.position.x = x;

    // scale it up a bit
    sphere.scale.x = sphere.scale.y = 4;

    //add the sphere to the scene
    scene.add( sphere );

    //finally push it to the stars array 
    stars.push(sphere); 
  }
}

function animateStars() { 
  
// loop through each star
for(var i=0; i<stars.length; i++) {

star = stars[i]; 
  
// and move it forward dependent on the mouseY position. 
star.position.x -=  i/30;
  
// if the particle is too close move it to the back
if(star.position.x<-400) star.position.x+=800; 

}

}



var Konami = function (callback) {
  var konami = {
    addEvent: function (obj, type, fn, ref_obj) {
      if (obj.addEventListener)
        obj.addEventListener(type, fn, false);
      else if (obj.attachEvent) {
        // IE
        obj["e" + type + fn] = fn;
        obj[type + fn] = function () {
          obj["e" + type + fn](window.event, ref_obj);
        }
        obj.attachEvent("on" + type, obj[type + fn]);
      }
    },
    input: "",
    pattern: "38384040373937396665",
    load: function (link) {
      this.addEvent(document, "keydown", function (e, ref_obj) {
        if (ref_obj) konami = ref_obj; // IE
        konami.input += e ? e.keyCode : event.keyCode;
        if (konami.input.length > konami.pattern.length)
          konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
        if (konami.input == konami.pattern) {
          konami.code(link);
          konami.input = "";
          e.preventDefault();
          return false;
        }
      }, this);
      this.iphone.load(link);
    },
    code: function (link) {
      window.location = link
    },
    iphone: {
      start_x: 0,
      start_y: 0,
      stop_x: 0,
      stop_y: 0,
      tap: false,
      capture: false,
      orig_keys: "",
      keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
      code: function (link) {
        konami.code(link);
      },
      load: function (link) {
        this.orig_keys = this.keys;
        konami.addEvent(document, "touchmove", function (e) {
          if (e.touches.length == 1 && konami.iphone.capture == true) {
            var touch = e.touches[0];
            konami.iphone.stop_x = touch.pageX;
            konami.iphone.stop_y = touch.pageY;
            konami.iphone.tap = false;
            konami.iphone.capture = false;
            konami.iphone.check_direction();
          }
        });
        konami.addEvent(document, "touchend", function (evt) {
          if (konami.iphone.tap == true) konami.iphone.check_direction(link);
        }, false);
        konami.addEvent(document, "touchstart", function (evt) {
          konami.iphone.start_x = evt.changedTouches[0].pageX;
          konami.iphone.start_y = evt.changedTouches[0].pageY;
          konami.iphone.tap = true;
          konami.iphone.capture = true;
        });
      },
      check_direction: function (link) {
        x_magnitude = Math.abs(this.start_x - this.stop_x);
        y_magnitude = Math.abs(this.start_y - this.stop_y);
        x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
        y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
        result = (x_magnitude > y_magnitude) ? x : y;
        result = (this.tap == true) ? "TAP" : result;

        if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
        if (this.keys.length == 0) {
          this.keys = this.orig_keys;
          this.code(link);
        }
      }
    }
  }

  typeof callback === "string" && konami.load(callback);
  if (typeof callback === "function") {
    konami.code = callback;
    konami.load();
  }

  return konami;
};