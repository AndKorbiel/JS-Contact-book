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

    checkFirstName: function() {
		this.formFirstName.addEventListener('change', function() { 
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
			const rule = validation.firstNameFormula;
			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
			        this.classList.add(errorClass);
			        return validation.formFirstNameValid = false;
			    } else {
			        this.classList.remove(errorClass);
			        this.classList.add(okClass);
			        return validation.formFirstNameValid = true;
			    }		
		})
    },

    checkLastName: function() {
		this.formLastName.addEventListener('change', function() { 
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
			const rule = validation.lastNameFormula;
			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
			        this.classList.add(errorClass);
			        return validation.formLastNameValid = false;
			    } else {
			        this.classList.remove(errorClass);
			        this.classList.add(okClass);
			        return validation.formLastNameValid = true;
			    }		
		})
    },

    checkEmail: function() {
		this.formEmail.addEventListener('change', function() { 
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
			const rule = validation.emailFormula;
			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
			        this.classList.add(errorClass);
			        return validation.formEmailValid = false;
			    } else {
			        this.classList.remove(errorClass);
			        this.classList.add(okClass);
			        return validation.formEmailValid = true;
			    }		
		})
    },

    checkPhone: function() {
		this.formPhone.addEventListener('change', function() { 
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
			const rule = validation.phoneFormula;
			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
			        this.classList.add(errorClass);
			        return validation.formPhoneValid = false;
			    } else {
			        this.classList.remove(errorClass);
			        this.classList.add(okClass);
			        return validation.formPhoneValid = true;
			    }		
		})
    },

    checkNotes: function() {
		this.formNotes.addEventListener('change', function() { 
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
			const rule = validation.notesFormula;
			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
			        this.classList.add(errorClass);
			        return validation.formNotesValid = false;
			    } else {
			        this.classList.remove(errorClass);
			        this.classList.add(okClass);
			        return validation.formNotesValid = true;
			    }		
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
                validation.$sendButton.disabled = false;
            }
            else {
                validation.$sendButton.disabled = true;
            }
        })
    }
}


validation.checkAll();


/*

  
    


  /* */

     /* this.check(this.formLastName, this.lastNameFormula, this.formLastNameValid);
        this.check(this.formEmail, this.emailFormula, this.formEmailValid);
        this.check(this.formPhone, this.phoneFormula, this.formPhoneValid);
        this.check(this.formNotes, this.notesFormula, this.formNotesValid); */

           /*  */

      /* */

/*



/*  check: (input, formula, fieldValidCheck) => {
        
		input.addEventListener('change', function() { 
			const errorClass = 'validation-error';
			const okClass = 'validation-ok';
            const rule = formula; 

			    if (!rule.test(this.value)) {
			        this.classList.remove(okClass);
                    this.classList.add(errorClass);
                    fieldValidCheck = false
            
                    return fieldValidCheck
			        
			    } else {
			        this.classList.remove(errorClass);
                    this.classList.add(okClass);
                    fieldValidCheck = true
                   
                    return fieldValidCheck
                }	
                
        })
        return fieldValidCheck = true
    },
    */