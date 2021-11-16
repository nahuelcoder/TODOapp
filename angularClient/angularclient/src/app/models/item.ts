export class Item {
    id: number | undefined;
    description: string = "";

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
