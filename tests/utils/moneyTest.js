import formatCurrency from "../../scripts/utils/money.js";

// In Jasmine, "describe" creates a test suite.
// It takes two parameters:
// 1. Suite name
// 2. Function containing the tests (it blocks)
describe("test suite: format currency", () => {
  // "it" defines an individual test case
  it("converts paisa to rupees", () => {
    // Jasmine uses expect(actual).matcher()
    expect(formatCurrency(1060)).toEqual("10.60");
  });

  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("rounds up to the nearest paisa", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });

  it("rounds down to the nearest paisa", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
});

// Nested describe blocks are allowed
describe("test suite: show describe under another describe", () => {
  describe("show describe 1", () => {
    it("demo to pass", () => {
      expect(formatCurrency(0)).toEqual("0.00");
    });
  });

  describe("show describe 2", () => {
    it("demo to pass", () => {
      expect(formatCurrency(0)).toEqual("0.00");
    });
  });
});
