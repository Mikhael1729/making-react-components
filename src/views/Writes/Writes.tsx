import { Button } from 'components/Button';
import React, { Component } from 'react';
import { Space } from 'components/Space';
import { Text } from 'components/Text';
import { TextField } from 'components/TextField';
import { Form } from 'components/Form';
import { Memory } from 'models/Post';

export interface IWritesProps {
  createMemory: (memory: Memory) => void;
  children: never;
}

export interface IWritesState {
  title: string;
  body: string;
}

class Writes extends Component<IWritesProps, IWritesState> {
  static state: IWritesState = {
    title: "",
    body: ""
  };

  private changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    this.setState({ title: e.target.value });

  private changeBody = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    this.setState({ body: e.target.value });

  private saveMemory = () => {
    const memory = new Memory({
      title: this.state.title,
      content: this.state.body,
      dateTime: new Date(),
    });

    this.props.createMemory(memory);
  }

  render() {
    const { createMemory } = this.props;

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