export class Message {
    constructor(public id: number,
                public subject: string,
                public msgText: string,
                public sender: string,)
                {
                    this.id = id;
                    this.subject = subject;
                    this.msgText = msgText;
                    this.sender = sender;
                }
}
