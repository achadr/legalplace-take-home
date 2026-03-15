# LegalPlace Take-Home Test Specification

You are a new developer in the Falcon team, and your first job is to add a feature to an old existing piece of code.

## System specifications

Hi and welcome to the team. We are in the future, and Falcon has extended its activities by opening a pharmacy. Your task is to add a new feature to our system so that we can begin distributing a new drug. First an introduction to our system:

- All drugs have an `expiresIn` value which denotes the number of days we have until the item expires.
- All drugs have a `benefit` value which denotes how powerful the drug is.
- At the end of each day our system lowers both values for every drug

But there is more:

- Once the expiration date has passed, Benefit degrades twice as fast.
- The Benefit of an item is never negative.
- "Herbal Tea" actually increases in Benefit the older it gets. Benefit increases twice as fast after the expiration date.
- The Benefit of an item is never more than 50.
- "Magic Pill" never expires nor decreases in Benefit.
- "Fervex", like Herbal Tea, increases in Benefit as its expiration date approaches. Benefit increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Benefit drops to 0 after the expiration date.

We have recently signed a supplier of "Dafalgan". This requires an update to our system:

- "Dafalgan" degrades in Benefit twice as fast as normal drugs.

## Instructions

- [ ] Create a clone from this repository
- [ ] Implement the required feature
- [ ] Push the clone to your own repository when satisfied
- [ ] Send us the link and tell us approximatively how much time you spent on this assignment

You are encouraged to refactor the existing code before adding your own, as you would do if this was a real task in real life. We strongly recommend that you write tests to help you during this process.

Feel free to make any changes to the `updateBenefitValue` method implementation and add any new code as long as everything still works correctly. However, do not break the public API of the `Drug` and `Pharmacy` classes, as those are used by other pieces of the software (you can add new methods though).

Please commit as frequently as possible to make the review easier.

We expect you to spend no more than 2 hours on this assignment. We value the quality of the end result, not how much time you have spent on it.

## Test

To make sure that you will not break anything in the existing code, we added the result of the simulation in the _output.json_ file. Make sure that your code is able to generate a file with identical content. You can generate a new file by running the following command:

```sh
yarn start
```

## What was done

### 1. Tests for existing behavior
Added comprehensive unit tests in `pharmacy.test.js` covering all drug rules and edge cases before touching any logic:
- Normal drugs: degradation, double degradation after expiry, benefit floor at 0
- Herbal Tea: benefit increase, double increase after expiry, cap at 50
- Magic Pill: never changes, even at expiresIn=0
- Fervex: all thresholds (>10, ≤10, ≤5 days), drop to 0 after expiry, cap at 50, boundary cases

### 2. Refactor
Rewrote `updateBenefitValue` in `pharmacy.js` for readability and maintainability:
- Extracted `updateDrug` and `computeBenefit` methods
- Replaced deeply nested `for` loop with `forEach` and a clean `switch` statement
- Introduced `isExpired` flag to unify benefit logic before/after expiry
- Centralized benefit clamping using `MAX_BENEFIT` and `MIN_BENEFIT` constants
- All 21 existing tests pass after refactor

### 3. Dafalgan
- Added tests for Dafalgan covering all cases and edge cases
- Implemented the rule: degrades benefit twice as fast as normal drugs (-2/day before expiry, -4/day after)
- Required only one new `case` in `computeBenefit` thanks to the refactor
- Dafalgan was intentionally not added to `index.js` to keep `output.json` identical as required by the assignment
