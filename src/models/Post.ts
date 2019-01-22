import { init } from "helpers/init";

export class Post {
  title?: string;
  content?: string;
  dateTime?: Date;

  constructor(data: Post) {
    init<Post>(this, data);
  }
}