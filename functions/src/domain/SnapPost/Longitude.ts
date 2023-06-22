export class Longitude {
  constructor(readonly value: number) {
    if (value < -180 || value > 180) {
      throw new Error("Longitude must be greater than or equal to -180 and less than or equal to 180.")
    }
  }
}
