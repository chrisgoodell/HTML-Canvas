
const canvas = document.querySelector('#draw'); //select the canvas
const context = canvas.getContext('2d'); //define canvas context

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = '#BADA55';
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 50;
// context.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

//click and drag function
function draw(event) {
    if (!isDrawing) {
        return;
    }
    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    // context.lineWidth = hue;
    context.beginPath();    //separates draw to canvas into a path rather than a continuous object
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    lastX = event.offsetX;
    lastY = event.offsetY;
    hue++;  //if hue goes over 360 it calculates total % 360
    if (hue >= 360) {
        hue = 0;
    }
    if (context.lineWidth >= 100 || context.lineWidth <= 5) {
        direction = !direction;
    }
    if (direction) {
        context.lineWidth++;
    } else {
        context.lineWidth--;
    }
};

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
