//Change Document Name
let mainHeader = document.querySelector('.mainHeader');

function handleClickForDocumentName() {
  const textArea = document.createElement('textarea');
  const divHeight = mainHeader.offsetHeight;
  const divWidth = mainHeader.offsetWidth;

  textArea.className = mainHeader.className;
  textArea.id = 'textArea';
  textArea.value = mainHeader.textContent;

  textArea.style.height = (divHeight -40) + 'px';
  textArea.style.width = (divWidth -40) + 'px';

  mainHeader.replaceWith(textArea);
  textArea.focus();

  textArea.addEventListener('blur', () => {
    const newDiv = document.createElement('div');
    
    newDiv.className = textArea.className;
    newDiv.textContent = textArea.value;

    textArea.replaceWith(newDiv);
    
    mainHeader = newDiv;

    mainHeader.addEventListener('click', handleClickForDocumentName);
  });

  textArea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      textArea.blur(); 
    }
  });
}

mainHeader.addEventListener('click', handleClickForDocumentName);



//Add and Remove .hidden class upon toggle
function toggleContent(container) {
  const paragraphs = container.querySelectorAll('p');
  paragraphs.forEach((p) => {
    if (p.classList.contains('hidden')) {
      p.classList.remove('hidden');
      console.log('.hidden Class is Removed');
    } else {
      p.classList.add('hidden');
      console.log('.hidden Class is Added');
    }
  });
}

//Create TempButton
function createButton(listItem, targetClass) {
  const tempButton = document.createElement('button');
  tempButton.classList.add('tempButton');
  function targetParagraph() {
    return document.querySelector('.' + targetClass);
  }

  if (!targetParagraph().querySelector('.tempButton')) {
    const existingTopBackItemContainer = targetParagraph().querySelector(
      '.topBackItemContainer'
    );
    const items = document.createElement('span');
    items.classList.add('items');
    items.appendChild(tempButton);
    existingTopBackItemContainer.appendChild(items);
    targetParagraph().appendChild(existingTopBackItemContainer);

    tempButton.dataset.creatorId = listItem.parentElement.id;
  }
  tempButton.addEventListener(
    'click',
    () => {
      const creatorItem = document.querySelector(
        `#${tempButton.dataset.creatorId} a`
      );
      creatorItem.scrollIntoView({ behavior: 'smooth' });
      creatorItem.classList.add('highlight');
      setTimeout(() => creatorItem.classList.remove('highlight'), 2000);
      const items = tempButton.closest('.items');
      items.remove();
      toggleContent(targetParagraph().closest('.paragraphContainer'));
    },
    { once: true }
  );
}

function handleClick(event, type) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href').substring(1);
  const targetContainer = document.getElementById(targetId);
  targetContainer.scrollIntoView({ behavior: 'smooth' });
  toggleContent(targetContainer);
  if (type === 'listItem') {
    createButton(event.currentTarget, event.currentTarget.dataset.target);
  }
}

function attachEventListeners(elements, eventType, handler) {
  elements.forEach((element) => {
    element.addEventListener(eventType, handler);
  });
}

//  ADD NOTES BUTTON
function addNotesMiniButton() {
  const newSpan = document.createElement('span');
  newSpan.classList.add('addNotesMiniButton');
  return newSpan;
}
function addMiniButtonContainer() {
  const newSpan = document.createElement('span');
  newSpan.classList.add('addMiniButtonContainer');
  newSpan.appendChild(addNotesMiniButton());
  return newSpan;
}
function items1() {
  const newSpan = document.createElement('span');
  newSpan.classList.add('items');
  newSpan.appendChild(addMiniButtonContainer());
  return newSpan;
}
// DELETE NOTES BUTTON
function createDeleteNotesButton() {
  const span = document.createElement('span');
  span.classList.add('deleteNotesButton');
  let clonedSpan = span.cloneNode(true);
  return clonedSpan;
}
function deleteButtonContainer() {
  const newSpan = document.createElement('span');
  newSpan.classList.add('deleteButtonContainer');
  newSpan.appendChild(createDeleteNotesButton());
  return newSpan;
}
function items2() {
  const newSpan = document.createElement('span');
  newSpan.classList.add('items');
  newSpan.appendChild(deleteButtonContainer());
  return newSpan;
}

function itemContainer() {
  const newSpan = document.createElement('span');
  newSpan.classList.add('itemContainer');
  newSpan.appendChild(items1());
  newSpan.appendChild(items2());
  return newSpan;
}

//Create <br) and TopBackItemContainer
const br = document.createElement('br');
const topBackItemContainer = document.createElement('span');
topBackItemContainer.classList.add('topBackItemContainer');

//  CREATES NEW LIST
function createNewListItem(title, id) {
  const newListItem = document.createElement('li');
  newListItem.classList.add('list');
  newListItem.id = 'list' + id;

  const newAnchor = document.createElement('a');
  newAnchor.href = '#introHeader' + id;
  newAnchor.dataset.target = 'targetLink' + id;
  newAnchor.textContent = title;
  newListItem.appendChild(newAnchor);
  newListItem.appendChild(itemContainer());

  attachEventListeners([newAnchor], 'click', (event) =>
    handleClick(event, 'listItem')
  );
  return newListItem;
}

//  CREATES NEW PARAGRAPH WITH HEADING
function createNewParagraphItem(title, description, id) {
  const newListItem = document.createElement('li');
  newListItem.classList.add('paragraphList');

  const introHeaderContainer = document.createElement('div');
  introHeaderContainer.classList.add('introHeaderContainer');
  introHeaderContainer.id = 'introHeader' + id;

  const header = document.createElement('h2');
  header.classList.add('introHeader');
  header.textContent = title;

  //  ATTACHES DYNAMIC EVENT LISTENER TO H2
  attachEventListeners([header], 'click', (event) => {
    event.preventDefault();
    toggleContent(event.target.closest('.introHeaderContainer'));
    console.log('Dynamicly added introheader is clicked');
  });

  const paragraphContainer = document.createElement('div');
  paragraphContainer.classList.add('paragraphContainer');

  const p = document.createElement('p');
  p.classList.add('targetLink' + id);
  p.textContent = description;

  const goTopButton = document.createElement('button');
  goTopButton.classList.add('goTop');

  if (
    !topBackItemContainer.contains(topBackItemContainer.querySelector('.items'))
  ) {
    let items;
    items = document.createElement('span');
    items.classList.add('items');
    const anchor = document.createElement('a');
    anchor.href = '#';
    goTopButton.appendChild(anchor);
    items.appendChild(goTopButton);
    topBackItemContainer.appendChild(items);
  }

  const TopBackItemContainerClone = topBackItemContainer.cloneNode(true);

  header.appendChild(itemContainer());
  p.appendChild(itemContainer());
  p.appendChild(br);
  p.appendChild(TopBackItemContainerClone);
  paragraphContainer.appendChild(p);
  introHeaderContainer.appendChild(header);
  introHeaderContainer.appendChild(paragraphContainer);
  newListItem.appendChild(introHeaderContainer);

  paragraphContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('goTop')) {
      event.preventDefault();
      toggleContent(event.target.closest('.paragraphContainer'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  return newListItem;
}

//CREATES AND ADDS TOOLTIP BASED ON CONDITION
function createToolTip() {
  const span = document.createElement('span');
  span.classList.add('toolTip');
  span.innerText = '';
  let toolTipElement = span.cloneNode(true);
  return toolTipElement;
}
function createToolTipContainer() {
  const span = document.createElement('span');
  span.classList.add('toolTipContainer');
  span.innerText = '';
  let toolTipElement = span.cloneNode(true);
  toolTipElement.appendChild(createToolTip());
  return toolTipElement;
}

const itemsContainer = document.querySelectorAll('ol');

function addToolTip(event) {
  if (event.target.matches('.addNotesMiniButton')) {
    const items = event.target.closest('.items');
    items.appendChild(createToolTipContainer());
    const toolTip = document.querySelector('.toolTip');
    toolTip.innerText = 'Edit';

    function removeToolTip() {
      const toolTipContainer = toolTip.closest('.toolTipContainer');
      if (toolTipContainer) {
        toolTipContainer.remove();
      }
    }
    attachEventListeners(itemsContainer, 'mouseout', removeToolTip);
  } else if (event.target.matches('.deleteNotesButton')) {
    const items = event.target.closest('.items');
    const toolTipContainer = createToolTipContainer();
    items.appendChild(toolTipContainer);
    const toolTip = toolTipContainer.querySelector('.toolTip');
    toolTip.innerText = 'Delete';
    const li = event.target.closest('li');
    const p = event.target.closest('p');
    if (li && p) {
      p.style.opacity = '0.7';
    } else if (li) {
      li.style.opacity = '0.7';
    }
    function removeToolTip() {
      const toolTipContainer = toolTip.closest('.toolTipContainer');
      if (toolTipContainer) {
        li.style.opacity = '';
        if (p) {
          p.style.opacity = '';
        }
        toolTipContainer.remove();
      }
    }
    attachEventListeners(itemsContainer, 'mouseout', removeToolTip);
  } else if (event.target.matches('.goTop')) {
    const items = event.target.closest('.items');
    items.appendChild(createToolTipContainer());
    const toolTip = document.querySelector('.toolTip');
    toolTip.innerText = 'Scroll To Top';

    function removeToolTip() {
      const toolTipContainer = toolTip.closest('.toolTipContainer');
      if (toolTipContainer) {
        toolTipContainer.remove();
      }
    }
    attachEventListeners(itemsContainer, 'mouseout', removeToolTip);
  } else if (event.target.matches('.tempButton')) {
    const items = event.target.closest('.items');
    items.appendChild(createToolTipContainer());
    const toolTip = document.querySelector('.toolTip');
    toolTip.innerText = 'Go Back';

    function removeToolTip() {
      const toolTipContainer = toolTip.closest('.toolTipContainer');
      if (toolTipContainer) {
        toolTipContainer.remove();
      }
    }
    attachEventListeners(itemsContainer, 'mouseout', removeToolTip);
  }
}

attachEventListeners(itemsContainer, 'mouseover', addToolTip);

//Creating Dynamic Edit Container
let editContainer, lastParagraph, firstClassOfLastParagraph;

let storedFirstClass = null; // Variable to hold the first class name

document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('addNotesMiniButton')) return;

  if (editContainer) {
    editContainer.remove();
    editContainer = undefined;
    console.info('editContainer has been reset', editContainer);
  } else {
    console.info('editContainer is:', editContainer);
  }

  const button = event.target;

  let list, paragraphList, clonedItemContainerOrigin;

  if ((list = button.closest('.list'))) {
    const targetId = list.querySelector('a').getAttribute('href').substring(1);
    paragraphList = document.getElementById(targetId).closest('.paragraphList');

    let itemContainer = paragraphList.querySelector('.itemContainer');
    if (itemContainer) {
      let toolTipContainer = itemContainer.querySelector('.toolTipContainer');
      if (toolTipContainer) {
        toolTipContainer.remove();
      }
    }

    clonedItemContainerOrigin = itemContainer.cloneNode(true);
  } else if ((paragraphList = button.closest('.paragraphList'))) {
    const targetId = paragraphList
      .querySelector('.introHeaderContainer')
      .getAttribute('id');

    let itemContainer = button.closest('.itemContainer');
    if (itemContainer) {
      let toolTipContainer = itemContainer.querySelector('.toolTipContainer');
      if (toolTipContainer) {
        toolTipContainer.remove();
      }
    }

    clonedItemContainerOrigin = itemContainer.cloneNode(true);

    const attribute = `#${targetId}`;
    list = document.querySelector(`a[href='${attribute}']`).closest('.list');
  }

  if (list && paragraphList) {
    const titleElement = list.querySelector('a');
    const headerElement = paragraphList.querySelector('.introHeader');
    const paragraphElements = paragraphList.querySelectorAll(
      '.paragraphContainer p'
    );
    const paragraphTexts = Array.from(paragraphElements)
      .map((p) => p.textContent.trim().replace(/\s+/g, ' '))
      .filter((p) => p !== '');

    //Create Edit Container
    let draggableArea = document.createElement('div');
    draggableArea.classList.add('draggableArea');

    let removeContainer = document.createElement('div');
    removeContainer.classList.add('removeContainer');

    const editTitleHeading = document.createElement('h4');
    editTitleHeading.textContent = 'Edit Title';
    editTitleHeading.classList.add('editTitleHeading');

    const editTitle = document.createElement('input');
    editTitle.setAttribute('type', 'text');
    editTitle.id = 'editTitle';

    const editTitleHeadingClone = editTitleHeading.cloneNode(true);
    editTitleHeadingClone.textContent = 'Edit Description';

    const editContentAndButton = document.createElement('div');
    editContentAndButton.classList.add('editContentAndButton');
    const submitEdit = document.createElement('button');
    submitEdit.textContent = 'Submit';
    submitEdit.id = 'submitEdit';
    editContentAndButton.appendChild(submitEdit);

    editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');

    editContainer.appendChild(draggableArea);
    editContainer.appendChild(removeContainer);
    editContainer.appendChild(editTitleHeading);
    editContainer.appendChild(editTitle);
    editContainer.appendChild(editTitleHeadingClone);
    editContainer.appendChild(editContentAndButton);

    const body = document.querySelector('body');
    const paragraphListContainer = document.querySelector(
      '.paragraphListContainer'
    );

    if (paragraphListContainer) {
      body.insertBefore(editContainer, paragraphListContainer);
    } else {
      console.warn(
        "paragraphListContainer isn't found, hense editContainer couldn't be added to the DOM"
      );
    }

    editTitle.value = titleElement.textContent;
    editTitle.placeholder = titleElement.textContent;

    //Create New textarea for each existing paragraph and the paragraph text in it
    let editContent;
    paragraphTexts.forEach((paragraphText, index) => {
      const p = document.createElement('p');
      p.textContent = `Paragraph ${index + 1}`;
      // p.id = `paragraph${index + 1}`;
      p.classList.add('paragraphs');

      const addOnTopButton = document.createElement('button');
      addOnTopButton.textContent = 'Add On Top Of This Paragraph';
      addOnTopButton.classList.add('addOnTopButton');
      addOnTopButton.classList.add('addTopBelowButton');

      const addBelowButton = document.createElement('button');
      addBelowButton.textContent = 'Add Below This Paragraph';
      addBelowButton.classList.add('addBelowButton');
      addBelowButton.classList.add('addTopBelowButton');

      const addMoreButtons = document.createElement('div');
      addMoreButtons.classList.add('addMoreButtons');
      // addMoreButtons.id = `addMoreButton${index + 1}`;

      addMoreButtons.appendChild(addOnTopButton);
      addMoreButtons.appendChild(addBelowButton);

      const deleteButtons = document.createElement('button');
      deleteButtons.classList.add('deleteButtons');
      // deleteButtons.id = `deleteButton${index + 1}`;

      editContent = document.createElement('textarea');
      editContent.value = paragraphText;
      editContent.classList.add('editContent');
      // editContent.id = `editContent${index + 1}`;

      editContentAndButton.insertBefore(p, submitEdit);
      editContentAndButton.insertBefore(addMoreButtons, submitEdit);
      editContentAndButton.insertBefore(deleteButtons, submitEdit);
      editContentAndButton.insertBefore(editContent, submitEdit);
    });

    //Change placeHolder hint upon Focus
    editTitle.addEventListener('focus', function () {
      editTitle.classList.remove('placeholder-red');
      editTitle.placeholder = titleElement.textContent;
    });

    //Can Removes Edit Container if it's present
    if (removeContainer) {
      removeContainer.addEventListener('click', () => {
        if (editContainer) {
          editContainer.remove();
          editContainer = undefined;
          console.info(
            'editContainer is removed, now editContainer is:',
            editContainer
          );
        } else {
          console.warn('editContainer is null', editContainer);
        }
      });
    } else {
      console.warn('removeContainer is:', removeContainer);
    }

    // Removing The First Class Of Last Paragraph
    let paragraphContainer,
      // lastParagraph,
      clonedItemContainerForNewP,
      topBackItemContainer,
      br;

    paragraphContainer = paragraphList.querySelector('.paragraphContainer');
    lastParagraph = paragraphContainer.lastElementChild;
    if (lastParagraph) {
      br = lastParagraph.querySelector('br');
      topBackItemContainer = lastParagraph.querySelector(
        '.topBackItemContainer'
      );

      function functionFirstClassOfLastParagraph() {
        if (typeof lastParagraph === 'undefined') {
          console.error('lastParagraph is:', lastParagraph);
          return;
        }

        let classListOfLastParagraph = lastParagraph.className;
        firstClassOfLastParagraph = classListOfLastParagraph.split(' ')[0];

        // Check if there are exactly two class names or class name length gets 10 after removing the last letter
        if (
          lastParagraph.className.split(' ').length === 2 ||
          (firstClassOfLastParagraph.length === 11 &&
            firstClassOfLastParagraph.slice(0, -1).length === 10)
        ) {
          classListOfLastParagraph = lastParagraph.className;
          firstClassOfLastParagraph = classListOfLastParagraph.split(' ')[0];
          // Only store and remove the class if it hasn't been stored yet or class name length gets 10 after removing the last letter
          if (
            !storedFirstClass ||
            (storedFirstClass.length === 11 &&
              storedFirstClass.slice(0, -1).length === 10)
          ) {
            storedFirstClass = firstClassOfLastParagraph;
            // lastParagraph.classList.remove(firstClassOfLastParagraph);
          }

          return firstClassOfLastParagraph;
        } else {
          return;
        }
      }

      let firstClass = functionFirstClassOfLastParagraph(); //Just calling it to store the class Name
    } else {
      console.warn("lastParagraph isn't found:", lastParagraph);
    }

    editContent = document.querySelectorAll('.editContent');

    editContent.forEach((content) => {
      content.addEventListener('focus', function () {
        content.classList.remove('placeholder-red');
      });
    });

    document.getElementById('submitEdit').onclick = function () {
      //Check If Title And Any editContent textareas are filled or not
      const editContent = document.querySelectorAll('.editContent');
      const areAllEditContentHasText = Array.from(editContent).some(
        (textarea) => textarea.value.trim() !== ''
      );

      if (editTitle.value.trim() !== '' && areAllEditContentHasText) {
        // Update the text content with the edited values
        titleElement.textContent = editTitle.value;
        headerElement.childNodes[0].nodeValue = editTitle.value;

        let paragraphs = Array.from(paragraphElements);
        let editContents = document.getElementsByClassName('editContent');

        Array.from(editContents).forEach((editContent) => {
          if (editContent.value.trim() === '') {
            editContent.remove();
            console.log('empty editContent removed');
          }
        });

        lastParagraph.classList.remove(firstClassOfLastParagraph);

        // Adjust the paragraphs
        if (editContents.length < paragraphs.length) {
          for (let i = editContents.length; i < paragraphs.length; i++) {
            paragraphs[i].remove();
            console.log('removed extra pragraph');
          }
        } else if (editContents.length > paragraphs.length) {
          // Add new paragraphs
          const paragraphContainer = paragraphList.querySelector(
            '.paragraphContainer'
          );
          for (let i = paragraphs.length; i < editContents.length; i++) {
            const createParagraph = document.createElement('p');
            createParagraph.textContent = editContents[i].value;
            createParagraph.classList.add('hidden');
            paragraphContainer.appendChild(createParagraph);

            // Adding First Child Node Of Previous Last Paragraph Into All New Paragraphs
            clonedItemContainerForNewP =
              clonedItemContainerOrigin.cloneNode(true);
            createParagraph.appendChild(clonedItemContainerForNewP);
          }
        }

        editContents = document.getElementsByClassName('editContent');
        paragraphs = paragraphContainer.querySelectorAll('p');

        paragraphs.forEach((paragraph, index) => {
          paragraph.childNodes[0].textContent =
            Array.from(editContents)[index].value;
        });

        // Adding First Class and Moving Child Nodes Of Previous Last Paragraph Into New Last Paragraph
        lastParagraph = paragraphContainer.lastElementChild; // Which is updated
        if (lastParagraph) {
          lastParagraph.classList.remove('hidden');
          // Add the stored first class back if it exists
          if (storedFirstClass) {
            lastParagraph.classList.add(storedFirstClass);
          }
        }

        let allParagraph = paragraphContainer.querySelectorAll('p');
        allParagraph.forEach((paragraph) => {
          if ((list = button.closest('.list'))) {
            paragraph.classList.remove('hidden');
          } else if (
            (paragraphList = button.closest('.paragraphList')) ||
            (allParagraph = paragraphContainer.querySelectorAll('p'))
          ) {
            if (
              !paragraph.classList.contains('hidden') ||
              !lastParagraph.classList.contains('hidden')
            ) {
              paragraph.classList.add('hidden');
            }
          } else {
            console.warn("Class isn't being added properly");
          }
        });

        if (lastParagraph) {
          lastParagraph.appendChild(br);
          lastParagraph.appendChild(topBackItemContainer);
        }

        const editContainer = document.querySelector('.edit-container');
        editContainer.remove();
      } else {
        if (editTitle.value.trim() === '') {
          editTitle.placeholder = 'Write Your Tittle!';
          editTitle.classList.add('placeholder-red');
        }
        if (!areAllEditContentHasText) {
          editContent.forEach((editContent) => {
            editContent.placeholder = 'Write Your Description!';
            editContent.classList.add('placeholder-red');
          });
        }
      }
    };
  }
});

//Handle click events
document.addEventListener('click', function (event) {
  if (event.target.closest('.addMoreButtons')) {
    showHideAddTopBelowButtons(event);
  }

  if (event.target.classList.contains('addOnTopButton')) {
    addParagraphOnTop(event);
  } else if (event.target.classList.contains('addBelowButton')) {
    addParagraphBelow(event);
  } else if (event.target.classList.contains('deleteButtons')) {
    deleteParagraphFromEditContainer(event);
  } else if (event.target.classList.contains('addNotesMiniButton')) {
    moveEditContainer(event);
  }
});



// drag editContainer
document.addEventListener('mousedown', function (event) {
  if (event.target.classList.contains('draggableArea')) {
    dragEditContainer(event);
  }
});
document.addEventListener('mousemove', function (event) {
  if (event.target.classList.contains('draggableArea') || event.target.closest('html')) {
      movesEditContainer(event);
  }
});
document.addEventListener('mouseup', function (event) {
  if (event.target.classList.contains('draggableArea') 
    || event.target.closest('html')
  ) {
    stopDragging(event);
  }
});


let isDragging, offsetX, offsetY, html;
function dragEditContainer(event) {
  editContainer = event.target.closest('.edit-container');  
    isDragging = true;
    offsetX = event.clientX - editContainer.offsetLeft;
    offsetY = event.clientY - editContainer.offsetTop;
    editContainer.style.transition = 'none';
}

function movesEditContainer(event) {
  html = event.target.closest('html');
  editContainer = html.querySelector('.edit-container');
  if (isDragging) {
    editContainer.style.left = (event.clientX - offsetX) + 'px';
    editContainer.style.top = (event.clientY - offsetY) + 'px';
  } 
}


function stopDragging(event) {
  html = event.target.closest('html');
  editContainer = html.querySelector('.edit-container');
  if (editContainer) {
    isDragging = false;
    editContainer.style.transition = 'all 0.3s ease-in-out';
  }
};



//Show And Hide addTopBelowButtons
function showHideAddTopBelowButtons(event) {
  const addMoreButtons = event.target;
  if (addMoreButtons) {
    // Hide all .addTopBelowButton elements that are not within the clicked container
    document.querySelectorAll('.addTopBelowButton').forEach((button) => {
      if (!addMoreButtons.contains(button)) {
        button.style.display = 'none';
      }
    });

    const addTopBelowButton =
      addMoreButtons.querySelectorAll('.addTopBelowButton');

    addTopBelowButton.forEach((button) => {
      if (button.style.display === 'block') {
        button.style.display = 'none';
      } else {
        button.style.display = 'block';
      }
    });
  }
}

/*Include New paragraphs
On Top*/
function addParagraphOnTop(event) {
  const addOnTopButton = event.target;
  const addMoreButtons = addOnTopButton.closest('.addMoreButtons');

  const pOfAddOnTopButton = addMoreButtons.previousElementSibling;
  const editContentAndButton = document.querySelector('.editContentAndButton');

  const p = document.createElement('p');
  p.classList.add('paragraphs');
  p.textContent = 'new paragraph';

  const newAddOnTopButton = document.createElement('button');
  newAddOnTopButton.textContent = 'Add On Top Of This Paragraph';
  newAddOnTopButton.classList.add('addOnTopButton');
  newAddOnTopButton.classList.add('addTopBelowButton');

  const newAddBelowButton = document.createElement('button');
  newAddBelowButton.textContent = 'Add Below This Paragraph';
  newAddBelowButton.classList.add('addBelowButton');
  newAddBelowButton.classList.add('addTopBelowButton');

  const newAddMoreButtons = document.createElement('div');
  newAddMoreButtons.classList.add('addMoreButtons');

  newAddMoreButtons.appendChild(newAddOnTopButton);
  newAddMoreButtons.appendChild(newAddBelowButton);

  const deleteButtons = document.createElement('button');
  deleteButtons.classList.add('deleteButtons');

  const editContent = document.createElement('textarea');
  editContent.classList.add('editContent');

  editContentAndButton.insertBefore(p, pOfAddOnTopButton);
  editContentAndButton.insertBefore(newAddMoreButtons, pOfAddOnTopButton);
  editContentAndButton.insertBefore(deleteButtons, pOfAddOnTopButton);
  editContentAndButton.insertBefore(editContent, pOfAddOnTopButton);

  const allP = editContentAndButton.querySelectorAll('.paragraphs');
  const allEditContent = editContentAndButton.querySelectorAll('.editContent');

  allP.forEach((p, index) => {
    p.textContent = `Paragraph ${index + 1}`;
  });
  allEditContent.forEach((editContent, index) => {
    editContent.placeholder = `Paragraph ${index + 1}`;
  });

  const addTopBelowButton =
    addMoreButtons.querySelectorAll('.addTopBelowButton');
  addTopBelowButton.forEach((button) => {
    button.style.display = 'none';
  });
}

/*Include New paragraphs
Below*/
function addParagraphBelow(event) {
  const addBelowButton = event.target;
  const addMoreButtons = addBelowButton.closest('.addMoreButtons');

  let pOfBelowEditContentAndSubmitEdit = addMoreButtons.nextElementSibling;
  while (pOfBelowEditContentAndSubmitEdit) {
    if (
      pOfBelowEditContentAndSubmitEdit.tagName.toLowerCase() === 'p' ||
      pOfBelowEditContentAndSubmitEdit.id === 'submitEdit'
    )
      break;
    pOfBelowEditContentAndSubmitEdit =
      pOfBelowEditContentAndSubmitEdit.nextElementSibling;
  }

  const editContentAndButton = document.querySelector('.editContentAndButton');

  const p = document.createElement('p');
  p.classList.add('paragraphs');
  p.textContent = 'new paragraph';

  const newAddOnTopButton = document.createElement('button');
  newAddOnTopButton.textContent = 'Add On Top Of This Paragraph';
  newAddOnTopButton.classList.add('addOnTopButton');
  newAddOnTopButton.classList.add('addTopBelowButton');

  const newAddBelowButton = document.createElement('button');
  newAddBelowButton.textContent = 'Add Below This Paragraph';
  newAddBelowButton.classList.add('addBelowButton');
  newAddBelowButton.classList.add('addTopBelowButton');

  const newAddMoreButtons = document.createElement('div');
  newAddMoreButtons.classList.add('addMoreButtons');

  newAddMoreButtons.appendChild(newAddOnTopButton);
  newAddMoreButtons.appendChild(newAddBelowButton);

  const deleteButtons = document.createElement('button');
  deleteButtons.classList.add('deleteButtons');

  const editContent = document.createElement('textarea');
  editContent.classList.add('editContent');

  editContentAndButton.insertBefore(p, pOfBelowEditContentAndSubmitEdit);
  editContentAndButton.insertBefore(
    newAddMoreButtons,
    pOfBelowEditContentAndSubmitEdit
  );
  editContentAndButton.insertBefore(
    deleteButtons,
    pOfBelowEditContentAndSubmitEdit
  );
  editContentAndButton.insertBefore(
    editContent,
    pOfBelowEditContentAndSubmitEdit
  );

  const allP = editContentAndButton.querySelectorAll('.paragraphs');
  const allEditContent = editContentAndButton.querySelectorAll('.editContent');

  allP.forEach((p, index) => {
    p.textContent = `Paragraph ${index + 1}`;
  });
  allEditContent.forEach((editContent, index) => {
    editContent.placeholder = `Paragraph ${index + 1}`;
  });

  const addTopBelowButton =
    addMoreButtons.querySelectorAll('.addTopBelowButton');
  addTopBelowButton.forEach((button) => {
    button.style.display = 'none';
  });
}

//Delete Paragraph From edit-container
function deleteParagraphFromEditContainer(event) {
  const deleteButtons = event.target;
  const editContentAndButton = deleteButtons.closest('.editContentAndButton');

  if (
    deleteButtons
      .closest('.editContentAndButton')
      .querySelectorAll('.deleteButtons').length !== 1
  ) {
    let pOfCurrentParagraph = deleteButtons.previousElementSibling;
    let divOfCurrentParagraph = pOfCurrentParagraph.nextElementSibling;
    let buttonOfCurrentParagraph = divOfCurrentParagraph.nextElementSibling;
    let textareaOfCurrentParagraph =
      buttonOfCurrentParagraph.nextElementSibling;

    while (
      pOfCurrentParagraph &&
      divOfCurrentParagraph &&
      buttonOfCurrentParagraph &&
      textareaOfCurrentParagraph
    ) {
      if (
        pOfCurrentParagraph.tagName.toLowerCase() === 'p' &&
        divOfCurrentParagraph.tagName.toLowerCase() === 'div' &&
        buttonOfCurrentParagraph.tagName.toLowerCase() === 'button' &&
        textareaOfCurrentParagraph.tagName.toLowerCase() === 'textarea'
      ) {
        break;
      }
      pOfCurrentParagraph = pOfCurrentParagraph.previousElementSibling;
      divOfCurrentParagraph = pOfCurrentParagraph.nextElementSibling;
      buttonOfCurrentParagraph = divOfCurrentParagraph.nextElementSibling;
      textareaOfCurrentParagraph = buttonOfCurrentParagraph.nextElementSibling;
    }
    pOfCurrentParagraph.remove();
    divOfCurrentParagraph.remove();
    buttonOfCurrentParagraph.remove();
    textareaOfCurrentParagraph.remove();
  } else {
    const textarea = deleteButtons
      .closest('.editContentAndButton')
      .querySelector('textarea');
    if (textarea.value !== '') {
      textarea.value = '';
    }
  }

  editContentAndButton
    .querySelectorAll('.paragraphs')
    .forEach((paragraph, index) => {
      paragraph.textContent = `Paragraph ${index + 1}`;
    });
  editContentAndButton
    .querySelectorAll('textarea')
    .forEach((textarea, index) => {
      textarea.placeholder = `Paragraph ${index + 1}`;
    });
}

//Moves editContainer position
function moveEditContainer(event) {
  const editContainer = document.querySelector('.edit-container');
  const y = event.pageY;

  editContainer.style.left = '50%';
  editContainer.style.top = `${y - 100}px`;
  editContainer.style.transform = 'translateX(-50%)';
}

// Delete List and Paragraph
document.addEventListener('click', function (event){

    if (!event.target.classList.contains('deleteNotesButton')) return;
  
    const button = event.target;
  
    let list, paragraphList, p;
  
    if ((list = button.closest('.list'))) {
      const targetId = list.querySelector('a').getAttribute('href').substring(1);
      paragraphList = document.getElementById(targetId).closest('.paragraphList');
  
    } else if ((paragraphList = button.closest('.paragraphList'))) {
      const targetId = paragraphList
        .querySelector('.introHeaderContainer')
        .getAttribute('id');
  
      const attribute = `#${targetId}`;
      list = document.querySelector(`a[href='${attribute}']`).closest('.list');
    }
  

    if (button.closest('.introHeader') || button.closest('.list')) {

      if (list && paragraphList) {
        list.remove();
        paragraphList.remove();
      }

      //update the attributes of Lists
      const allList = document.querySelectorAll('.listContainer li');
  
      console.log(allList);
  
      if (allList) {      
        allList.forEach((list, index) => {
  
          list.querySelector('a').dataset.target = `targetLink${index + 1}`;
          list.querySelector('a').href = `#introHeader${index + 1}`;
          list.id = `list${index + 1}`;
        });
      }
  
          //update the attributes of Paragraphs
          const allParagraphList = document.querySelectorAll('.paragraphListContainer li');
          console.log(allParagraphList);
  
          if (allParagraphList) {      
            allParagraphList.forEach((list, index) => {
              const allP = list.querySelector('.paragraphContainer').querySelectorAll('p');
              allP.forEach(p => {
                if(p.classList.contains('hidden')) {
                  p.classList.remove('hidden');
                }
              })
  
              list.querySelector('.introHeaderContainer').id = `introHeader${index + 1}`;
              list.querySelector('.paragraphContainer').lastElementChild.classList = `targetLink${index + 1}`;
              const tempButton = list.querySelector('.introHeaderContainer').querySelector('.tempButton');
              if (tempButton) {
                tempButton.dataset.creatorId = `list${index + 1}`;
              }
            });
          }
    } else if (p = button.closest('p')) {
      const paragraphContainer = p.closest('.paragraphContainer');
      const allP = paragraphContainer.querySelectorAll('p');
      if (paragraphContainer.lastElementChild !== allP[0]) {
        const classListOfLastParagraph = paragraphContainer.lastElementChild.classList[0];
        const topBackItemContainer = paragraphContainer.lastElementChild.lastElementChild;
        p.remove();
        if (paragraphContainer.lastElementChild) {
          paragraphContainer.lastElementChild.classList.add(classListOfLastParagraph);
          paragraphContainer.lastElementChild.appendChild(topBackItemContainer);
        }
      }
    }
    const listContainer = document.querySelector('.listContainer');
    console.log('this is last element', listContainer); 
    if (listContainer.lastElementChild === null) {
      listContainer.textContent = 'Click "Add Notes" Button To Add Your First Notes';
    }
})