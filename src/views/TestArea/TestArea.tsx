import * as React from 'react';
import LabelCheckbox from 'components/LabelCheckbox';
import { TestModel } from 'models/TestModel';
import MultiSelect from 'components/MultiSelect';
import * as styles from "styles/views/TestArea.module.css";
import { assignedQualifications } from 'data/repository';

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

  private multipleSort<T>(a: T, b: T, properties: string[]) {
    const fields: Array<{ value1: any, value2: any }> = [];

    for (const property of properties)
      fields.push({
        value1: a[property],
        value2: b[property]
      });

    for (const field of fields) {
      if (field.value1 > field.value2)
        return 1;
      if (field.value1 < field.value2)
        return -1;
    }

    return 0;
  }

  render() {
    const qualifications = assignedQualifications();
    console.log("qualifications: -> ", qualifications);

    const desorganizado = [qualifications[0], qualifications[9], qualifications[5], qualifications[8], qualifications[1], qualifications[2]]
    console.log("desorganizado: -> ", desorganizado);

    const tmp = [...desorganizado];

    const organizado = tmp.sort((a, b) => this.multipleSort(a, b, ["subjectCode"]));
    console.log("organizado: -> ", organizado);

    return <>
      <h1>Área de pruebas</h1>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* MultiSelect */}
        <div>
          <h3>MultiSelect</h3>
          <MultiSelect defaultText="Escoge" onChange={this.handleChange}>
            {this.props.data.map((item, index) => (
              <LabelCheckbox
                key={index}
                data={item}
                checked={this.isChecked(item)}
                children={item.name}
                className={styles.LabelCheckbox} />)
            )}
          </MultiSelect>

          <br />
        </div>

        {/* Another */}
        <div>
          <div className={styles.Mydiv}>
            <div className={styles.Mydivheader}>Click here to move</div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
          </div>
        </div>
      </div>
    </>
  }
}
