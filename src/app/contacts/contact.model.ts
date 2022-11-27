export class Contact {
    constructor(
        public _id: string,
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public imageUrl: string,
        public group: Contact[] | null
        ) {
            this._id = _id;
            this.id = id;
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.imageUrl = imageUrl;
            this.group = group;
          }
}
