//Scene
const scene = new THREE.Scene();

const geomentry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });

//Mesh (Object)
const mesh = new THREE.Mesh(geomentry, material);
mesh.position.x = 1; // place/position the object 1 units from origin in x-axis
mesh.position.y = 2; // place/position the object 2 units from origin in y-axis
mesh.position.z = 1; // place/position the object 1 units from origin in z-axis
mesh.scale.x = 2; // strech the object 2 units on x-axis
mesh.rotation.x = Math.PI * 0.25; // rotate the object on x-axis
mesh.rotation.y = Math.PI * 1.25; // rotate the object on y-axis

scene.add(mesh);

const axes = new THREE.AxesHelper(10); // it will show the x,y,z axis on the canvas
scene.add(axes); //adding the axes to canvas

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); // default near value is 1,and far value is 2000
camera.position.z = 5;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw"); //select the canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); //add the WebGLRenderer
renderer.setSize(aspect.width, aspect.height); //Renderer size
renderer.render(scene, camera);
