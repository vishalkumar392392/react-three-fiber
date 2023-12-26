//Scene
const scene = new THREE.Scene();

const geomentry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });

//Mesh (Object)
const mesh = new THREE.Mesh(geomentry, material);

scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); // default near value is 1,and far value is 2000
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw"); //select the canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); //add the WebGLRenderer
renderer.setSize(aspect.width, aspect.height); //Renderer size

//Clock
const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  //   mesh.rotation.x +=0.01 // movement of the cube is related to fps, which varies per device.
  mesh.rotation.x = elapsedTime; // the movemnet of the cube is related to no.of seconds
  // on with fps
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();
