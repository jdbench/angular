export class Contact {
    constructor(public id: number,
                public name: string,
                public email: string,
                public phone: string,
                public imageUrl: string,
                public group: Array<string> | null){
                    this.id = id;
                    this.name = name;
                    this.email = email;
                    this.phone = phone;
                    this.imageUrl = imageUrl;
                    this.group = group;
                }
}
