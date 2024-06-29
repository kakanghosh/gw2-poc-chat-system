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

export class File {
  constructor(
    public id: number,
    public fileName: string,
    public filePath: string
  ) {}
}

export class ChatMessage {
  constructor(
    public id: number,
    public senderId: number,
    public receiverId: number,
    public content: string | null,
    public file: File | null,
    public createdAt: Date
  ) {}
}
