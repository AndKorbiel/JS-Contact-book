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
    beforeEach(()=>{
        document.getElementById('first_name').innerHTML = '<input type="text" class="form-control" id="first_name" placeholder="First name">';
    });
    it("should return false when value is wrong", ()=>{
       const firsName = 'adsa das';
       expect(validation.checkFirstName(firsName)).to.be.false;
    });
});