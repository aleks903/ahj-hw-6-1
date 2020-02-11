import Popovers from '../js/Popovers.js';

test('should render self', () => {
  const widget = new Popovers(document.body);
  widget.bindToDOM();
  const container = document.querySelector('#popup');

  expect(container.innerHTML).toEqual(widget.htmlElement);
});

test('show popup', () => {
  const widget = new Popovers(document.body);
  widget.bindToDOM();
  const container = document.querySelector('#popup');

  const docBody = document.body;
  docBody.addEventListener('click', () => {
    widget.positionPopup(docBody);
  });
  docBody.click();

  expect(container.classList.contains('hidden')).toBeFalsy();
});
