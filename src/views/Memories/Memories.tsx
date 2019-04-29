import { Column } from 'components/Column';
import { Memory } from './Memory';
import React, { Component } from 'react';
import { Row } from 'components/Row';
import { Space } from 'components/Space';
import { Text } from 'components/Text';
import { Memory as PostModel } from 'models/Post';

export interface IMemoriesProps {
  posts: PostModel[];
  addPost: (post: PostModel) => void;
  deletePost: (postId: number) => void;
  children?: React.ReactNode;
}

export interface IMemoriesState { }

export class Memories extends Component<IMemoriesProps, IMemoriesState> {
  render() {
    const { posts } = this.props;

    return (
      <>
        {/* Title */}
        <Text size="h3">Memorias</Text>

        <Space size={2} />

        {/* Posts */}
        <Row>
          {posts.map((post, index) => (
            <Column key={index} xs="12" lg="4" md="6" cssMargin={4}>
              <Memory
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