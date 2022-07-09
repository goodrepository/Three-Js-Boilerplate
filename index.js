// import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
// ********* SETTING UP A SCENE ********* \\    
// Any time we make a Three.js setup, we have to include 3 things
// 1) a scene (movie location)
// 2) a camera (shooting our movie)
// 3) a renderer (show it in movie theater)

const scene = new THREE.Scene();

// The are 4 default cameras and Perspective Camera is one of them and it mimics the human eye. 
// PerspectiveCamera takes 4 arguments 
//   1) Field of View (how wide the perspective will be)
//   2) Aspect Ratio ( width/height will be good in most cases and not squish the scene)
//   3) Near Clipping Pane (elements closer than this value will not render)
//   4) Far Clipping Pane (elements further than this value will not render). Too high of a value might cause performance issues 1000 is fine
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Antialias smooths edges, a cosmetic property
const renderer = new THREE.WebGLRenderer({antialias: true,  canvas: document.querySelector('#bg'),});

//set up values for renderer and append it to the document
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ********* CREATING OBJECTS ********* \\  
// Every object has three core elements that we want to render
//   1) Geometry - Shape of an object; made of vertices; Three has pre-made geometries
//   2) Material - Color and how light interacts with our object
//   3) Mesh - Combination of Geometry and material
// For a cube:
// Box Geometry takes 3 values (width, height, depth)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// material when we didnt have lighting
// const material = new THREE.MeshBasicMaterial({color: "#ff0051" });
// material when we have lighting
const material = new THREE.MeshStandardMaterial({color: 0xff0051});
const cube = new THREE.Mesh(geometry, material);

// ******** ADDING ANOTHER OBJECT INTO THE SCENE ********* \\
const geometry2 = new THREE.BoxGeometry(3, 3, -3);
const material2 = new THREE.MeshBasicMaterial({
    color: "#dadada",
    wireframe: true,
    transparent: true
})

const wireframeCube = new THREE.Mesh(geometry2, material2);
scene.add(wireframeCube);

// zooming the canera out a bit
camera.position.z = 5;
// By default the cude will be added to the (0, 0, 0) position
scene.add(cube);
// In order to see anything we have to call the render function and pass the scene and camera
renderer.render(scene, camera);

// ********* LIGHTING ********* \\
// Ambient Lighting is one of the most basic forms of lighting in Three.js
// It has no direction so it will not create a shadow. It is omnipresent and applies to everything equally
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// add light to the scene
scene.add(ambientLight);

//A Point light is like a ligth bulb; It does cast shadow equally in all directions
const pointLight = new THREE.PointLight(0xffffff, 3);
// set at x, y, z position
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

// ********* ANIMATING OBJECTS ********* \\
const animate = () => {
    // `requestAnimationFrame` will be called 60 times/second (60 FPS)
    requestAnimationFrame(animate);
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    wireframeCube.rotation.x -= 0.01;
    wireframeCube.rotation.y -= 0.01;
    // call the render to rerender the canvas
    renderer.render(scene, camera);
}

animate();

const _onWindowResize = () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener( 'resize', _onWindowResize, false );