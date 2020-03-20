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

	checkFormula: function(formulaName, formName, itemNameValid) {
		const errorClass = 'validation-error';
		const okClass = 'validation-ok';
		const rule = validation[formulaName];
		if (!rule.test(this[formName].value)) {
			this[formName].classList.remove(okClass);
			this[formName].classList.add(errorClass);
			return validation[itemNameValid] = false;
		} else {
			this[formName].classList.remove(errorClass);
			this[formName].classList.add(okClass);
			return validation[itemNameValid] = true;
		}
	},

    checkFirstName: function() {
		this.formFirstName.addEventListener('change', ()=> {
			this.checkFormula("firstNameFormula","formFirstName", "firstNameValid")
		})
    },

    checkLastName: function() {
		this.formLastName.addEventListener('change', ()=> {
			this.checkFormula("lastNameFormula","formLastName", "formLastNameValid")
		})
    },

    checkEmail: function() {
		this.formEmail.addEventListener('change', ()=> {
			this.checkFormula("emailFormula","formEmail", "formEmailValid")
		})
    },

    checkPhone: function() {
		this.formPhone.addEventListener('change', ()=> {
			this.checkFormula("phoneFormula","formPhone", "formPhoneValid")
		})
    },

    checkNotes: function() {
		this.formNotes.addEventListener('change', ()=> {
			this.checkFormula("notesFormula","formNotes", "formNotesValid")
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
            
            // if (validation.formFirstNameValid == true && validation.formLastNameValid == true && validation.formEmailValid == true && validation.formPhoneValid == true && validation.formNotesValid == true) {
            //     validation.$sendButton.disabled = false;
            // }
            // else {
            //     validation.$sendButton.disabled = true;
            // }
        })
    }
};

validation.checkAll();

export default validation;