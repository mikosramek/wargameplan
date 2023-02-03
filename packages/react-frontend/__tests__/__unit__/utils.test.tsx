import { nameSort, orderSort } from "utils/general";
import { STEPS, ARMIES } from "__tests__/__data__/utils.data";

describe("General Utils", () => {
  describe("Order Sort", () => {
    describe("When given an array of steps", () => {
      it("orders them by order", () => {
        const orderedSteps = [...STEPS].sort(orderSort);
        expect(orderedSteps[0].order).toBe(1);
        expect(orderedSteps[orderedSteps.length - 1].order).toBe(
          orderedSteps.length
        );
      });
    });
  });
  describe("Name Sort", () => {
    describe("When given an array of armies", () => {
      it("orders the alphabetically by name", () => {
        const alphabeticalArmies = Object.entries(ARMIES).sort(nameSort);
        const firstArmy = alphabeticalArmies[0][1].name;
        const lastArmy =
          alphabeticalArmies[alphabeticalArmies.length - 1][1].name;
        expect(firstArmy).toBe(ARMIES.first.name);
        expect(lastArmy).toBe(ARMIES.last.name);
      });
    });
  });
});
