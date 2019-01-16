import * as React from 'react';
import TestArea from './TestArea';
import { TestModel } from 'models/TestModel';

class App extends React.Component {
  public render() {
    return (
      <main style={{ padding: "20px"}}>
        <TestArea data={[
          new TestModel({
            name: "Pruebita 1",
            quantity: 1,
            things: ["one"]
          }),
          new TestModel({
            name: "Pruebita 2",
            quantity: 2,
            things: ["one", "two"]
          }),
          new TestModel({
            name: "Pruebita 3",
            quantity: 3,
            things: ["one", "two", "three"]
          }),
        ]}/>
      </main>
    );
  }
}

export default App;
