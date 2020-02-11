// import Popovers from './Popovers.js';

// const elementButton = document.getElementById('button');
// const addPopup = new Popovers(document.body, 'Popover title', 'And here`s some amazing content. It`s very engaging. Right?');
// addPopup.bindToDOM();

// elementButton.addEventListener('click', () => {
//   addPopup.positionPopup(elementButton);
// });

let draggedEl = null;
let ghostEl = null;
let elWidth;
let elHeight;
let elTop;
let elLeft;
const elTasks = document.querySelector('#tasks');

// mousedown
elTasks.addEventListener('mousedown', (event) => {
  event.preventDefault();
  if (!event.target.classList.contains('item-task')) {
    if(event.target.classList.contains('add-task')) {
      event.target.parentNode.querySelector('.input-task').classList.remove('hidden');
      event.target.classList.add('hidden');
    }
    return;
  }
  const { top, left } = event.target.getBoundingClientRect();
  draggedEl = event.target;
  elWidth = draggedEl.offsetWidth;
  elHeight = draggedEl.offsetHeight;
  elLeft = event.pageX - left;
  elTop = event.pageY - top;

  ghostEl = event.target.cloneNode(true);
  ghostEl.innerHTML = '';
  ghostEl.style.backgroundColor = 'grey';
  ghostEl.style.width = `${elWidth}px`;
  ghostEl.style.height = `${elHeight}px`;

  draggedEl.classList.add('dragged');
  event.target.parentNode.insertBefore(ghostEl, event.target.nextElementSibling);

  draggedEl.style.left = `${event.pageX - elLeft}px`;
  draggedEl.style.top = `${event.pageY - elTop}px`;
  draggedEl.style.width = `${elWidth}px`;
  draggedEl.style.height = `${elHeight}px`;

});

elTasks.addEventListener('mouseleave', (event) => {
  if (!draggedEl) {
    return;
  }
console.log('mouseLeave');
  ghostEl.parentNode.removeChild(ghostEl);
  draggedEl.classList.remove('dragged');
  draggedEl.style =''
  ghostEl = null;
  draggedEl = null;
});

elTasks.addEventListener('mousemove', (event) => {
  event.preventDefault();
  if (!draggedEl) {
    return;
  }
  
  const closest = document.elementFromPoint(event.clientX, event.clientY);
  const { top } = closest.getBoundingClientRect();

  if (!closest.classList.contains('item-tasks')) {
    if (event.pageY > window.scrollY + top + closest.offsetHeight / 2) {
      closest.closest('.item-tasks').insertBefore(ghostEl, closest.nextElementSibling);
    } else {
      closest.closest('.item-tasks').insertBefore(ghostEl, closest);
    }
  }

  draggedEl.style.left = `${event.pageX - elLeft}px`;
  draggedEl.style.top = `${event.pageY - elTop}px`;
});


elTasks.addEventListener('mouseup', (event) => {
  if (!draggedEl) {
    return;
  }
  const closest = document.elementFromPoint(event.clientX, event.clientY);
  const { top } = closest.getBoundingClientRect();
  
  if (!closest.classList.contains('item-tasks')) {
    if (event.pageY > window.scrollY + top + closest.offsetHeight / 2) {
      closest.closest('.item-tasks').insertBefore(draggedEl, closest.nextElementSibling);
    } else {
      closest.closest('.item-tasks').insertBefore(draggedEl, closest);
    }
  }

  ghostEl.parentNode.removeChild(ghostEl);
  draggedEl.classList.remove('dragged');
  draggedEl.style =''
  ghostEl = null;
  draggedEl = null;
});
