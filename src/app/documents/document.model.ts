export class Document {
  constructor(
    public _id: string,
    public id: string,
    public name: string,
    public description: string,
    public url: string,
    public children: Document[] | null
  ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.children = children;
  }
}
