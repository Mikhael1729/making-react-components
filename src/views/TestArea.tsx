import * as React from 'react';
import * as styles from "styles/TestArea.module.css"
import LabelCheckbox from 'components/LabelCheckbox';
import { TestModel } from 'models/TestModel';
import MultiSelect from 'components/MultiSelect';
import Label from 'components/Label';
import Select from 'react-select/lib/Select';
import { string } from 'prop-types';

export interface TestAreaProps {
}

export interface TestAreaState {
  checked: boolean;
  selectedOption: any;
}

export default class TestArea extends React.Component<TestAreaProps, TestAreaState> {
  options: Array<{value: string, label: string}> = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
   
  constructor(props: TestAreaProps) {
    super(props);

    this.state = {
      checked: false,
      selectedOption: "",
    }
  }

  handlerCheckbox = () => this.setState(prevState => ({ checked: !prevState.checked }));

  onCheckbox = (checked: boolean, data: TestModel, text: string) => { 
    console.log(checked, data, text);
  }

  handleChange = (selectedOption: any) => this.setState({ selectedOption })

  render() {
    const data = new TestModel({
      name: "Pruebita",
      quantity: 4,
      things: ["one", "two", "three"]
    });

    return <>
      <h1>Testing my MultiSelect</h1>

      <b>Mikhael</b>
      <br />
      <MultiSelect defaultText="Escoge" onChange={this.onCheckbox}>
        <LabelCheckbox data={data} children="Elemento 1" />
        <LabelCheckbox data={data} children="Elemento 2" />
        <LabelCheckbox data={data} children="Elemento 3" />
        <LabelCheckbox data={data} children="Elemento 4" />
        <LabelCheckbox data={data} children="Elemento 5" />
        <LabelCheckbox data={data} children="Elemento 6" />
      </MultiSelect>
    </>
  }
}
