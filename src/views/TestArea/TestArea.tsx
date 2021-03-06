import * as React from 'react';
import styles from './TestArea.module.scss';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { LabelCheckbox } from 'components/LabelCheckbox';
import { MultiSelect } from 'components/MultiSelect';
import { Text } from 'components/Text';
import { assignedQualifications } from 'data/repository';
import { TestModel } from 'models/TestModel';

export interface ITestAreaProps {
  data: TestModel[]
}

export interface ITestAreaState {
  checked: boolean;
  selected: TestModel[];
  position: { one: number, two: number, three: number, fourth: number }
}

export class TestArea extends React.Component<ITestAreaProps, ITestAreaState> {
  private drawableDivTitleRef: any = React.createRef();
  private drawableDivRef: any = React.createRef();

  readonly state: ITestAreaState = {
    checked: false,
    selected: [],
    position: {
      one: 0,
      three: 0,
      fourth: 0,
      two: 0
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

  onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    const drawableDiv = this.drawableDivRef.current;
    const drawableDivTitle = this.drawableDivTitleRef.current;

    if (drawableDivTitle)
      drawableDivTitle.onmousedown = dragMouseDown;
    else
      drawableDiv.onmousedown = dragMouseDown;

    function dragMouseDown(event: any) {
      event = event || window.event;
      event.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = event.clientX;
      pos4 = event.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(event: any) {
      event = event || window.event;
      event.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - event.clientX;
      pos2 = pos4 - event.clientY;
      pos3 = event.clientX;
      pos4 = event.clientY;
      // set the element's new position:
      drawableDiv.style.top = (drawableDiv.offsetTop - pos2) + "px";
      drawableDiv.style.left = (drawableDiv.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


  render() {
    const qualifications = assignedQualifications();
    // console.log("qualifications: -> ", qualifications);

    const desorganizado = [qualifications[0], qualifications[9], qualifications[5], qualifications[8], qualifications[1], qualifications[2]]
    // console.log("desorganizado: -> ", desorganizado);

    const tmp = [...desorganizado];

    const organizado = tmp.sort((a, b) => this.multipleSort(a, b, ["subjectCode"]));
    // console.log("organizado: -> ", organizado);

    return <>
      <Text size="h3">Área de pruebas</Text>

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

        {/* Button */}
        <div style={{ marginBottom: "50px" }}>
          <h3>Este es mi botón</h3>
          <Button type="filled" color="secondary">
            <Icon name="icon-codepen" />
            <Text>Hello world</Text>
          </Button>
        </div>

        <div style={{ marginBottom: "50px" }}>
          <h3>¡¡Texto!!</h3>
          <Text size="h3" weight="bold" color="warning">
            Hello World
          </Text>
        </div>

        <div style={{ marginBottom: "50px" }}>
          <div className={styles.Test}>
            Here
          </div>
        </div>

        {/* Another */}
        <div>
          <div className={styles.Mydiv} ref={this.drawableDivRef}>
            <div
              className={styles.Mydivheader}
              onMouseDown={this.onMouseDown}
              ref={this.drawableDivTitleRef}>Click here to move</div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
          </div>
        </div>
      </div>
    </>
  }
}
