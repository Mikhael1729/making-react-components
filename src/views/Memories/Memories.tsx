import { Column } from 'components/Column';
import { Memory } from './Memory';
import React, { Component } from 'react';
import { Row } from 'components/Row';
import { Space } from 'components/Space';
import { Text } from 'components/Text';
import { Memory as MemoryModel } from 'models/Post';

export interface IMemoriesProps {
  posts: MemoryModel[];
  addPost: (post: MemoryModel) => void;
  deletePost: (postId: number) => void;
  children?: React.ReactNode;
}

export interface IMemoriesState { }

export class Memories extends Component<IMemoriesProps, IMemoriesState> {
  componentWillMount() {
    this.loadPosts();
  }

  private loadPosts = async () => {
    const response = await fetch("https://localhost:5001/api/memory");
    const memories = await response.json() as MemoryModel[];

    console.log('memories -->', memories);
  }
  
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