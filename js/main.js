"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentId = currentId;
var $modal = document.querySelector('#modal');
var $modalTitle = document.querySelector('#modal h2');
var $modalFormFirstName = document.querySelector('#first_name');
var $modalFormLastName = document.querySelector('#last_name');
var $modalFormEmail = document.querySelector('#email');
var $modalFormPhone = document.querySelector('#phone');
var $modalFormNotes = document.querySelector('#notes');
var $addButton = document.querySelector('#add');
var $addUser = document.querySelector('#add_user');
var $contactsList = document.querySelector('tbody');
var currentGlobalId = '';

var contactPositionEdit = function contactPositionEdit(positionId) {
  return function () {
    $modal.classList.add('open');
    $modalTitle.innerHTML = 'Edit contact';
    var takenFromStorage = JSON.parse(localStorage.getItem(positionId));
    $modalFormFirstName.value = takenFromStorage.firstName;
    $modalFormLastName.value = takenFromStorage.lastName;
    $modalFormEmail.value = takenFromStorage.email;
    $modalFormPhone.value = takenFromStorage.phone;
    $modalFormNotes.value = takenFromStorage.notes;
    currentGlobalId = positionId;
    $addUser.removeEventListener('submit', addContactOnFormOnSubmit, false);
    $addUser.addEventListener('submit', updateContactOnEditSubmit);
  };
};

var contactPositionDelete = function contactPositionDelete(positionId, element) {
  return function () {
    localStorage.removeItem(positionId);
    element.innerHTML = '';
    element.classList.remove('contact-pos');
    var ids = document.querySelectorAll('.ids');

    var innerCounter = function () {
      var counter = 0;
      return function () {
        counter += 1;
        return counter;
      };
    }();

    ids.forEach(function (element) {
      element.innerHTML = innerCounter();
    });
  };
};

function currentId() {
  var currentId = localStorage.getItem('contact_cureent_id');

  if (currentId == undefined || currentId == null) {
    return 0;
  } else {
    return currentId.slice(2);
  }
}

function toggleModalWithoutData() {
  $modal.classList.add('open');
  $modalTitle.innerHTML = 'Add contact';
  $modalFormFirstName.value = '';
  $modalFormLastName.value = '';
  $modalFormEmail.value = '';
  $modalFormPhone.value = '';
  $modalFormNotes.value = '';
  $addUser.removeEventListener('submit', updateContactOnEditSubmit);
  $addUser.addEventListener('submit', addContactOnFormOnSubmit);
}

function addToHTML(el, currentRowNumber) {
  return "<tr class=\"contact-pos\" id=\"".concat(el.id, "\">\n            <td class=\"ids\">").concat(currentRowNumber, "</td>\n            <td>").concat(el.firstName, "</td>\n            <td>").concat(el.lastName, "</td>\n            <td>").concat(el.email, "</td>\n            <td>").concat(el.phone, "</td>\n            <td>").concat(el.notes, "</td>\n            <td><span class=\"edit\">Edit</span><span class=\"delete\">Delete</span></td>\n            </tr>");
}

function addContactToHTML(el) {
  var currentRowNumber = document.querySelectorAll('.ids').length + 1;
  $contactsList.innerHTML = $contactsList.innerHTML + addToHTML(el, currentRowNumber);
}

function updateContactInHTML(el) {
  var x = document.querySelectorAll('.contact-pos');

  var findRowNumber = function findRowNumber() {
    for (var i = 0; i < x.length; i++) {
      if (x[i].id == currentGlobalId) {
        return i + 1;
      }
    }
  };

  el.id = currentGlobalId;
  var target = document.querySelector("#".concat(currentGlobalId));
  var currentRowNumber = findRowNumber();
  target.innerHTML = addToHTML(el, currentRowNumber);
  contactListButtonsEvents();
}

function onFormSubmit(id) {
  $modal.classList.remove('open');
  var contact = {
    id: id,
    firstName: $modalFormFirstName.value,
    lastName: $modalFormLastName.value,
    email: $modalFormEmail.value,
    phone: $modalFormPhone.value,
    notes: $modalFormNotes.value
  };
  return contact;
}

function addContactOnFormOnSubmit(e) {
  e.preventDefault();
  var id = 'cb' + (parseInt(currentId()) + 1);
  var contact = onFormSubmit(id);
  localStorage.setItem(contact.id, JSON.stringify(contact));
  localStorage.setItem('contact_cureent_id', contact.id);
  addContactToHTML(contact);
  contactListButtonsEvents();
}

function updateContactOnEditSubmit(e) {
  e.preventDefault();
  var id = currentGlobalId;
  var contact = onFormSubmit(id);
  localStorage.setItem(contact.id, JSON.stringify(contact));
  updateContactInHTML(contact);
}

function addContactsFromStorage() {
  function getAllKeysFromStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
      if (/^cb[0-9]+$/.test(keys[i])) {
        values.unshift(JSON.parse(localStorage.getItem(keys[i])));
      }
    }

    return values;
  } // można użyć obj keys, slice nie musi mieć drugiej wartości


  var allFromStorage = getAllKeysFromStorage();

  function compare(a, b) {
    return a - b;
  }

  allFromStorage.sort(compare);
  allFromStorage.forEach(function (el) {
    addContactToHTML(el);
  });
}

function contactListButtonsEvents() {
  var listedPositions = document.querySelectorAll('.contact-pos');
  listedPositions.forEach(function (el) {
    var element = el;
    var positionId = el.id;
    el.querySelector('.delete').addEventListener('click', contactPositionDelete(positionId, element));
    el.querySelector('.edit').addEventListener('click', contactPositionEdit(positionId));
  });
} // $addButton.addEventListener('click', toggleModalWithoutData);
//
// $modal.addEventListener('click', function(e) {
//     if (e.target == $modal) {
//         $modal.classList.remove('open');
//     }
// })


addContactsFromStorage();
contactListButtonsEvents();