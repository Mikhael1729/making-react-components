import { init } from "helpers/init";

export class Memory {
  id: number;
  title: string;
  content: string;
  dateTime: Date;

  constructor(data: Partial<Memory>) {
    init<Partial<Memory>>(this, data);
  }
}