import Column from 'components/Column/Column';
import Post from './Post/Post';
import React, { Component } from 'react';
import Row from 'components/Row/Row';
import Space from 'components/Space/Space';
import Text from 'components/Text/Text';
import { Post as PostModel } from 'models/Post';

export interface IPostsProps {
  posts: PostModel[];
  addPost: (post: PostModel) => void;
  deletePost: (postId: number) => void;
  children?: React.ReactNode;
}

export interface IPostsState { }

class Posts extends Component<IPostsProps, IPostsState> {
  render() {
    const { posts } = this.props;
  
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