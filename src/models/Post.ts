import { init } from "helpers/init";

export class Post {
  id: number;
  title: string;
  content: string;
  dateTime: Date;

  constructor(data: Partial<Post>) {
    init<Partial<Post>>(this, data);
  }
}