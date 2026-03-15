export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => this.updateDrug(drug));
    return this.drugs;
  }

  updateDrug(drug) {
    if (drug.name === "Magic Pill") {
      return;
    }

    const isExpired = drug.expiresIn <= 0;

    drug.benefit = this.computeBenefit(drug, isExpired);
    drug.benefit = Math.min(MAX_BENEFIT, Math.max(MIN_BENEFIT, drug.benefit));
    drug.expiresIn -= 1;
  }

  computeBenefit(drug, isExpired) {
    switch (drug.name) {
      case "Herbal Tea":
        return drug.benefit + (isExpired ? 2 : 1);

      case "Fervex":
        if (isExpired) return 0;
        if (drug.expiresIn <= 5) return drug.benefit + 3;
        if (drug.expiresIn <= 10) return drug.benefit + 2;
        return drug.benefit + 1;

      case "Dafalgan":
        return drug.benefit - (isExpired ? 4 : 2);

      default:
        return drug.benefit - (isExpired ? 2 : 1);
    }
  }
}
