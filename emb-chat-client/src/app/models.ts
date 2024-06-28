export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public onlineStatus: boolean
  ) {}
}

export class KingDom {
  constructor(public id: number, public name: string) {}
}

export class File {
  constructor(
    public id: number,
    public fileName: string,
    public filePath: string
  ) {}
}

export class Message {
  constructor(
    public id: number,
    public senderId: number,
    public receiverId: number,
    public content: string | null,
    public file: File | null,
    public createdAt: string
  ) {}
}

export class UsersInKingDom {
  constructor(public kingdom: KingDom, public users: User[]) {}
}
