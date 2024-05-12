let scene, camera, renderer, currentModel;
const modelPaths = {
    male: 'models/sculpt_male.gltf',
    female: 'models/sculpt_female.gltf'
};
let currentGender = 'male'; // Start with the male model

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model-container').appendChild(renderer.domElement);

    loadModel(currentGender);
    animate();
}

function loadModel(gender) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPaths[gender], function(gltf) {
        if (currentModel) {
            scene.remove(currentModel); // Remove the current model if it exists
        }
        currentModel = gltf.scene;
        scene.add(currentModel);
    }, undefined, function(error) {
        console.error('An error happened:', error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.getElementById('toggleModel').addEventListener('click', function() {
    currentGender = (currentGender === 'male') ? 'female' : 'male';
    loadModel(currentGender);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
