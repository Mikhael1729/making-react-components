import Button from 'components/Button/Button';
import React, { Component } from 'react';
import Space from 'components/Space/Space';
import Text from 'components/Text/Text';
import TextField from 'components/TextField/TextField';
import Form from 'components/Form/Form';

export interface WritesProps {
}

export interface WritesState {
}

class Writes extends Component<WritesProps, WritesState> {
  public render() {
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
            block={true} />

          {/* Post body */}
          <TextField
            label="Cuerpo"
            rows={16}
            multiLine={true}
            color="default"
            placeholder="Puede suceder en cualquier momento."
            block={true} />

          {/* Save button */}
          <Button color="primary" type="outline">
            Guardar
          </Button>
        </Form>
      </>
    );
  }
}

export default Writes;