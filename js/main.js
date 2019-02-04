(function() {

const $modal = document.querySelector('#modal');
const $modalTitle = document.querySelector('#modal h2');
const $modaFormFirstName = document.querySelector('#first_name');
const $modalFormLastName = document.querySelector('#last_name');
const $modalFormEmail = document.querySelector('#email');
const $modalFormPhone = document.querySelector('#phone');
const $modalFormNotes = document.querySelector('#notes');
const $addButton = document.querySelector('#add');
const $addUser = document.querySelector('#add_user');
const $contactsList = document.querySelector('tbody');

let currentGlobalId = '';

let contactPositionEdit = function (positionId) {

    return function () {
        $modal.classList.add('open');
        $modalTitle.innerHTML = 'Edit contact';

        let retrivedFromStorage = JSON.parse(localStorage.getItem(positionId));

        $modaFormFirstName.value = retrivedFromStorage.firstName;
        $modalFormLastName.value = retrivedFromStorage.lastName;
        $modalFormEmail.value = retrivedFromStorage.email;
        $modalFormPhone.value = retrivedFromStorage.phone;
        $modalFormNotes.value = retrivedFromStorage.notes;

        currentGlobalId = positionId;
        $addUser.removeEventListener('submit', addContactOnFormOnSubmit, false);
        $addUser.addEventListener('submit', updateContactOnEditSubmit);
    }  
      
}

let contactPositionDelete = function (positionId, element) {

    return function () {
        localStorage.removeItem(positionId);
        element.innerHTML = '';
        element.classList.remove('contact-pos')

        let ids = document.querySelectorAll('.ids')

        let innerCounter = (function () {
            var counter = 0;
            return function () {counter += 1; return counter}
        })()

        ids.forEach(function(element) {
            element.innerHTML = innerCounter()
        })
    }
    
}

function currentId() {
    let currentId = localStorage.getItem('contact_cureent_id');
    if (currentId == undefined || currentId == null) {
        return 0
    }
    else {
        return currentId.slice(2);
    }
}

function toggleModalWithoutData() {
    $modal.classList.add('open');
    $modalTitle.innerHTML = 'Add contact';
    $modaFormFirstName.value = '';
    $modalFormLastName.value =  '';
    $modalFormEmail.value =  '';
    $modalFormPhone.value =  '';
    $modalFormNotes.value =  '';
    $addUser.removeEventListener('submit', updateContactOnEditSubmit);
    $addUser.addEventListener('submit', addContactOnFormOnSubmit);
}

function addToHTML(el, currentRowNumber) {
    return `<tr class="contact-pos" id="${el.id}">
            <td class="ids">${currentRowNumber}</td>
            <td>${el.firstName}</td>
            <td>${el.lastName}</td>
            <td>${el.email}</td>
            <td>${el.phone}</td>
            <td>${el.notes}</td>
            <td><span class="edit">Edit</span><span class="delete">Delete</span></td>
            </tr>`
}

function addContactToHTML(el) {
    let currentRowNumber = document.querySelectorAll('.ids').length +1;
    $contactsList.innerHTML = $contactsList.innerHTML + addToHTML(el, currentRowNumber);
}

function updateContactInHTML(el) {
    let x = document.querySelectorAll('.contact-pos')
    const findRowNumber = function() {
        for (var i = 0; i < x.length; i++) {
           if (x[i].id == currentGlobalId) {
            return i+1
           }
        }   
    }     
    el.id = currentGlobalId;
    let target = document.querySelector(`#${currentGlobalId}`);
    let currentRowNumber = findRowNumber();
    target.innerHTML = addToHTML(el, currentRowNumber);
    contactListButtonsEvents();
}

function onFormSubmit(id) {   
    $modal.classList.remove('open');

    return contact = {
        id: id,
        firstName: $modaFormFirstName.value,
        lastName: $modalFormLastName.value,
        email: $modalFormEmail.value,
        phone: $modalFormPhone.value,
        notes: $modalFormNotes.value,
    };
}

function addContactOnFormOnSubmit(e) {
    e.preventDefault();

    let id = 'cb' + (parseInt(currentId()) +1);
    let contact = onFormSubmit(id);

    localStorage.setItem(contact.id, JSON.stringify(contact));
    localStorage.setItem('contact_cureent_id', contact.id); 
    addContactToHTML(contact);
    contactListButtonsEvents();
}

function updateContactOnEditSubmit(e) {
    e.preventDefault();

    let id = currentGlobalId;
    let contact = onFormSubmit(id);

    localStorage.setItem(contact.id, JSON.stringify(contact));
    updateContactInHTML(contact);
}

function addContactsFromStorage() {
    function getAllKeysFromStorage() {

        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {
            if (/^cb[0-9]+$/.test(keys[i])) {
                values.unshift( JSON.parse(localStorage.getItem(keys[i])) );
            }    
        }
        
        return values;
    }
    // można użyć obj keys, slice nie musi mieć drugiej wartości
    let allFromStorage = getAllKeysFromStorage();
    function compare(a,b) {
        return a - b
      }
      
    allFromStorage.sort(compare);
    allFromStorage.forEach(function(el) {     
        addContactToHTML(el);
    })
}

function contactListButtonsEvents() {
    let listedPositions = document.querySelectorAll('.contact-pos');

    listedPositions.forEach(function(el) {
        const element = el;
        const positionId = el.id;

        el.querySelector('.delete').addEventListener('click', contactPositionDelete(positionId, element));
        el.querySelector('.edit').addEventListener('click', contactPositionEdit(positionId));

    })
}

$addButton.addEventListener('click', toggleModalWithoutData);

$modal.addEventListener('click', function(e) {
    if (e.target == $modal) {
        $modal.classList.remove('open');
    }
})

addContactsFromStorage();
contactListButtonsEvents();

})()