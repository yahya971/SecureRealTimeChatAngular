export class Message {
  id: number;
  content: string;
  senderId: number;
  destinationId: number;
  seen:boolean

  constructor(id:number, content:string, senderId:number, destinationId:number) {
    this.id = id;
    this.content = content;
    this.senderId = senderId;
    this.destinationId = destinationId;
    this.seen = false;
  }

}

