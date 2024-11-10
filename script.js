let angle = 0;
let rotationSpeed = 1; // 最初の速度
let imgElement = null;
let rotationInterval;

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imageContainer').innerHTML = `<img src="${e.target.result}" id="image">`;
            imgElement = document.getElementById('image');
            clearInterval(rotationInterval);
            startRotation();
        };
        reader.readAsDataURL(file);
    }
});

// 左回転
function rotateLeft() {
    rotationSpeed = -Math.abs(rotationSpeed) || -1;
    updateSpeedDisplay();
}

// 右回転
function rotateRight() {
    rotationSpeed = Math.abs(rotationSpeed) || 1;
    updateSpeedDisplay();
}

// 速度増加
function increaseSpeed() {
    rotationSpeed += rotationSpeed > 0 ? 1 : -1;
    updateSpeedDisplay();
}

// 速度低下
function decreaseSpeed() {
    if (rotationSpeed > 1 || rotationSpeed < -1) {
        rotationSpeed += rotationSpeed > 0 ? -1 : 1;
    } else {
        rotationSpeed = 0;
    }
    updateSpeedDisplay();
}

// 速度表示
function updateSpeedDisplay() {
    document.getElementById('speed').innerText = rotationSpeed;
}

function startRotation() {
    rotationInterval = setInterval(() => {
        if (imgElement && rotationSpeed !== 0) {
            angle += rotationSpeed;
            imgElement.style.transform = `rotate(${angle}deg)`;
        }
    }, 20);
}

updateSpeedDisplay();