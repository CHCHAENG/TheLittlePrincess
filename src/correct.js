/*--------------------
Renderer
--------------------*/
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);

  
  
  /*--------------------
                                                           Camera & Scene
                                                           --------------------*/
  const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  const scene = new THREE.Scene();
  
  
  /*--------------------
                                   Controls
                                   --------------------*/
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.5;
  
  
  /*--------------------
                                Light
                                --------------------*/
  const ambientLight = new THREE.AmbientLight(0xffffff, .5);
  scene.add(ambientLight);
  
  const light = new THREE.PointLight(0xffffff, .5);
  light.position.set(1, 1, 1);
  scene.add(light);
  
  
  let font = null;
  const fontPath = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/optimer_regular.typeface.json';
  
  
  /*--------------------
                                                                                                                            Init
                                                                                                                            --------------------*/
  let geo;
  let mat;
  let mesh;
  const init = () => {
    console.log('init');
    geo = new THREE.TextGeometry('Correct!', {
      font: font,
      size: 1,
      height: 0.3,
      curveSegments: 100,
      bevelThickness: 0.1,
      bevelSize: 0.04,
      bevelEnabled: 0.1 });
  
  
    geo.verticesNeedUpdate = true;
  
  
    const vertex = `
    precision highp float;
    varying vec2 vUv;
    varying vec3 vPos;
    varying vec3 vNormal;
    uniform float uTime;
  
    void main() {
      vec3 pos = position;
      vUv = uv;
      vPos = pos;
  
      pos.z += sin((pos.x + uTime * 0.3) * 2.) * 0.3;
  
      vNormal = normal;
      vNormal *= pos;
  
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
      gl_Position = projectionMatrix * mvPosition;
    }
    `;
    const fragment = `
    precision highp float;
    varying vec2 vUv;
    varying vec3 vPos;
    varying vec3 vNormal;
  
    void main() {
    vec2 uv = vUv - .5;
  
    vec3 normal = vNormal;
    vec3 light = vec3(-100., 30., 4.);
    float intensity = .5;
    light = normalize(light) * intensity;
    float dProd = max(0.0, dot(normal, light));
    dProd = smoothstep(1.3, 2., dProd);
  
    vec3 pos = vPos;
    pos.x += 1.;
    pos *= 0.8;
    vec3 col = pos + dProd;
    col.g += pos.z;
  
    gl_FragColor = vec4(col, 1.);
    }
    `;
  
    mat = new THREE.ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: {
        uTime: { value: 0 } } });
  
  
    mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = -1.5;
    mesh.rotation.x = Math.PI * 0.11;
    mesh.rotation.y = -Math.PI * 0.13;
    scene.add(mesh);
  };
  
  
  /*--------------------
     Load Font
     --------------------*/
  const loader = new THREE.FontLoader();
  const loadFont = () => {
    loader.load(fontPath, response => {
      font = response;
      init();
    });
  };
  loadFont();
  
  
  /*--------------------
              Renderer
              --------------------*/
  let time = 0;
  const render = () => {
    time += 0.05;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if (mat) {
      mat.uniforms.uTime.value = time;
    }
    controls.update();
  };
  render();
  
  
  /*--------------------
            Resize
            --------------------*/
  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', resize);