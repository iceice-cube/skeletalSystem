// --- BONE GROUP & MODEL CONTAINER MAPS ---
var groups = [
  document.getElementById("skull-group"),
  document.getElementById("ribcage-group"),
  document.getElementById("pelvic-group"),
  document.getElementById("feet-group"),
  document.getElementById("hand-group"),
  document.getElementById("leg-group"),
  document.getElementById("arm-group"),
  document.getElementById("spinal-group"),
  document.getElementById('clavicle')
];

var model = [
  document.getElementById("skull"),
  document.getElementById("ribcage"),
  document.getElementById("column"),
  document.getElementById("pelvis"),
  document.getElementById("clavicle"),
  document.getElementById("legs"),
  document.getElementById("arm"),
  document.getElementById("feet"),
  document.getElementById("hand")
];

var currentGroup = -1;
var currentBreadCrumb = '';

const appendicularBtn = document.getElementById('appendicular');
const axialBtn = document.getElementById('axial');
const breadcrumb = document.getElementById("breadcrumb");

function updateButtonStates() {
  const isAppendicularSelected = appendicularBtn.classList.contains('selected');
  const isAxialSelected = axialBtn.classList.contains('selected');

  axialBtn.classList.toggle('disabled', isAppendicularSelected);
  appendicularBtn.classList.toggle('disabled', isAxialSelected);
}

function updateModelVisibility() {
  const isAxialActive = axialBtn.classList.contains('selected');
  const isAppendicularActive = appendicularBtn.classList.contains('selected');

  const showAll = !isAxialActive && !isAppendicularActive;
  model.forEach((part, index) => {
    if (!part) return;

    const isAxialPart = index < 3;
    const isAppendicularPart = index >= 3;

    const shouldShow =
      showAll ||
      (isAxialPart && isAxialActive) ||
      (isAppendicularPart && isAppendicularActive);

    part.classList.toggle('hidden', !shouldShow);
  });
  updateButtonStates();
}

let typingTimeout = null;

function updateText(title, tags, description){
  const titleEl = document.getElementById('title');
  const tagsEl = document.getElementById('tags');
  const bodyEl = document.getElementById('body-content');

  titleEl.textContent = title;
  tagsEl.textContent = tags;

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  bodyEl.textContent = '';
  let index = 0;

  function typeChar() {
    if (index < description.length) {
      bodyEl.textContent += description.charAt(index);
      index++;
      typingTimeout = setTimeout(typeChar, 7);
    }
  }

  typeChar();
}

function deselectButtons(exceptBtn = null) {
  const selectedButtons = document.querySelectorAll('.circle-btn.selected');

  selectedButtons.forEach((btn) => {
    if (btn !== exceptBtn) {
      btn.classList.remove('selected');
    }
  });
}

function updateBreadCrumb(layer, itemName = ''){
  if (layer === 1) {
    currentBreadCrumb = itemName;
    if (breadcrumb) breadcrumb.textContent = `SKELETAL SYSTEM > ${currentBreadCrumb}`;
  } 
  else if (layer === 2) {
    if (breadcrumb) breadcrumb.textContent = `SKELETAL SYSTEM > ${currentBreadCrumb} > ${itemName}`;
  }
}

function handlePartClick(partId, currentGroup, groups) {
  if (currentGroup >= 0 && groups[currentGroup]) {
    groups[currentGroup].classList.add('hidden');
  }

  deselectButtons();

  switch (partId) {
    case 'arm':
      currentGroup = 6; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'UPPER EXTREMITY');
      updateText("Upper Extremity", "Appendicular", "Allows in grasping, manipulating objects, and fine motor control. Extends from the clavicle to the fingers, including the shoulder girdle, and the upper limb.");
      break;

    case 'column':
      currentGroup = 7; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'SPINAL COLUMN');
      updateText("SPINAL Column", "Axial | Irregular", "Vertebral column, in vertebrate animals, the flexible column extending from neck to tail, made of a series of bones, the vertebrae. The major function of the vertebral column is protection of the spinal cord; it also provides stiffening for the body and attachment for the pectoral and pelvic girdles and many muscles. In humans an additional function is to transmit body weight in walking and standing.");
      break;

    case 'clavicle':
      currentGroup = 8; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'CLAVICLE');
      updateText("Clavicle", "Appendicular | Long", "The clavicle, collarbone, or keybone is a slender, S-shaped long bone approximately 15 centimetres (6 in) long that serves as a strut between the shoulder blade and the sternum (breastbone). There are two clavicles, one on each side of the body. The clavicle is the only long bone in the body that lies horizontally. Together with the shoulder blade, it makes up the shoulder girdle.");
      break;  

    case 'feet':
      currentGroup = 3; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'FOOT');
      updateText("Feet", "Appendicular", "Provides weight-bearing support, balance, and locomotion during standing, walking, and running.");
      break;

    case 'hand':
      currentGroup = 4; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'HAND');
      updateText("Hand", "Appendicular", "Composed of carpals, metacarpals, and phalanges, structured for high dexterity, gripping, and precise tactile interaction.");
      break;

    case 'legs':
      currentGroup = 5; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'LOWER EXTREMITIES');
      updateText("Lower Extremity", "Appendicular", "Designed for weight-bearing, stability, and locomotion. Extends from pelvic girdle to the toes.");
      break;

    case 'pelvis':
      currentGroup = 2; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'PELVIS');
      updateText("Pelvis", "Appendicular", "The bony structure inside the hips, buttocks and pubic region. It is the seat that holds up the upper body when sitting, standing or walking. The hole in the middle of the pelvis serves as the birth canal during vaginal delivery. The pelvic anatomy can shift to accommodate childbirth.");
      break;

    case 'ribcage':
      currentGroup = 1; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'RIBCAGE');
      updateText("Ribcage", "Axial", "Basketlike skeletal structure that forms the chest, or thorax, and is made up of the ribs and their corresponding attachments to the sternum (breastbone) and the vertebral column. The rib cage surrounds the lungs and the heart, serving as an important means of bony protection for these vital organs.");
      break;

    case 'skull':
      currentGroup = 0; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'SKULL');
      updateText("Skull", "Axial", "The skeletal framework of the head of vertebrates, composed of bones or cartilage, which form a unit that protects the brain and some sense organs.");
      break;

    default:
      console.warn(`Unrecognized part clicked: ${partId}`);
      break;
  }

  return currentGroup;
}

function handleBoneButtonClick(buttonId) {
  switch (buttonId) {
    // --- SKULL GROUP ---
    case 'skull-1':
      updateText("Jaw bone", "Axial | Irregular", `Either of a pair of bones that form the framework of the mouth of vertebrate animals, usually containing teeth and including a movable lower jaw (mandible) and fixed upper jaw (maxilla).`);
      updateBreadCrumb(2, 'JAW BONE');
      break;
    case 'skull-2':
      updateText("Cranium", "Axial | Flat", `The cranium is the part of the skull that encloses the brain. Key bones forming the cranium include the occipital bone at the base, the parietal and temporal bones on the sides and top, and the frontal bone forming the forehead.`);
      updateBreadCrumb(2, 'CRANIUM');
      break;
    case 'skull-3':
      updateText("Nasal Bone", "Axial | Flat", `The nasal bone is a median process that projects downward from the frontal bone and articulates with the two nasal bones.`);
      updateBreadCrumb(2, "NASAL BONE");
      break;
    case 'skull-4':
      updateText("Temporal Bone", "Axial | Irregular", `The temporal bone is a compound bone located on the side of the skull in mammals, including humans. It plays a crucial role in the structure of the human ear.`);
      updateBreadCrumb(2, "TEMPORAL BONE");
      break;
    case 'skull-5':
      updateText("Maxilla", "Axial | Irregular", `The maxillae are the bones that form the upper jaws in vertebrates. They constitute the majority of the facial skeleton and extend beyond just supporting the upper teeth.`);
      updateBreadCrumb(2, "MAXILLA");
      break;
    case 'skull-6':
      updateText("Mandible", "Axial | Irregular", `The mandible, located inferiorly in the facial skeleton, is the largest and strongest bone of the face. It forms the lower jaw and acts as a receptacle for the lower teeth.`);
      updateBreadCrumb(2, "MANDIBLE");
      break;

    // --- RIBCAGE GROUP ---
    case 'ribcage-1':
      updateText("Rib", "Axial | Flat", `Any of several pairs of narrow, curved strips of bone attached dorsally to the vertebrae and to the breastbone ventrally, to form the rib cage.`);
      updateBreadCrumb(2, "RIB");
      break;
    case 'ribcage-2':
      updateText("Sternum", "Axial | Flat", `An elongated bone in the centre of the chest that articulates with and provides support for the clavicles and for the ribs.`);
      updateBreadCrumb(2, 'STERNUM');
      break;
    case 'ribcage-3':
      updateText("Costal Cartilage", "Axial", `Costal cartilages are pliable hyaline cartilages that connect the first seven ribs to the sternum, forming true ribs.`);
      updateBreadCrumb(2, 'COSTAL CARTILAGE');
      break;

    // --- PELVIC GROUP ---
    case 'pelvic-1':
      updateText("Ilium", "Appendicular | Flat", `The ilium is the largest, uppermost, and dorsal bone of the pelvis. It forms the hip joint where it articulates with the femur.`);
      updateBreadCrumb(2, "ILIUM");
      break;
    case 'pelvic-2':
      updateText("Sacrum", "Axial | Irregular", `The Sacrum is a shield-shaped bony structure at the base of the lumbar vertebrae connected to the pelvis, forming the posterior pelvic wall.`);
      updateBreadCrumb(2, "SACRUM");
      break;
    case 'pelvic-3':
      updateText("Coccyx", "Axial | Irregular", `Coccyx, curved, semiflexible lower end of the backbone in apes and humans, representing a vestigial tail.`);
      updateBreadCrumb(2, "COCCYX");
      break;
    case 'pelvic-4':
      updateText("Pubis", "Appendicular | Irregular", `The pubis or pubic bone forms the lower and anterior part of each side of the hip bone.`);
      updateBreadCrumb(2, "PUBIS");
      break;

    // --- FEET GROUP ---
    case 'feet-1':
      updateText("Tarsals", "Appendicular | Short", `The short, angular bones that in humans make up the ankle. They form a longitudinal arch in the foot for transferring weight.`);
      updateBreadCrumb(2, "TARSALS");
      break;
    case 'feet-2':
      updateText("Metatarsals", "Appendicular | Long", `Five tubular bones between the ankle (tarsal) bones and each of the hindlimb digits.`);
      updateBreadCrumb(2, "METATARSALS");
      break;
    case 'feet-3':
      updateText("Phalanges", "Appendicular | Long", `The phalanges are long, slender bones that form the framework of toes and fingers.`);
      updateBreadCrumb(2, "PHALANGES");
      break;

    // --- HAND GROUP ---
    case 'hand-1':
      updateText("Phalanges", "Appendicular | Long", `The group of small long bones that comprise the digits (fingers) of the hand.`);
      updateBreadCrumb(2, "PHALANGES");
      break;
    case 'hand-2':
      updateText("Metacarpal", "Appendicular | Long", `Bones that form the intermediate part of the hand between the phalanges (fingers) and the carpal bones (wrist).`);
      updateBreadCrumb(2, "METACARPAL");
      break;
    case 'hand-3':
      updateText("Carpal", "Appendicular | Short", `Eight small bones that make up the wrist connecting the hand to the forearm.`);
      updateBreadCrumb(2, "CARPAL");
      break;

    // --- LEG GROUP ---
    case 'leg-1':
      updateText("Femur", "Appendicular | Long", `The thigh bone is the largest and thickest bone in the human body, connecting pelvis to knee.`);
      updateBreadCrumb(2, "FEMUR");
      break;
    case 'leg-2':
      updateText("Patella", "Appendicular | Sesamoid", `The patella (kneecap) is a flat, triangular sesamoid bone that covers and protects the anterior surface of the knee joint.`);
      updateBreadCrumb(2, "PATELLA");
      break;
    case 'leg-3':
      updateText("Fibula", "Appendicular | Long", `The calf bone located on the lateral side of the tibia, serving as a slender structural attachment.`);
      updateBreadCrumb(2, "FIBULA");
      break;
    case 'leg-4':
      updateText("Tibia", "Appendicular | Long", `The shinbone is the larger and stronger medial bone of the lower leg, supporting the majority of body weight.`);
      updateBreadCrumb(2, "TIBIA");
      break;

    // --- ARM GROUP ---
    case 'arm-1':
      updateText("Humerus", "Appendicular | Long", `The single long bone of the upper arm, extending from the shoulder girdle to the elbow.`);
      updateBreadCrumb(2, "HUMERUS");
      break;
    case 'arm-2':
      updateText("Scapula", "Appendicular | Flat", `The shoulder blade that connects the humerus with the clavicle.`);
      updateBreadCrumb(2, "SCAPULA");
      break;
    case 'arm-3':
      updateText("Radius", "Appendicular | Long", `The outer, shorter bone of the forearm on the side of the thumb.`);
      updateBreadCrumb(2, "RADIUS");
      break;
    case 'arm-4':
      updateText("Ulna", "Appendicular | Long", `The longer, inner bone of the forearm on the side of the little finger.`);
      updateBreadCrumb(2, "ULNA");
      break;

    // --- SPINAL GROUP ---
    case 'spinal-1':
      updateText("Cervical Vertebrae", "Axial | Irregular", `The seven vertebrae located in the neck, supporting head rotation and protecting the upper spinal cord.`);
      updateBreadCrumb(2, "CERVICAL VERTEBRAE");
      break;
    case 'spinal-2':
      updateText("Thoracic Vertebrae", "Axial | Irregular", `The 12 vertebrae of the chest region that articulate with the ribs.`);
      updateBreadCrumb(2, "THORACIC VERTEBRAE");
      break;
    case 'spinal-3':
      updateText("Lumbar Vertebrae", "Axial | Irregular", `The five large vertebrae forming the lower back between the thoracic cage and pelvis.`);
      updateBreadCrumb(2, "LUMBAR VERTEBRAE");
      break;
    case 'spinal-4':
      updateText("Sacrum", "Axial | Irregular", `Shield-shaped fused structure stabilizing the posterior pelvic girdle.`);
      updateBreadCrumb(2, "SACRUM");
      break;
    case 'spinal-5':
      updateText("Coccyx", "Axial | Irregular", `Tailbone formed by 3 to 5 fused coccygeal vertebrae.`);
      updateBreadCrumb(2, "COCCYX");
      break;

    default:
      console.warn(`Unrecognized button ID: ${buttonId}`);
      break;
  }
}

window.goToPage = function(page) {
  window.location.href = `${page}`;
};

if (appendicularBtn) {
  appendicularBtn.addEventListener('click', () => {
    appendicularBtn.classList.toggle('selected');
    updateModelVisibility();
  });
}

if (axialBtn) {
  axialBtn.addEventListener('click', () => {
    axialBtn.classList.toggle('selected');
    updateModelVisibility();
  });
}

const bones = document.querySelectorAll('.circle-btn');
bones.forEach((bone) => {
  bone.addEventListener('click', (event) => {
    const clickedBtn = event.target.closest('.circle-btn');
    if (!clickedBtn) return;

    const currentlySelected = document.querySelector('.circle-btn.selected');

    if (currentlySelected && currentlySelected !== clickedBtn) {
      currentlySelected.classList.remove('selected');
    }

    clickedBtn.classList.toggle('selected');
    const clickedPartId = event.target.id;
    handleBoneButtonClick(clickedPartId);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Use relative asset string path instead of ES module import
  const hoverSound = new Audio('./src/assets/sound/hover-effect.wav'); 
  hoverSound.volume = 0.5;

  const parts = document.querySelectorAll('.model-part');

  if (parts.length === 0) {
    console.warn('No .model-part elements found in the DOM.');
    return;
  }

  parts.forEach((part) => {
    part.addEventListener('mouseenter', () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch((error) => {
        // Suppress browser autoplay restrictions until first user click
      });
    });

    part.addEventListener('click', (event) => {
      const clickedPartId = event.target.id;
      currentGroup = handlePartClick(clickedPartId, currentGroup, groups);
    });
  });
});
