import React, { Component } from 'react';
import Column from 'components/Column/Column';
import Post from './Post/Post';
import Row from 'components/Row/Row';
import { posts } from 'data/repository';
import Text from 'components/Text/Text';
import Space from 'components/Space/Space';

export interface IPostsProps { }

export interface IPostsState { }

class Posts extends Component<IPostsProps, IPostsState> {
  render() {
    return (  
      <>
        {/* Title */}
        <Text size="h3">Publicaciones</Text>

        <Space size={2} />

        {/* Posts */}
        <Row>
          {posts.map((post, index) => (
            <Column key={index} xs="12" lg="4" md="6" cssMargin={4}>
              <Post
                title={post.title!}
                content={post.content!}
                publicationDate={post.dateTime!} />
            </Column>
          ))}
        </Row>
      </>
    )
  }
}

export default Posts;