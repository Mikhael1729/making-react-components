
export class TestModel {
  name?: string = undefined;
  quantity?: number = undefined;
  things?: string[] = undefined;

  constructor(data: TestModel) {
    this.name = data.name;
    this.quantity = data.quantity;
    this.things = data.things;
  }
}