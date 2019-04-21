import * as React from 'react';
import Column from 'components/Column/Column';
import Post from './Post/Post';
import Row from 'components/Row/Row';
import { posts } from 'data/repository';
import Text from 'components/Text/Text';

export interface PostsProps {
}

export interface PostsState {
}

class Posts extends React.Component<PostsProps, PostsState> {
  render() {
    return (
      <>
        <Text size="h3">Publicaciones</Text>

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
    )
  }
}

export default Posts;