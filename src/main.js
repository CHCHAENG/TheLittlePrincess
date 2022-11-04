
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Princess } from './princess';
import { B612 } from './b612';
import { Bit } from './bit';
import { Mirror } from './mirror';
import { Gradation } from './gradation';
import gsap from 'gsap';

//raycaster로 이동 구현
const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let destination = new THREE.Vector3();
let angle = 0;
let isPressed = false;

function setSize() {
	camera.left = -(window.innerWidth / window.innerHeight);
	camera.right = window.innerWidth / window.innerHeight;
	camera.top = 1;
	camera.bottom = -1;

	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

window.addEventListener('resize', setSize);

// Texture
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('/images/space4.jpg');
const mirrorTexture = textureLoader.load('/images/mirror2.png');
const bitTexture = textureLoader.load('/images/bit.png');
const gradationTexture = textureLoader.load('/images/gradation.png');

const start1Texture = textureLoader.load('/images/startMessage_1.png');
const start2Texture = textureLoader.load('/images/startMessage_2.png');

const leaveTexture = textureLoader.load('/images/diary_leave.png');
const diaryTexture = textureLoader.load('/images/diary1_1.png');
const mirrorDiaryTexture = textureLoader.load('/images/diary_mirrorball.png');
const graDiaryTexture = textureLoader.load('/images/diary_coloring.png');

const greenCandyTexture = textureLoader.load('/images/greenCandy.png');
const roseBoyTexture = textureLoader.load('/images/roseBoy.png');
const shrimpTexture = textureLoader.load('/images/shrimp.png');
const seaPlanetTexture = textureLoader.load('/images/seaPlanet.png');

const rosePointTexture = textureLoader.load('/images/rosePoint.png')

const ending1Texture = textureLoader.load('/images/ending_1.png');
const ending2Texture = textureLoader.load('/images/ending_2.png');
const ending3Texture = textureLoader.load('/images/ending_3.png');
const ending4Texture = textureLoader.load('/images/ending_4.png');
const sadRoseTexture = textureLoader.load('/images/sadRoseBoy.png');
const finalEndingTexture = textureLoader.load('/images/finalEnding.png');

floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.x = 1;
floorTexture.repeat.y = 1;

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.OrthographicCamera(
	-(window.innerWidth / window.innerHeight), // left
	window.innerWidth / window.innerHeight, // right,
	1, // top
	-1, // bottom
	-1000,
	1000
);

const cameraPosition = new THREE.Vector3(1, 5, 5);
camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
camera.zoom = 0.2;
camera.updateProjectionMatrix();
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.7);
const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
directionalLight.position.x = directionalLightOriginPosition.x;
directionalLight.position.y = directionalLightOriginPosition.y;
directionalLight.position.z = directionalLightOriginPosition.z;
directionalLight.castShadow = true;

// mapSize 세팅으로 그림자 퀄리티 설정
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
// 그림자 범위
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = -100;
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);

// Mesh
const meshes = [];
const spaceMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(150, 150),
	new THREE.MeshStandardMaterial({
		map: floorTexture
	})
);
spaceMesh.name = 'floor';
spaceMesh.rotation.x = -Math.PI/2;
spaceMesh.receiveShadow = true;
scene.add(spaceMesh);
meshes.push(spaceMesh);




//start Message
const leaveMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 5),
	new THREE.MeshStandardMaterial({
		map: leaveTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
leaveMesh.name = 'start1';
leaveMesh.position.set(-10, 0.005, -5)
leaveMesh.rotation.x = -Math.PI/2;
leaveMesh.receiveShadow = true;
scene.add(leaveMesh);

const start1Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5),
	new THREE.MeshStandardMaterial({
		map: start1Texture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
start1Mesh.name = 'start1';
start1Mesh.position.set(-5, 0.005, -5)
start1Mesh.rotation.x = -Math.PI/2;
start1Mesh.receiveShadow = true;
scene.add(start1Mesh);

const start2Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5),
	new THREE.MeshStandardMaterial({
		map: start2Texture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
start2Mesh.name = 'start2';
start2Mesh.position.set(0, 0.005, -5)
start2Mesh.rotation.x = -Math.PI/2;
start2Mesh.receiveShadow = true;
scene.add(start2Mesh);


//bit Diary Mesh
const bitDiaryMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(6, 10),
	new THREE.MeshStandardMaterial({
		map: diaryTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
bitDiaryMesh.name = 'bitDiary';
bitDiaryMesh.position.set(3, 0.005, 10)
bitDiaryMesh.rotation.x = -Math.PI/2;
bitDiaryMesh.receiveShadow = true;
scene.add(bitDiaryMesh);

//mirrorBall Diary Mesh
const mirrorDiaryMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(6, 10),
	new THREE.MeshStandardMaterial({
		map: mirrorDiaryTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
mirrorDiaryMesh.name = 'mirrorDiary';
mirrorDiaryMesh.position.set(21, 0.005, 0)
mirrorDiaryMesh.rotation.x = -Math.PI/2;
mirrorDiaryMesh.receiveShadow = true;
scene.add(mirrorDiaryMesh);

//gradation Diary Mesh
const graDiaryMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(6, 10),
	new THREE.MeshStandardMaterial({
		map: graDiaryTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
graDiaryMesh.name = 'gradationDiary';
graDiaryMesh.position.set(30, 0.005, 10)
graDiaryMesh.rotation.x = -Math.PI/2;
graDiaryMesh.receiveShadow = true;
scene.add(graDiaryMesh);

//Tmi Meshes - roseboy
const roseBoyMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(2, 2),
	new THREE.MeshStandardMaterial({
		map: roseBoyTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
roseBoyMesh.name = 'roseBoy';
roseBoyMesh.position.set(-10, 0.005, 10)
roseBoyMesh.rotation.x = -Math.PI/2;
roseBoyMesh.receiveShadow = true;
scene.add(roseBoyMesh);

//greenCandy
const greenCandyMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		map: greenCandyTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
greenCandyMesh.name = 'greenCandy';
greenCandyMesh.position.set(27, 0.005, 15)
greenCandyMesh.rotation.x = -Math.PI/2;
greenCandyMesh.receiveShadow = true;
scene.add(greenCandyMesh);

//shrimp
const shrimpMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		map: shrimpTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
shrimpMesh.name = 'shrimp';
shrimpMesh.position.set(23, 0.005, 5)
shrimpMesh.rotation.x = -Math.PI/2;
shrimpMesh.receiveShadow = true;
scene.add(shrimpMesh);

//seaPlanet
const seaPlanetMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 2),
	new THREE.MeshStandardMaterial({
		map: seaPlanetTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
seaPlanetMesh.name = 'seaPlanet';
seaPlanetMesh.position.set(25, 0.005, 0)
seaPlanetMesh.rotation.x = -Math.PI/2;
seaPlanetMesh.receiveShadow = true;
scene.add(seaPlanetMesh);

//Ending Mesh
const ending1Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 3),
	new THREE.MeshStandardMaterial({
		map: ending1Texture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
ending1Mesh.name = 'ending1';
ending1Mesh.position.set(40, 0.005, 10)
ending1Mesh.rotation.x = -Math.PI/2;
ending1Mesh.receiveShadow = true;
scene.add(ending1Mesh);

// const ending2Mesh = new THREE.Mesh(
// 	new THREE.PlaneGeometry(5, 3),
// 	new THREE.MeshStandardMaterial({
// 		map: ending2Texture
// 		,transparent: true, opacity: 1.0, color: 'ffffff'
// 	})
// );
// ending2Mesh.name = 'ending2';
// ending2Mesh.position.set(45, 0.005, 10)
// ending2Mesh.rotation.x = -Math.PI/2;
// ending2Mesh.receiveShadow = true;
// scene.add(ending2Mesh);

const ending3Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 3),
	new THREE.MeshStandardMaterial({
		map: ending3Texture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
ending3Mesh.name = 'ending3';
ending3Mesh.position.set(45, 0.005, 10)
ending3Mesh.rotation.x = -Math.PI/2;
ending3Mesh.receiveShadow = true;
scene.add(ending3Mesh);

const ending4Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 3),
	new THREE.MeshStandardMaterial({
		map: ending4Texture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
ending4Mesh.name = 'ending4';
ending4Mesh.position.set(55, 0.005, 10)
ending4Mesh.rotation.x = -Math.PI/2;
ending4Mesh.receiveShadow = true;
scene.add(ending4Mesh);

//sadRoseBoy
const sadRoseMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 3),
	new THREE.MeshStandardMaterial({
		map: sadRoseTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
sadRoseMesh.name = 'ending1';
sadRoseMesh.position.set(50, 0.005, 10)
sadRoseMesh.rotation.x = -Math.PI/2;
sadRoseMesh.receiveShadow = true;
scene.add(sadRoseMesh);

//final Ending
const finalEndingMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(10, 6),
	new THREE.MeshStandardMaterial({
		map: finalEndingTexture
		,transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
finalEndingMesh.name = 'final';
finalEndingMesh.position.set(60, 0.005, 15)
finalEndingMesh.rotation.x = -Math.PI/2;
finalEndingMesh.receiveShadow = true;
scene.add(finalEndingMesh);





//마우스가 선택하는 곳
const pointerMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(1, 1),
	new THREE.MeshBasicMaterial({
		map :rosePointTexture,
		transparent: true, opacity: 1.0, color: 'ffffff'
	})
);
pointerMesh.rotation.x = -Math.PI/2;
pointerMesh.position.y = 0.1;
pointerMesh.receiveShadow = true;
scene.add(pointerMesh);

//b612 Mesh
const b612Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		color: 'ffffff',
		transparent: true,
		opacity: 0.0
	})
);
b612Mesh.position.set( 0, 0.005, 0);
b612Mesh.rotation.x = -Math.PI/2;
b612Mesh.receiveShadow = true;
scene.add(b612Mesh);

//bit Mesh
const bitMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		map: bitTexture
		,transparent: true, opacity: 0.9, color: '00ff0000'
	})
);
bitMesh.position.set(8, 0.005, 10);
bitMesh.rotation.x = -Math.PI/2;
bitMesh.receiveShadow = true;
scene.add(bitMesh);

//mirrorball Mesh
const mirrorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshBasicMaterial({
		map: mirrorTexture
		,transparent: true, opacity: 0.9, color: '00ff0000'
	})
);
mirrorMesh.position.set(17, 0.005, 0);
mirrorMesh.rotation.x = -Math.PI/2;
mirrorMesh.receiveShadow = true;
scene.add(mirrorMesh);

//gradation Mesh
const gradationMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		map: gradationTexture
		,transparent: true, opacity: 0.9, color: '00ff0000'
	})
);
gradationMesh.position.set(26, 0.005, 10);
gradationMesh.rotation.x = -Math.PI/2;
gradationMesh.receiveShadow = true;
scene.add(gradationMesh);


//gltf 로더
const gltfLoader = new GLTFLoader();

const b612 = new B612({
	gltfLoader,
	scene,
	modelSrc: '/models/B612_5.glb',
	x: 3,
	y: -1.0,
	z: 0,
});

const bit = new Bit({
	gltfLoader,
	scene,
	modelSrc: '/models/bit_2.glb',
	x: 8,
	y: -1.0,
	z: 7
});

const mirror = new Mirror({
	gltfLoader,
	scene,
	modelSrc: '/models/mirror9.glb',
	x: 17,
	y: -1.0,
	z: -3
});

const gradation = new Gradation({
	gltfLoader,
	scene,
	modelSrc: '/models/gradation_6.glb',
	x: 26,
	y: -1.0,
	z: 7
});

const princess = new Princess({
	scene,
	meshes,
	gltfLoader,
	modelSrc: '/models/littlePrincess_2.glb'
});

// 그리기
const clock = new THREE.Clock();

function draw() {
	const delta = clock.getDelta();

	if (princess.mixer) princess.mixer.update(delta);

	if (princess.modelMesh) {
		camera.lookAt(princess.modelMesh.position);
	}

	if (princess.modelMesh) {

		if (isPressed) {
			raycasting();
		}

		if (princess.moving) {
			// 걸어가는 상태
			angle = Math.atan2(
				destination.z - princess.modelMesh.position.z,
				destination.x - princess.modelMesh.position.x
			);
			princess.modelMesh.position.x += Math.cos(angle) * 0.1;
			princess.modelMesh.position.z += Math.sin(angle) * 0.1; // 여기서 속도 조절 가능

			camera.position.x = cameraPosition.x + princess.modelMesh.position.x;
			camera.position.z = cameraPosition.z + princess.modelMesh.position.z;
			
			princess.actions[0].stop();
			princess.actions[1].play();
			
			if (
				Math.abs(destination.x - princess.modelMesh.position.x) < 0.03 &&
				Math.abs(destination.z - princess.modelMesh.position.z) < 0.03
			) {
				princess.moving = false;
			}

			if (
				Math.abs(b612Mesh.position.x - princess.modelMesh.position.x) < 1.5 &&
				Math.abs(b612Mesh.position.z - princess.modelMesh.position.z) < 1.5
			) {
				if (!b612.visible) {
					b612.visible = true;
					gsap.to(
						b612.modelMesh.position,
						{
							duration: 1,
							y: 1,
							ease: 'Bounce.easeOut'
						}
					);
					gsap.to(
						camera.position,
						{
							duration: 1,
							y: 3
						}
					);

				}
			} else if (b612.visible) {
				b612.visible = false;
				gsap.to(
					b612.modelMesh.position,
					{
						duration: 0.5,
						y: -1.3
					}
				);
				gsap.to(
					camera.position,
					{
						duration: 1,
						y: 5
					}
				);
			}

			//

			if (
				Math.abs(bitMesh.position.x - princess.modelMesh.position.x) < 1.5 &&
				Math.abs(bitMesh.position.z - princess.modelMesh.position.z) < 1.5
			) {

				window.location.href = "http://127.0.0.1:5500/src/bitwise/tunnel_bit.html";
				if (!bit.visible) {
					bit.visible = true;
					gsap.to(
						bit.modelMesh.position,
						{
							duration: 1,
							y: 1,
							ease: 'Bounce.easeOut'
						}
					);
					gsap.to(
						camera.position,
						{
							duration: 1,
							y: 3
						}
					);
				}
			} else if (bit.visible) {
				bit.visible = false;
				gsap.to(
					bit.modelMesh.position,
					{
						duration: 0.5,
						y: -1.3
					}
				);
				gsap.to(
					camera.position,
					{
						duration: 1,
						y: 5
					}
				);
			}

			//

			if (
				Math.abs(mirrorMesh.position.x - princess.modelMesh.position.x) < 1.5 &&
				Math.abs(mirrorMesh.position.z - princess.modelMesh.position.z) < 1.5
			) {
				window.location.href = "http://127.0.0.1:5500/src/mirrorballGame/tunnel_keyboard.html"
				if (!mirror.visible) {
					mirror.visible = true;
					gsap.to(
						mirror.modelMesh.position,
						{
							duration: 1,
							y: 1,
							ease: 'Bounce.easeOut'
						}
					);
					gsap.to(
						camera.position,
						{
							duration: 1,
							y: 3
						}
					);
				}
			} else if (mirror.visible) {
				mirror.visible = false;
				gsap.to(
					mirror.modelMesh.position,
					{
						duration: 0.5,
						y: -1.3
					}
				);
				gsap.to(
					camera.position,
					{
						duration: 1,
						y: 5
					}
				);
			}

			//

			if (
				Math.abs(gradationMesh.position.x - princess.modelMesh.position.x) < 1.5 &&
				Math.abs(gradationMesh.position.z - princess.modelMesh.position.z) < 1.5
			) {

				window.location.href = 'http://127.0.0.1:5500/src/rgbGame/tunnel_rgb.html'
				if (!gradation.visible) {
					gradation.visible = true;
					gsap.to(
						gradation.modelMesh.position,
						{
							duration: 1,
							y: 1,
							ease: 'Bounce.easeOut'
						}
					);
					gsap.to(
						camera.position,
						{
							duration: 1,
							y: 3
						}
					);
				}
			} else if (gradation.visible) {
				gradation.visible = false;
				gsap.to(
					gradation.modelMesh.position,
					{
						duration: 0.5,
						y: -1.3
					}
				);
				gsap.to(
					camera.position,
					{
						duration: 1,
						y: 5
					}
				);
			}

			if (
				Math.abs(finalEndingMesh.position.x - princess.modelMesh.position.x) < 1.5 &&
				Math.abs(finalEndingMesh.position.z - princess.modelMesh.position.z) < 1.5
			){
				window.location.href = 'http://127.0.0.1:5500/src/tunnel_final.html';
			}



			//


		} else {
			// 서 있는 상태
			princess.actions[1].stop();
			princess.actions[0].play();
		}
	}

	renderer.render(scene, camera);
	renderer.setAnimationLoop(draw);
}

function checkIntersects() {
	// raycaster.setFromCamera(mouse, camera);

	const intersects = raycaster.intersectObjects(meshes);
	for (const item of intersects) {
		if (item.object.name === 'floor') {
			destination.x = item.point.x;
			destination.y = 0.3;
			destination.z = item.point.z;
			princess.modelMesh.lookAt(destination);

			// console.log(item.point)

			princess.moving = true;

			pointerMesh.position.x = destination.x;
			pointerMesh.position.z = destination.z;
		}
		break;
	}
}

// 마우스 좌표를 three.js에 맞게 변환
function calculateMousePosition(e) {
	mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
	mouse.y = -(e.clientY / canvas.clientHeight * 2 - 1);
}

// 변환된 마우스 좌표를 이용해 래이캐스팅
function raycasting() {
	raycaster.setFromCamera(mouse, camera);
	checkIntersects();
}

//EventListener
canvas.addEventListener('mousedown', e => {
	isPressed = true;
	calculateMousePosition(e);
});
canvas.addEventListener('mouseup', () => {
	isPressed = false;
});
canvas.addEventListener('mousemove', e => {
	if (isPressed) {
		calculateMousePosition(e);
	}
});

canvas.addEventListener('touchstart', e => {
	isPressed = true;
	calculateMousePosition(e.touches[0]);
});
canvas.addEventListener('touchend', () => {
	isPressed = false;
});
canvas.addEventListener('touchmove', e => {
	if (isPressed) {
		calculateMousePosition(e.touches[0]);
	}
});

draw();