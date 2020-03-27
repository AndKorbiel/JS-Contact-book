const expect = require('chai').expect;
import validation from "../src/js/validation";

describe("Validation formulas rules", ()=>{
    it("should take only letters in first name field", ()=>{
        const firstName = 'Test';
        expect(validation.firstNameFormula.test(firstName)).to.be.true;
    });
    it("should return false when there are characters other than letters in first name field", ()=>{
        const firstName = 'Abc 123';
        expect(validation.firstNameFormula.test(firstName)).to.be.false;
    });
    it("should take only less than 12 chars in first name field", ()=>{
        const shortFirstName = "Test";
        expect(validation.firstNameFormula.test(shortFirstName)).to.be.true;
    });
    it("should return false when first name field has more than 12 chars", ()=>{
        const firstName = "VeryVeryVeryLongName";
        expect(validation.firstNameFormula.test(firstName)).to.be.false;
    });
    it("should take only proper email format in the email field", ()=>{
        const email = "MyEmail@email.com";
        expect(validation.emailFormula.test(email)).to.be.true;
    });
    it("should return false when email field has wrong format", ()=>{
        const email = "MyEmail.com";
        expect(validation.emailFormula.test(email)).to.be.false;
    });
    it("should take only 6 to 9 digits number in the phone field", ()=>{
        const phoneNumber = '123456';
        expect(validation.phoneFormula.test(phoneNumber)).to.be.true;
    });
    it("should return false when phone number is in the wrong format", ()=>{
        const phoneNumber = '123456abc';
        expect(validation.phoneFormula.test(phoneNumber)).to.be.false;
    })
});

describe("Validation functions", ()=>{
    it("should return false when value is not matching formula", ()=>{
       const formVal = {
           classList: 'ok',
           formulaName: 'firstNameFormula',
           formName: 'formFirstName',
           itemNameValid: 'firstNameValid',
           value: 'test test'
       };
       expect(validation.checkFormula(formVal.formulaName, formVal.formName, formVal.itemNameValid, formVal.value)).to.be.false;
    });

    it("should return true when value is mattching formularz", ()=> {
        const formVal = {
            classList: 'ok',
            formulaName: 'emailFormula',
            formName: 'formEmail',
            itemNameValid: 'formEmailValid',
            value: 'test@test.test'
        };
        expect(validation.checkFormula(formVal.formulaName, formVal.formName, formVal.itemNameValid, formVal.value)).to.be.true;
    })
});