import React, { Component } from 'react';
import Text from 'components/Text/Text';
import TextField from 'components/TextField/TextField';
import Space from 'components/Space/Space';
import Row from 'components/Row/Row';
import Column from 'components/Column/Column';
import Button from 'components/Button/Button';

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

        {/* Post title */}
        <TextField
          label="Título"
          color="default"
          placeholder="Un día increíble..."
          block={true}/>

        <Space />

        {/* Post body */}
        <TextField
          label="Cuerpo"
          rows={16}
          multiLine={true}
          color="default"
          placeholder="Puede suceder en cualquier momento."
          block={true}/>

        <Space />

        <Button color="primary" type="outline">
          Guardar
        </Button>

      </>
    );
  }
}

export default Writes;