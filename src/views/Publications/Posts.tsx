import * as React from 'react';
import Post from "./Post/Post";

export interface PostsProps {
}

export interface PostsState {
}

class Posts extends React.Component<PostsProps, PostsState> {
  public render() {

    return <>
      <h1>Publicaciones</h1>

      <div>
        <Post 
          title="Primera" 
          content="fda" 
          publicationDate={new Date()} />
      </div>
    </>
  }
}

export default Posts;