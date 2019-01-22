import * as React from 'react';
import Publication from './Publication.tsx/Publication';

export interface PublicationsProps {
}

export interface PublicationsState {
}

class Publications extends React.Component<PublicationsProps, PublicationsState> {
  public render() {

    return <>
      <h1>Publicaciones</h1>

      <div>
        <Publication 
          title="Primera" 
          content="fda" 
          publicationDate={new Date()} />
      </div>
    </>
  }
}

export default Publications;