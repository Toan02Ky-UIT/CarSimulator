import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import các module của team
import { createShapes } from './geometry.js';
import { setupEnvironment } from './environment.js';
import { loadCarModel } from './carModel.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 8); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


setupEnvironment(scene);

const myShapes = createShapes();
scene.add(myShapes);

loadCarModel(scene);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

import { handleTransformations, setSelectedObject } from './geometry.js';

window.addEventListener('keydown', (event) => {
    handleTransformations(event.key);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true); 

    if (intersects.length > 0) {
        let target = intersects[0].object;
        
        if (target.geometry.type === 'PlaneGeometry') return;

        while (target.parent && target.parent !== scene) {
            target = target.parent;
        }

        setSelectedObject(target);
    } else {
        setSelectedObject(null);
    }
});
