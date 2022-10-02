export class Document {
    constructor(public id: number,
                public name: string,
                public description: string,
                public url: string,
                public children: Array<object> | null)
                {
                    this.id = id;
                    this.name = name;
                    this.description = description;
                    this.url = url;
                    this.children = children;
                }
}
