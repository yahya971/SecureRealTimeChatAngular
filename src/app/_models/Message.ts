export class Message {
  id: number;
  content: string;
  senderId: number;
  destinationId: number;

  constructor(id:number, content:string, senderId:number, destinationId:number) {
    this.id = id;
    this.content = content;
    this.senderId = senderId;
    this.destinationId = destinationId;
  }

}

