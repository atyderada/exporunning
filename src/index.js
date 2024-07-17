const sectors = [
  { color: '#097BCA', label: 'After Race' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#EB0D29', label: 'Toalla Gatorade' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#097BCA', label: '10% Running Team' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#EB0D29', label: 'Clase Mobility' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
  { color: '#FF651D', label: 'Disfruta la Carrera!' },
];

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const spinEl = document.querySelector('#spin');
const ctx = document.querySelector('#wheel').getContext('2d');
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.995; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();
  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();
  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px helvetica';
  ctx.fillText(sector.label, rad - 10, 10);
  //
  ctx.restore();
}

function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  spinEl.style.background = sector.color;
}

function frame() {
  if (!angVel) return;
  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0; // Bring to stop
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function init() {
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  // const img = $('<img />');
  // // 2. update its "src" attribute to set the image location:
  // img.attr('src', '/images/abc.jpg');
  // // 3. add the element to the div element where id="container":
  // spinEl.append(img);
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.45);
  });
}

init();
