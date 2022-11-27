export class Message {
  constructor(
    public _id: string,
    public id: string,
    public subject: string,
    public msgText: string,
    public sender: string
  ) {
    this._id = _id;
    this.id = id;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }
}
