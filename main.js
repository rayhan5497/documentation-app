document.addEventListener('DOMContentLoaded', () => {
    // Variable Declarations
    const listItems = document.querySelectorAll('.list a');
    const headers = document.querySelectorAll('.introHeader');
    const goTopButtons = document.querySelectorAll('.goTop');
    const addNotesButton = document.querySelector('.addNotesButton');
    const inputBoxContainedContainer = document.querySelector('.inputBoxContainedContainer');
    const inputElements = inputBoxContainedContainer.querySelectorAll('.inputBoxContainer, input, textarea, h4, Button, #placeholderTitle, #placeHolderDescription');
    const addButton = document.querySelector('.addButton');
    const listContainer = document.querySelector('.listContainer');
    const paragraphListContainer = document.querySelector('.paragraphListContainer');
    const titleInput = document.getElementById('placeholderTitle');
    const descriptionInput = document.getElementById('Description');
  
    // Event Listeners and Initializations
    attachEventListeners(listItems, 'click', (event) => handleClick(event, 'listItem'));

    attachEventListeners(headers, 'click', (event) => {
      event.preventDefault();
      toggleContent(event.target.closest('.introHeaderContainer'));
    });
    attachEventListeners(goTopButtons, 'click', (event) => {
      event.preventDefault();
      toggleContent(event.target.closest('.paragraphContainer'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    addNotesButton.textContent = 'Add Notes';
    addNotesButton.addEventListener('click', () => {
      addNotesButton.textContent = addNotesButton.textContent === 'Add Notes' ? 'Hide' : 'Add Notes';
      addNotesButton.classList.toggle('clicked');
      inputElements.forEach((element) => {
        element.classList.toggle(`hidden${element.tagName === 'INPUT' ? '2' : element.tagName === 'TEXTAREA' ? '3' : element.tagName === 'H4' ? '4' : element.tagName === 'BUTTON' ? '5' : element.id === 'placeholderTitle' ? '6' : '7'}`);
      });
    });
  
    titleInput.addEventListener('focus', function () {
      titleInput.classList.remove('placeholder-red');
      titleInput.placeholder = 'Title';
    });
  
    descriptionInput.addEventListener('focus', function () {
      descriptionInput.classList.remove('placeholder-red');
      descriptionInput.placeholder = 'First Paragraph...';
    });
  
    addButton.addEventListener('click', () => {
      const title = titleInput.value;
      const description = descriptionInput.value;
      if (title && description) {
        const listItems = document.querySelectorAll('.list');
        const lastListItemId = listItems.length > 0 ? listItems[listItems.length - 1].id : 'list0';
        const newListItemId = parseInt(lastListItemId.substring(4)) + 1;
  
        const newListItem = createNewListItem(title, newListItemId);
        listContainer.appendChild(newListItem);
  
        titleInput.value = '';
      } else {
        if (!title) {
          titleInput.placeholder = 'Write Your Title!';
          titleInput.classList.add('placeholder-red');
        }
      }
      if (description && title) {
        let newListItemId = 1;
  
        if (paragraphListContainer.children.length > 0) {
          const lastListItem = paragraphListContainer.lastElementChild;
          newListItemId = parseInt(lastListItem.querySelector('.introHeaderContainer').id.substring(11)) + 1;
        }
        const newListItem = createNewParagraphItem(title, description, newListItemId);
        paragraphListContainer.appendChild(newListItem);
  
        descriptionInput.value = '';
      } else {
        if (!description) {
          descriptionInput.placeholder = 'Write Your Paragraph!';
          descriptionInput.classList.add('placeholder-red');
        }
      }
    });
  });