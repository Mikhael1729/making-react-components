import { init } from "helpers/init";

export class Post {
  title: string;
  content: string;
  dateTime: Date;

  constructor(data: Partial<Post>) {
    init<Partial<Post>>(this, data);
  }
}