import * as React from 'react';
import Post from "./Post/Post";
import { posts } from 'data/repository';
import Row from 'components/Row/Row';
import Column from 'components/Column/Column';

export interface PostsProps {
}

export interface PostsState {
}

class Posts extends React.Component<PostsProps, PostsState> {
  public render() {
    return <>
      <h1>Publicaciones</h1>

      <Row>
        {posts.map((p, index) => (
          <Column key={index} xs="12" lg="4" md="6" cssMargin={4}>
            <Post
              title={p.title!}
              content={p.content!}
              publicationDate={p.dateTime!} />
          </Column>
        ))}
      </Row>
    </>
  }
}

export default Posts;