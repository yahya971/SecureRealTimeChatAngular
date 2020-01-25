export class Message {
  id: number;
  content: string;
  senderId: string;
  destinationId: string;
  seen:boolean

  constructor(id:number, content:string, senderId:string, destinationId:string) {
    this.id = id;
    this.content = content;
    this.senderId = senderId;
    this.destinationId = destinationId;
    this.seen = false;
  }

}

