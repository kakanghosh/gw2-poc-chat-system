export class WelcomeMessage {
  constructor(public title: string, public description: string) {}
}

export class Kingdom {
  constructor(public id: number, public name: string) {}
}

export class User {
  constructor(
    public kingdom: Kingdom,
    public id: number,
    public firstName: string,
    public lastName: string,
    public onlineStatus: boolean
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
