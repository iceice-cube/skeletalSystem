import './style.css'

import hoverSoundFile from './assets/sound/hover-effect.wav'; // 1. Import the audio file

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
]

var currentGroup = -1;
var currentBreadCrumb = '';

const breadCrumb = document.getElementById("breadcrumb");

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


let typingTimeout = 1;

function updateText(title, tags, description){
  const titleEl = document.getElementById('title');
  const tagsEl = document.getElementById('tags');
  const bodyEl = document.getElementById('body-content');

  // Instant update for headers
  titleEl.textContent = title;
  tagsEl.textContent = tags;

  // Clear active typing timer
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  // Typewriter effect for body paragraph
  bodyEl.textContent = '';
  let index = 0;

  function typeChar() {
    if (index < description.length) {
      bodyEl.textContent += description.charAt(index);
      index++;
      typingTimeout = setTimeout(typeChar, 7); // Adjust typing speed here (ms)
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
    // Group level selected (e.g., "Arm Group")
    currentBreadCrumb = itemName;
    breadcrumb.textContent = `SKELETAL SYSTEM > ${currentBreadCrumb}`;
  } 
  else if (layer === 2) {
    // Specific bone level selected (e.g., "Humerus")
    breadcrumb.textContent = `SKELETAL SYSTEM > ${currentBreadCrumb} > ${itemName}`;
  }
}

function handlePartClick(partId, currentGroup, groups) {
  
  if(currentGroup >= 0){
    groups[currentGroup].classList.add('hidden');
  }

  deselectButtons();

  switch (partId) {
    case 'arm':
      console.log('Arm selected');

      currentGroup = 6; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'UPPER EXTREMITy');
      updateText("Upper Extremity", "Appendicular", "Allows in grasping, manipulating objects, and fine motor control. Extends from the clavicle to the fingers, including the shoulder girdle, and the upper limb.");
      break;

    case 'column':
      // console.log(currentGroup);
      currentGroup = 7; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'SPINAL COLUMN');
      updateText("SPINAL Column",
        "Axial | Irregular",
        "Vertebral column, in vertebrate animals, the flexible column extending from neck to tail, made of a series of bones, the vertebrae. The major function of the vertebral column is protection of the spinal cord; it also provides stiffening for the body and attachment for the pectoral and pelvic girdles and many muscles. In humans an additional function is to transmit body weight in walking and standing.");
      break;

    case 'clavicle':
      console.log('Clavicle selected');
      // Add your logic for the clavicle here
      currentGroup = 8; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'CLAVICLE');
      updateText("Clavicle", "", "The clavicle, collarbone, or keybone is a slender, S-shaped long bone approximately 15 centimetres (6 in) long that serves as a strut between the shoulder blade and the sternum (breastbone). There are two clavicles, one on each side of the body. The clavicle is the only long bone in the body that lies horizontally. Together with the shoulder blade, it makes up the shoulder girdle.");
      break;  

    case 'feet':
      console.log('Feet selected');
      // Add your logic for the feet here
      currentGroup = 3; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'FOOT');
      updateText("Feet", "Appendicular", "");
      break;

    case 'hand':
      console.log('Hand selected');
      // Add your logic for the hand here
      currentGroup = 4; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'HAND');
      updateText("hand", "Appendicular", "");
      break;

    case 'legs':
      console.log('Legs selected');
      // Add your logic for the legs here

      currentGroup = 5; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'LOWER EXTREMITIES');
      updateText("Lower Extremity", "Appendicular", "Designed for weight-bearing, stability, and locomotion. Extends from pelvic girdle to the toes. ");
      break;

    case 'pelvis':
      console.log('Pelvis selected');
    
      currentGroup = 2; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'PELVIS');
      updateText("Pelvis", 
        "Appendicular",
        "The bony structure inside the hips, buttocks and pubic region. It is the seat that holds up the upper body when sitting, standing or walking. The hole in the middle of the pelvis serves as the birth canal during vaginal delivery. The pelvic anatomy can shift to accommodate childbirth.");
      break;

    case 'ribcage':
      console.log('Ribcage selected');
      // Add your logic for the ribcage here
      currentGroup = 1; 
      groups[currentGroup].classList.remove('hidden');
      updateBreadCrumb(1, 'RIBCAGE');
      updateText("Ribcage",
        "Axial",
        "Basketlike skeletal structure that forms the chest, or thorax, and is made up of the ribs and their corresponding attachments to the sternum (breastbone) and the vertebral column. The rib cage surrounds the lungs and the heart, serving as an important means of bony protection for these vital organs.In total, the rib cage consists of the 12 thoracic vertebrae and the 24 ribs, in addition to the sternum. With each succeeding rib, from the first, or uppermost, the curvature of the rib cage becomes more open. The rib cage is semirigid but expansile, able to increase in size. The small joints between the ribs and the vertebrae permit a gliding motion of the ribs on the vertebrae during breathing and other activities.");
      break;

    case 'skull':
      console.log('Skull selected');
      // Add your logic for the skull here
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
      updateText(
        "Jaw bone", 
        "Axial | Irregular",
        `Either of a pair of bones that form the framework of the mouth of vertebrate animals, usually containing teeth and including a movable lower jaw (mandible) and fixed upper jaw (maxilla). Jaws function by moving in opposition to each other and are used for biting, chewing, and the handling of food.`
      )
      updateBreadCrumb(2, 'JAW BONE');
      break;
    case 'skull-2':
      updateText(
        "Cranium",
        "Axial | Flat",
        `The cranium is the part of the skull that encloses the brain. It is composed of bones or cartilage and protects the brain and some sense organs. In humans, the cranium is globular and relatively large compared to the face, unlike in most other animals where the facial portion is larger.
        The human cranium is supported by the atlas, the highest vertebra, allowing for nodding and side-to-side head movements. Key bones forming the cranium include the occipital bone at the base, the parietal and temporal bones on the sides and top, and the frontal bone forming the forehead. The cranial floor is made up of the sphenoid and ethmoid bones. In infants, the sutures between these bones are loose but fuse with age.`
      );
      updateBreadCrumb(2, 'CRANIUM');
      break;
    case 'skull-3':
      updateText(
        "Nasal Bone",
        "Axial | Flat",
        `The nasal bone is a median process that projects downward from the frontal bone and articulates with the two nasal bones. It is also referred to as the superior nasal spine. The nasal cavity, which is the internal space of the nose, is divided by a septum into left and right passages. These passages open to the face through the nostrils and into the pharynx via the choanae. The floor of the nasal cavity is formed by the palate.`
      );
      updateBreadCrumb(2, "NASAL BONE");
      break;
    case 'skull-4':
      updateText(
        "Temporal Bone",
        "Axial | Irregular",
        `The temporal bone is a compound bone located on the side of the skull in mammals, including humans. It plays a crucial role in the structure of the human ear.`
      );
      updateBreadCrumb(2, "TEMPORAL BONE");
      break;
    case 'skull-5':
      updateText(
        "MAXILLA",
        "Axial | Irregular",
        `The maxillae are the bones that form the upper jaws in vertebrates. They constitute the majority of the facial skeleton and extend beyond just supporting the upper teeth. The maxillae also form the middle and lower parts of the eye sockets and contribute to the nasal opening`
      )
      updateBreadCrumb(2, "MAXILLA");
      break;
    case 'skull-6':
      updateText(
        "MANDIBLE",
        "Axial | Irregular",
        `The mandible, located inferiorly in the facial skeleton, is the largest and strongest bone of the face.
        It forms the lower jaw and acts as a receptacle for the lower teeth. It also articulates on either side with the temporal bone, forming the temporomandibular joint.`
      )
      updateBreadCrumb(2, "MANDIBLE");
      break;

    // --- RIBCAGE GROUP ---
    case 'ribcage-1':
      updateText(
        "Rib",
        "Axial | Flat",
        `Any of several pairs of narrow, curved strips of bone (sometimes cartilage) attached dorsally to the vertebrae and, in higher vertebrates, to the breastbone ventrally, to form the bony skeleton, or rib cage, of the chest. The ribs help to protect the internal organs that they enclose and lend support to the trunk musculature.`
      );
      updateBreadCrumb(2, "Rib");
      break;
    case 'ribcage-2':
      updateText(
        "Sternum",
        "Axial | Flat",
        `An elongated bone in the centre of the chest that articulates with and provides support for the clavicles (collarbones) of the shoulder girdle and for the ribs. In humans the sternum is elongated and flat; it may be felt from the base of the neck to the pit of the abdomen.`
        );
      updateBreadCrumb(2, 'Sternum');
      break;
    case 'ribcage-3':
      updateText(
        "Costal Cartilage",
        "Axial",
        `Costal cartilages are pliable cartilages that connect the first seven ribs to the sternum, forming what are known as "true ribs". These cartilages are a type of hyaline cartilage, which is a resilient connective tissue found in various parts of the human skeleton. Hyaline cartilage is also present at the ends of ribs, in the nose, larynx, trachea, and bronchi. Unlike bone, cartilage lacks blood vessels and nerves, receiving nutrients through diffusion. The rib cage, which includes these costal cartilages, protects vital organs like the lungs and heart.`
      );

      updateBreadCrumb(2, 'Costal Cartilage');
      break;

    // --- PELVIC GROUP ---
    case 'pelvic-1':
      updateText(
        "Illium",
        "Appendicular | Flat",
        `The ilium is the largest, uppermost, and dorsal bone of the pelvis. It is one of the three bones—along with the ischium and pubis—that fuse to form the hipbone in adults. Each hipbone, along with the sacrum, constitutes one half of the pelvis. The ilium plays a crucial role in forming the hip joint, where it articulates with the femur.`
      );
      updateBreadCrumb(2,"Illium");
      break;
    case 'pelvic-2':
       updateText(
        "Sacrum",
        "Axial | Irregular",
        `The Sacrum is a shield-shaped bony structure that is located at the base of the lumbar vertebrae and that is connected to the pelvis. The sacrum forms the posterior pelvic wall and strengthens and stabilizes the pelvis. Joined at the very end of the sacrum are two to four tiny, partially fused vertebrae known as the coccyx or "tail bone". The coccyx provides slight support for the pelvic organs but actually is a bone of little use.`
      );
      
      updateBreadCrumb(2, "Sacrum");
      break;
    case 'pelvic-3':
      updateText(
        "Coccyx",
        "Axial | Irregular",
        `Coccyx, curved, semiflexible lower end of the backbone (vertebral column) in apes and humans, representing a vestigial tail. It is composed of three to five successively smaller caudal (coccygeal) vertebrae. The first is a relatively well-defined vertebra and connects with the sacrum; the last is represented by a small nodule of bone. The spinal cord ends above the coccyx. In early adulthood the coccygeal vertebrae fuse with each other; in later life the coccyx may fuse with the sacrum. A corresponding structure in other vertebrates, such as birds, may also be called a coccyx.`
      );

      updateBreadCrumb(2, "Coccyx");
      break;
    case 'pelvic-4':
      updateText(
        "Pubis", 
        "Appendicular | Irregular",
        `The pubis or pubic bone forms the lower and anterior part of each side of the hip bone. The pubis is the most forward-facing (ventral and anterior) of the three bones that make up the hip bone. The left and right pubic bones are each made up of three sections; a superior ramus, an inferior ramus, and a body.`
      );
      updateBreadCrumb(2, "Pubis");
      break;

    // --- FEET GROUP ---
    case 'feet-1':
      updateText(
        "Tarsals",
        "Appendicular | Short",
        `The short, angular bones that in humans make up the ankle. The tarsals correspond to the carpal bones of the upper limb. In humans the tarsals, in combination with the metatarsal bones, form a longitudinal arch in the foot—a shape well adapted for carrying and transferring weight in bipedal locomotion.`
      );
      updateBreadCrumb(2, "Tarsals");
      break;
    case 'feet-2':
      updateText(
        "Metatarsals",
        "Appendicular | Long",
        `Metatarsal, any of several tubular bones between the ankle (tarsal) bones and each of the hindlimb digits.  In humans the five metatarsal bones help form longitudinal arches along the inner and outer sides of the foot and a transverse arch at the ball of the foot. The first metatarsal (which adjoins the phalanges of the big toe) is enlarged and strengthened for its weight-bearing function in standing and walking on two feet. `
      );

      updateBreadCrumb(2, "Metatarsals");
      break;
    case 'feet-3':
      updateText(
        "Phalanges",
        "Appendicular | Long",
        `The phalanges are long, slender bones that form the framework of our fingers and toes. Each hand contains 14 phalanges, divided into three segments: Proximal, middle, and distal. Similarly, each foot has 14 phalanges, with the exception of the big toe, which has only two. These bones are connected to the metacarpals and metatarsals, respectively, and are supported by ligaments, tendons, and muscles. The primary function of the phalanges is to provide structural support and facilitate movement in our hands and feet. The flexibility of these bones allows us to perform intricate tasks such as writing, typing, gripping objects, and playing musical instruments`
      );

      updateBreadCrumb(2, "Phalanges");
      break;

    // --- HAND GROUP ---
    case 'hand-1':
      updateText(
        "Phalanges",
        "Appendicular | Long",
        `The phalanges of the hand are the group of small bones that comprise the bony core of the digits (fingers) of the hand. Even though the phalanges are small in size, they are classified as long bones because of their structural characteristics; each phalanx consists of a shaft, distal head and a proximal base.`
      );
      updateBreadCrumb(2, "Phalanges");
      break;
    case 'hand-2':
      updateText(
        "Metacarpal",
        "Appendicular | Long",
        `In human anatomy, the metacarpal bones, or "palm bones", collectively the metacarpus, are the appendicular bones that form the intermediate part of the hand between the phalanges (fingers) and the carpal bones (wrist bones), which articulate with the forearm. The metacarpal bones are homologous to the metatarsal bones in the foot.`
      );
      updateBreadCrumb(2, "Metacarpal");
      break;
    case 'hand-3':
      updateText(
        "Carpal",
        "Appendicular | Short",
        `The carpal bones are the eight small bones that make up the wrist (carpus) that connects the hand to the forearm. The main role of the carpal bones is to articulate with the radial and ulnar heads to form a highly mobile condyloid joint (i.e. wrist joint), to provide attachments for thenar and hypothenar muscles, and to form part of the rigid carpal tunnel which allows the median nerve and tendons of the anterior forearm muscles to be transmitted to the hand and fingers.`
      )

      updateBreadCrumb(2, "Carpal");
      break;

    // --- LEG GROUP ---
    case 'leg-1':
      updateText(
        "Femur",
        "Appendicular | Long",
        `The femur or thigh bone is the only bone in the thigh — the region of the lower limb between the hip and the knee. In many four-legged animals, the femur is the upper bone of the hindleg.The top of the femur fits into a socket in the pelvis called the hip joint, and the bottom of the femur connects to the shinbone (tibia) and kneecap (patella) to form the knee. In humans the femur is the largest and thickest bone in the body.`
      );
      updateBreadCrumb(2, "Femur");
      break;
    case 'leg-2':
      updateText(
        "Patella",
        "Appendicular | Sesamoid",
        "The patella, also known as the kneecap, is a flat, rounded triangular bone which articulates with the femur (thigh bone) and covers and protects the anterior articular surface of the knee joint. The patella is found in many tetrapods, such as mice, cats, birds, humans, and dogs, but not in whales, or most reptiles.In humans, the patella is the largest sesamoid bone (i.e., embedded within a tendon or a muscle) in the body."
      );
      updateBreadCrumb(2, "Patella");
      break;
    case 'leg-3':
      updateText(
        "Fibula",
        "Appendicular | Long ",
        `The fibula or calf bone is a leg bone on the lateral side of the tibia, to which it is connected above and below. It is the smaller of the two bones and, in proportion to its length, the most slender of all the long bones. Its upper extremity is small, placed toward the back of the head of the tibia, below the knee joint and excluded from the formation of this joint. Its lower extremity inclines a little forward, so as to be on a plane anterior to that of the upper end; it projects below the tibia and forms the lateral part of the ankle joint.`
      );

      updateBreadCrumb(2, "Fibula");
      break;
    case 'leg-4':
      updateText(
        "Tibia",
        "Appendicular | Long",
        `The tibia , also known as the shinbone, shankbone or simply the shin, is the larger, stronger, and anterior (frontal) of the two bones in the leg below the knee in vertebrates (the other being the fibula, behind and to the outside of the tibia); it connects the knee with the ankle. The tibia is found on the medial side of the leg next to the fibula and closer to the median plane. The tibia is connected to the fibula by the interosseous membrane of leg, forming a type of fibrous joint called a syndesmosis with very little movement. The tibia is named for the flute tibia. It is the second largest bone in the human body, after the femur. The leg bones are the strongest long bones as they support the rest of the body.`
      );

      updateBreadCrumb(2 ,"Tibia");
      break;

    // --- ARM GROUP ---
    case 'arm-1':
      updateText(
        "Humerus", 
        "Appendicular | Long",
        `The humerus is the single bone of the upper arm. It belongs to the so-called long bones, which means it has two distinguishable ends – the proximal and distal epiphyses. Both epiphyses are involved in bone growth up to the age of the ossification of epiphysial cartilage. The portion of the bone between these ends is called the diaphysis. Any long bone has two epiphyses and one diaphysis.`
      );

      updateBreadCrumb(2, "Humerus");
      break;
    case 'arm-2':
      updateText(
      "Scapula",
      "Appendicular | Flat",
      `The scapula (pl.: scapulae or scapulas[1]), also known as the shoulder blade, is the bone that connects the humerus (upper arm bone) with the clavicle (collar bone). Like their connected bones, the scapulae are paired, with each scapula on either side of the body being roughly a mirror image of the other`
    
      );
      updateBreadCrumb(2, "Scapula");
      break;
    case 'arm-3':
      updateText(
      "Radius",
      "Appendicular | Long",
      `radius, in anatomy, the outer of the two bones of the forearm when viewed with the palm facing forward. All land vertebrates have this bone. In humans it is shorter than the other bone of the forearm, the ulna.`
      );
      updateBreadCrumb(2, "Radius");
      break;
    case 'arm-4':
      updateText(
      "Ulna",
      "Appendicular | Long",
      `The ulna or ulnar bone is a long bone in the forearm stretching from the elbow to the wrist. It is on the same side of the forearm as the little finger, running parallel to the radius, the forearm's other long bone. Longer and thinner than the radius, the ulna is considered to be the smaller long bone of the lower arm. The corresponding bone in the lower leg is the fibula.`
      );
      updateBreadCrumb(2, "Ulna");
      break;

    // --- SPINAL GROUP ---
    case 'spinal-1':
      updateText(
        "Cervical Vertebrae",
        "Axial | Irregular",
        `The cervical vertebrae are the seven vertebrae located in the neck, which is the part of the body that connects the head to the shoulders and chest. These vertebrae enclose the spinal cord and are crucial for supporting the head and facilitating movement.`
      );

      updateBreadCrumb(2, "Cervical Vertebrae");
      break;
    case 'spinal-2':
      updateText(
        "Thoracic Vertebrae",
        "Axial | Irregular",
        `The thoracic vertebrae are part of the vertebral column, which extends from the neck to the tail in vertebrate animals. This column is composed of individual bones called vertebrae, and its primary role is to protect the spinal cord. The thoracic vertebrae are specifically located in the chest region and articulate with the ribs, forming a significant part of the rib cage. The rib cage, along with the sternum and ribs, forms a protective basket around vital organs like the heart and lungs. In humans, there are typically 12 thoracic vertebrae.`
      );

      updateBreadCrumb(2, "Thoracic Vertebrae");
      break;
    case 'spinal-3':
      updateText(
        "Lumbar Vertebrae",
        "Axial | Irregular",
        `The lumbar vertebrae are located between the thoracic vertebrae and sacrum. They form the lower part of the back in humans, and the region of the spine between the rib cage and pelvis in quadrupedal mammals. In humans, there are typically five lumbar vertebrae.`
      )
      updateBreadCrumb(2, "Lumbar Vertebrae");
      break;
    case 'spinal-4':
      updateText(
        "Sacrum",
        "Axial | Irregular",
        `The Sacrum is a shield-shaped bony structure that is located at the base of the lumbar vertebrae and that is connected to the pelvis. The sacrum forms the posterior pelvic wall and strengthens and stabilizes the pelvis. Joined at the very end of the sacrum are two to four tiny, partially fused vertebrae known as the coccyx or "tail bone". The coccyx provides slight support for the pelvic organs but actually is a bone of little use.`
      );
      
      updateBreadCrumb(2, "Sacrum");
      break;
    case 'spinal-5':
      updateText(
        "Coccyx",
        "Axial | Irregular",
        `Coccyx, curved, semiflexible lower end of the backbone (vertebral column) in apes and humans, representing a vestigial tail. It is composed of three to five successively smaller caudal (coccygeal) vertebrae. The first is a relatively well-defined vertebra and connects with the sacrum; the last is represented by a small nodule of bone. The spinal cord ends above the coccyx. In early adulthood the coccygeal vertebrae fuse with each other; in later life the coccyx may fuse with the sacrum. A corresponding structure in other vertebrates, such as birds, may also be called a coccyx.`
      );

      updateBreadCrumb(2, "Coccyx");
      break;

    default:
      console.warn(`Unrecognized button ID: ${buttonId}`);
      break;
  }
}

window.goToPage = function(page) {
  window.location.href = `${page}`;
};



const appendicularBtn = document.getElementById('appendicular');
const axialBtn = document.getElementById('axial');

appendicularBtn.addEventListener('click', () => {
  appendicularBtn.classList.toggle('selected');
  updateModelVisibility();
});

axialBtn.addEventListener('click', () => {
  axialBtn.classList.toggle('selected');
  updateModelVisibility();
});

const bones = document.querySelectorAll('.circle-btn');

bones.forEach((bone) => {
  bone.addEventListener('click', (event)=>{
    const clickedBtn = event.target.closest('.circle-btn');
    if (!clickedBtn) return;

    // 1. Find any currently selected button across all groups
    const currentlySelected = document.querySelector('.circle-btn.selected');

    // 2. If a different button was previously selected, reset it to default
    if (currentlySelected && currentlySelected !== clickedBtn) {
      currentlySelected.classList.remove('selected');
    }

    // 3. Toggle/Add the 'selected' class to the newly pressed button
    clickedBtn.classList.toggle('selected');
      const clickedPartId = event.target.id;
      handleBoneButtonClick(clickedPartId);
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const hoverSound = new Audio(hoverSoundFile); // 2. Pass the imported reference
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
        console.log('Autoplay blocked until first user interaction:', error);
      });
    });

    part.addEventListener('click', (event) => {
      const clickedPartId = event.target.id;
      currentGroup = handlePartClick(clickedPartId, currentGroup, groups);
    });
  });


});
