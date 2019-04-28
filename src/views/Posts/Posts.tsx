import React, { Component } from 'react';
import Column from 'components/Column/Column';
import Post from './Post/Post';
import Row from 'components/Row/Row';
import Text from 'components/Text/Text';
import Space from 'components/Space/Space';
import { Post as PostModel } from 'models/Post';
import  ErrorBoundary from 'helpers/ErrorBoundary';
import { IStoreState } from 'models/IStoreState';
import { Dispatch } from 'redux';
import { PostActions, addPost, deletePost } from 'data/actions/post-actions';
import { connect } from 'react-redux';

export interface IPostsProps {
  posts: PostModel[];
  addPost: (post: PostModel) => void;
  deletePost: (postId: number) => void;
  children?: React.ReactNode;
}

export interface IPostsState { }

const mapStateToProps = (state: IStoreState) => ({ posts: state.posts || [] })

const mapDispatchToProps = (dispatch: Dispatch<PostActions>) => ({
  addPost: (post: PostModel) => dispatch(addPost(post)),
  deletePost: (postId: number) => dispatch(deletePost(postId))
})

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