class Soldier {
  constructor(name, numPlayer) {
    this.name = name;
    this.numPlayer = numPlayer;
    this.health = 100;
    this.strength = 10;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(strength) {
    this.health -= strength;
  }
}
