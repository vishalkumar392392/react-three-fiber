import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//Lights
const ambientLights = new THREE.AmbientLight(0xffffff, 0.5);
const pointLights = new THREE.PointLight(0xffffff, 0.5);
pointLights.position.set(2, 2, 2);
scene.add(ambientLights, pointLights);

//texture loader
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("/texture/color.jpg");
const matTexture = textureLoader.load("/texture/mat2.png");
const bumpTexture = textureLoader.load("/texture/bump.jpg");

//cube texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envTexture = cubeTextureLoader.load([
  "/texture/env/px.png",
  "/texture/env/nx.png",
  "/texture/env/py.png",
  "/texture/env/ny.png",
  "/texture/env/pz.png",
  "/texture/env/nz.png",
]);
scene.background = envTexture;

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.SphereBufferGeometry(0.5, 32, 32);
// const geometry = new THREE.TorusBufferGeometry(0.3, 0.2, 32, 32);
// const material = new THREE.MeshBasicMaterial({
//   map: colorTexture,
// });
const material = new THREE.MeshStandardMaterial();
// material.map = colorTexture;
// material.bumpMap = bumpTexture;
// const matMaterial = new THREE.MeshMatcapMaterial({
//   matcap: matTexture,
// });
// material.color = new THREE.Color("red");
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
material.side = THREE.DoubleSide;
material.roughness = 0.1;
material.metalness = 0.9;
material.envMap = envTexture;
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.x += 0.1;
  // mesh.rotation.y += 0.1;
  // mesh.rotation.z += 0.1;

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
