import React, { Component } from 'react';
import styles from './Memories.module.scss';
import { Memory } from './Memory';
import { Memory as MemoryModel } from 'models/Post';
import { Space } from 'components/Space';
import { Text } from 'components/Text';

export interface IMemoriesProps {
  posts: MemoryModel[];
  loadMemories: () => void;
  children: never;
}

export interface IMemoriesState { }

export class Memories extends Component<IMemoriesProps, IMemoriesState> {
  componentWillMount() {
    this.props.loadMemories()
  }

  render() {
    const { posts } = this.props;

    return (
      <>
        {/* Title */}
        <Text size="h3">Memorias</Text>

        <Space size={2} />

        {/* Posts */}
        <div className={styles.Memories}>
          {posts.map((post, i) => (
            <Memory
              key={i}
              title={post.title!}
              content={post.content!}
              publicationDate={post.dateTime!} />
          ))}
        </div>
      </>
    )
  }
}