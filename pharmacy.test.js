import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Normal drug", () => {
    it("should decrease benefit and expiresIn by 1 each day", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 10, 20)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", 9, 19)]);
    });

    it("should degrade benefit twice as fast after expiration", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 8)]);
    });

    it("should never have a negative benefit", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 5, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", 4, 0)]);
    });

    it("should not go below 0 when benefit is 1 and drug is expired", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 1)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 0)]);
    });

    it("should stay at 0 when benefit is already 0 and drug is expired", () => {
      expect(
        new Pharmacy([new Drug("Doliprane", 0, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("Doliprane", -1, 0)]);
    });
  });

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 each day", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 10, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 9, 6)]);
    });

    it("should increase benefit twice as fast after expiration", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 10)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 12)]);
    });

    it("should never exceed benefit of 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 10, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 9, 50)]);
    });

    it("should not exceed 50 when benefit is 49 and drug is expired", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 49)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 50)]);
    });

    it("should stay at 50 when benefit is already 50 and drug is expired", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 50)]);
    });
  });

  describe("Magic Pill", () => {
    it("should never change expiresIn or benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 15, 40)]);
    });

    it("should never expire even when expiresIn is 0", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 0, 40)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 0, 40)]);
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 when more than 10 days remaining", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 12, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 11, 36)]);
    });

    it("should increase benefit by 2 when 10 days or less remaining", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 9, 37)]);
    });

    it("should increase benefit by 3 when 5 days or less remaining", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 4, 38)]);
    });

    it("should drop benefit to 0 after expiration", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });

    it("should increase benefit by 1 when 11 days remaining, not 2", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 11, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 10, 36)]);
    });

    it("should increase benefit by 2 when 6 days remaining, not 3", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 6, 35)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 5, 37)]);
    });

    it("should never exceed benefit of 50 when 10 days or less remaining", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 49)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 9, 50)]);
    });

    it("should never exceed benefit of 50 when 5 days or less remaining", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 49)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 4, 50)]);
    });

    it("should stay at 50 when benefit is already 50", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 12, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 11, 50)]);
    });
  });
});
