const expect = require('chai').expect;
import sum from '../src/js/sum'

describe("Sum functionality", function () {
    it("should add numbers", function () {
        const is = sum(2,3)
        expect(is).to.equal(5)
    })
});
