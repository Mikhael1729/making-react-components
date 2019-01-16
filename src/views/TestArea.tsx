import * as React from 'react';
import LabelCheckbox from 'components/LabelCheckbox';
import { TestModel } from 'models/TestModel';
import MultiSelect from 'components/MultiSelect';

export interface TestAreaProps {
  data: TestModel[]
}

export interface TestAreaState {
  checked: boolean;
  selected: TestModel[];
}

export default class TestArea extends React.Component<TestAreaProps, TestAreaState> {
  constructor(props: TestAreaProps) {
    super(props);

    this.state = {
      checked: false,
      selected: []
    }
  }

  private handleChange = (checked: boolean, data: TestModel, text: string) => {
    this.setState(prevState => {
      const selected = [...prevState.selected];
      const index = selected.findIndex(s => s.name === text);

      if (checked && index < 0)
        selected.push(data)
      else
        selected.splice(index, 1);

      return { selected };
    })
  };

  private isChecked = (item: TestModel): boolean => (
    this.state.selected.find(s => s.name === item.name) ? true : false
  )

  render() {
    return <>
      <h1>Testing my MultiSelect</h1>

      <b>Mikhael</b>
      <br />

      <MultiSelect defaultText="Escoge" onChange={this.handleChange}>
        {this.props.data.map((item, index) => (
          <LabelCheckbox
            key={index}
            data={item}
            checked={this.isChecked(item)}>{item.name}</LabelCheckbox>)
        )}
      </MultiSelect>
    </>
  }
}
