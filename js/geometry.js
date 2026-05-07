import * as THREE from 'three';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

export function createShapes() {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0x44aa88, roughness: 0.5 });

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const box = new THREE.Mesh(boxGeo, material);
    box.position.set(-3, 0.5, -3);
    group.add(box);

    const sphereGeo = new THREE.SphereGeometry(0.6, 32, 16);
    const sphere = new THREE.Mesh(sphereGeo, material);
    sphere.position.set(-1, 0.6, -3);
    group.add(sphere);

    const coneGeo = new THREE.ConeGeometry(0.6, 1.5, 32);
    const cone = new THREE.Mesh(coneGeo, material);
    cone.position.set(1, 0.75, -3);
    group.add(cone);

    const cylinderGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
    const cylinder = new THREE.Mesh(cylinderGeo, material);
    cylinder.position.set(3, 0.75, -3);
    group.add(cylinder);

    const torusGeo = new THREE.TorusGeometry(0.4, 0.15, 16, 100);
    const torus = new THREE.Mesh(torusGeo, material);
    torus.position.set(-3, 0.55, -1);
    group.add(torus);

    const teapotGeo = new TeapotGeometry(0.5);
    const teapot = new THREE.Mesh(teapotGeo, material);
    teapot.position.set(3, 0.5, -1);
    group.add(teapot);

    return group;
}