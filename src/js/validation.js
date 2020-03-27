const validation = {

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

	checkFormula: function(formulaName, formName, itemNameValid, value) {
		const errorClass = 'validation-error';
		const okClass = 'validation-ok';
		const rule = validation[formulaName];

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

    checkFirstName: function() {
		this.formFirstName.addEventListener('change', (event)=> {
			this.checkFormula("firstNameFormula","formFirstName", "firstNameValid", event.target.value)
		})
    },

    checkLastName: function() {
		this.formLastName.addEventListener('change', (event)=> {
			this.checkFormula("lastNameFormula","formLastName", "formLastNameValid", event.target.value)
		})
    },

    checkEmail: function() {
		this.formEmail.addEventListener('change', (event)=> {
			this.checkFormula("emailFormula","formEmail", "formEmailValid", event.target.value)
		})
    },

    checkPhone: function() {
		this.formPhone.addEventListener('change', (event)=> {
			this.checkFormula("phoneFormula","formPhone", "formPhoneValid", event.target.value)
		})
    },

    checkNotes: function() {
		this.formNotes.addEventListener('change', (event)=> {
			this.checkFormula("notesFormula","formNotes", "formNotesValid", event.target.value)
		})
    },

    checkAll: function() {
        validation.$sendButton.disabled = true;
        this.checkFirstName();
        this.checkLastName();
        this.checkEmail();
        this.checkPhone();
        this.checkNotes();
        
        this.$formReady.addEventListener('change', function() {
            
            if (validation.formFirstNameValid == true && validation.formLastNameValid == true && validation.formEmailValid == true && validation.formPhoneValid == true && validation.formNotesValid == true) {
                if (validation.$sendButton != null) {
                    validation.$sendButton.disabled = false;
                }
            }
            else {
                if (validation.$sendButton != null) {
                    validation.$sendButton.disabled = true;
                }
            }
        })
    }
};
document.addEventListener("DOMContentLoaded", function() {
    validation.checkAll()
});

export default validation;