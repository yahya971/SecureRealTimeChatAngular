export class Message {
  id: number;
  content: string;
  senderId: string;
  destinationId: string;
  seen: boolean;
  encrypted: boolean;
  senderName: string;
  recieverName:string

  constructor(id: number, content: string, senderId: string, destinationId: string, encrypted: boolean, senderName: string,recieverName:string) {
    this.id = id;
    this.content = content;
    this.senderId = senderId;
    this.destinationId = destinationId;
    this.seen = false;
    this.encrypted = encrypted;
    this.senderName = senderName;
    this.recieverName = recieverName
  }

}

