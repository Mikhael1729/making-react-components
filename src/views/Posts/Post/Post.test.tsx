import * as React from "react";
import * as enzyme from "enzyme";
import Post from "./Post";
import styles from "./Post.module.scss";

it("<Post />", () => {
  // Mock.
  const PostMock = (
    <Post
      publicationDate={new Date()}
      title="I'm incredible"
      content="The content" />
  );

  // Component mounted in HTML.
  const post = enzyme.mount(PostMock);

  // Evaluating if the title span has the expected className.
  expect(styles.Title.includes(post.find("span").at(0).getDOMNode().className)).toBe(true);
})