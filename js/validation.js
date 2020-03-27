"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var validation = {
  $formReady: document.querySelector('#add_user'),
  $sendButton: document.querySelector('#submit'),
  formFirstName: document.querySelector('#first_name'),
  formLastName: document.querySelector('#last_name'),
  formEmail: document.querySelector('#email'),
  formPhone: document.querySelector('#phone'),
  formNotes: document.querySelector('#notes'),
  firstNameFormula: /^([A-Za-z]{1,12})?$/,
  lastNameFormula: new RegExp('^([A-Za-z]{1,12})?$'),
  emailFormula: new RegExp('^([0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3})?$'),
  phoneFormula: new RegExp('^([0-9]{6,9})?$'),
  notesFormula: new RegExp('^(.){0,160}?$'),
  formFirstNameValid: true,
  formLastNameValid: true,
  formEmailValid: true,
  formPhoneValid: true,
  formNotesValid: true,
  checkFormula: function checkFormula(formulaName, formName, itemNameValid, value) {
    var errorClass = 'validation-error';
    var okClass = 'validation-ok';
    var rule = validation[formulaName];

    if (!rule.test(value)) {
      if (this[formName] != null) {
        if (this[formName].classList != null) {
          this[formName].classList.remove(okClass);
          this[formName].classList.add(errorClass);
        }
      }

      return validation[itemNameValid] = false;
    } else {
      if (this[formName] != null) {
        this[formName].classList.remove(errorClass);
        this[formName].classList.add(okClass);
      }

      return validation[itemNameValid] = true;
    }
  },
  checkFirstName: function checkFirstName() {
    var _this = this;

    this.formFirstName.addEventListener('change', function (event) {
      _this.checkFormula("firstNameFormula", "formFirstName", "firstNameValid", event.target.value);
    });
  },
  checkLastName: function checkLastName() {
    var _this2 = this;

    this.formLastName.addEventListener('change', function (event) {
      _this2.checkFormula("lastNameFormula", "formLastName", "formLastNameValid", event.target.value);
    });
  },
  checkEmail: function checkEmail() {
    var _this3 = this;

    this.formEmail.addEventListener('change', function (event) {
      _this3.checkFormula("emailFormula", "formEmail", "formEmailValid", event.target.value);
    });
  },
  checkPhone: function checkPhone() {
    var _this4 = this;

    this.formPhone.addEventListener('change', function (event) {
      _this4.checkFormula("phoneFormula", "formPhone", "formPhoneValid", event.target.value);
    });
  },
  checkNotes: function checkNotes() {
    var _this5 = this;

    this.formNotes.addEventListener('change', function (event) {
      _this5.checkFormula("notesFormula", "formNotes", "formNotesValid", event.target.value);
    });
  },
  checkAll: function checkAll() {
    validation.$sendButton.disabled = true;
    this.checkFirstName();
    this.checkLastName();
    this.checkEmail();
    this.checkPhone();
    this.checkNotes();
    this.$formReady.addEventListener('change', function () {
      if (validation.formFirstNameValid == true && validation.formLastNameValid == true && validation.formEmailValid == true && validation.formPhoneValid == true && validation.formNotesValid == true) {
        if (validation.$sendButton != null) {
          validation.$sendButton.disabled = false;
        }
      } else {
        if (validation.$sendButton != null) {
          validation.$sendButton.disabled = true;
        }
      }
    });
  }
};
document.addEventListener("DOMContentLoaded", function () {
  validation.checkAll();
});
var _default = validation;
exports["default"] = _default;