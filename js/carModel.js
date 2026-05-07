
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export function loadCarModel(scene) {
    const loader = new GLTFLoader();
    
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/gltf/');
    
    loader.setDRACOLoader(dracoLoader);

    const carUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/models/gltf/ferrari.glb';

    loader.load(
        carUrl,
        function (gltf) {
            const car = gltf.scene;
            
            car.scale.set(0.5, 0.5, 0.5); 
            car.position.set(0, 0, 0); 
            car.rotation.y = Math.PI;

            car.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(car);
            console.log("TV4: Đã load và giải nén siêu xe Ferrari thành công!");
        },
        function (xhr) {
            console.log('Đang tải xe: ' + Math.round((xhr.loaded / xhr.total) * 100) + '%');
        },
        function (error) {
            console.error("TV4: Lỗi load xe rồi!", error);
        }
    );
}