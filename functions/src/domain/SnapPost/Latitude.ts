export class Latitude {
  constructor(readonly value: number) {
    if (value < -90 || value > 90) {
      throw new Error("Latitude must be greater than or equal to -90 and less than or equal to 90.")
    }
  }
}
