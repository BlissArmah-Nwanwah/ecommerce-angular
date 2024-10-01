export class User {
  constructor(
    private token: string
  ) {}

  get tokens(){
      return this.token
  }

}
