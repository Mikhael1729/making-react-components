import { Button } from 'components/Button';
import React, { Component } from 'react';
import { Space } from 'components/Space';
import { Text } from 'components/Text';
import { TextField } from 'components/TextField';
import { Form } from 'components/Form';
import { Memory } from 'models/Post';

export interface IWritesProps {
  deleteMemoryAsync: (id: number) => void;
  createMemoryAsync: (memory: Memory) => void;
  children: never;
}

export interface IWritesState {
  title: string;
  body: string;
}

class Writes extends Component<IWritesProps, IWritesState> {
  constructor(props: IWritesProps) {
    super(props);

    this.state = {
      body: "",
      title: ""
    };
  }

  componentWillMount() {
    this.props.deleteMemoryAsync(1);
  }

  private changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    this.setState({ title: e.target.value });

  private changeBody = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    this.setState({ body: e.target.value });

  private titleIsValid = () => this.state.title.length > 0;

  private contentIsValid = () => this.state.body.length > 0;

  private saveMemory = () => {
    const formIsValid = this.titleIsValid() && this.contentIsValid();

    if (formIsValid) {
      const memory = new Memory({
        title: this.state.title,
        content: this.state.body,
        dateTime: new Date(),
      });

      this.props.createMemoryAsync(memory);
    }
  }

  render() {
    return (
      <>
        <Text size="h3">Escribe</Text>

        <Space size={2} />

        <Form>
          {/* Post title */}
          <TextField
            label="Título"
            color="default"
            placeholder="Un día increíble..."
            onChange={this.changeTitle}
            block={true} />

          {/* Post body */}
          <TextField
            label="Cuerpo"
            rows={16}
            multiLine={true}
            color="default"
            placeholder="Puede suceder en cualquier momento."
            onChange={this.changeBody}
            block={true} />

          {/* Save button */}
          <Button color="primary" type="outline" onClick={this.saveMemory}>
            Guardar
          </Button>
        </Form>
      </>
    );
  }
}

export default Writes;