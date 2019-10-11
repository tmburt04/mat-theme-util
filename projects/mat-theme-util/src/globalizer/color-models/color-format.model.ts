class Hex {
  constructor(private str: string) {}

  parse(): string {
    return this.str;
  }
}

class HSL {
  constructor(public h?: number, public s?: number, public l?: number) {}

  parse(): string {
    return `hsl(${this.h}, ${this.s}, ${this.l})`;
  }
}

class RGB {
  constructor(public r?: number, public g?: number, public b?: number) {}

  parse(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

export { RGB, HSL, Hex };
