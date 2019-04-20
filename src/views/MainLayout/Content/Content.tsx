import * as React from 'react';
import { Content as Styles} from "./Content.module.scss";

interface ContentProps { }

const Content: React.FunctionComponent<ContentProps> = (props) => {
  return (
    <>
      <main className={Styles} style={{ marginLeft: "250px" }}>
        {props.children}
      </main>
    </>
  )
};

export default Content;