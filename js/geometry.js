import * as THREE from 'three';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

let selectedObject = null; 

export function createShapes() {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0x44aa88, roughness: 0.5 });

    const geometries = [
        { geo: new THREE.BoxGeometry(1, 1, 1), pos: [-3, 0.5, -3], name: 'Box' },
        { geo: new THREE.SphereGeometry(0.6, 32, 16), pos: [-1, 0.6, -3], name: 'Sphere' },
        { geo: new THREE.ConeGeometry(0.6, 1.5, 32), pos: [1, 0.75, -3], name: 'Cone' },
        { geo: new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), pos: [3, 0.75, -3], name: 'Cylinder' },
        { geo: new THREE.TorusGeometry(0.4, 0.15, 16, 100), pos: [-3, 0.55, -1], name: 'Wheel' },
        { geo: new TeapotGeometry(0.5), pos: [3, 0.5, -1], name: 'Teapot' }
    ];

    geometries.forEach(data => {
        const mesh = new THREE.Mesh(data.geo, material.clone());
        mesh.position.set(...data.pos);
        mesh.name = data.name;
        group.add(mesh);
    });

    return group;
}


export function setSelectedObject(obj) {
    if (selectedObject) {
        selectedObject.traverse((child) => {
            if (child.isMesh && child.material && child.material.emissive) {
                child.material.emissive.setHex(0x000000); 
            }
        });
    }

    selectedObject = obj;

    if (selectedObject) {
        selectedObject.traverse((child) => {
            if (child.isMesh && child.material && child.material.emissive) {
                child.material.emissive.setHex(0x444444); 
            }
        });
        console.log("Đang chọn:", selectedObject.name || "Group/Model");
    } else {
        console.log("Đã bỏ chọn");
    }
}


export function handleTransformations(key) {
    if (!selectedObject) return;

    const step = 0.1;
    const rotationStep = Math.PI / 18;

    switch (key) {
        case 'ArrowUp': selectedObject.position.y += step; break;
        case 'ArrowDown': selectedObject.position.y -= step; break;
        case 'ArrowLeft': selectedObject.position.x -= step; break;
        case 'ArrowRight': selectedObject.position.x += step; break;

        case 'w': selectedObject.position.z += step; break; 
        case 's': selectedObject.position.z -= step; break; 

        case 'r': selectedObject.rotation.x += rotationStep; break;
        case 'e': selectedObject.rotation.y += rotationStep; break;
        case 'q': selectedObject.rotation.z += rotationStep; break;

        case '+': selectedObject.scale.multiplyScalar(1.1); break;
        case '-': selectedObject.scale.multiplyScalar(0.9); break;
    }
}
