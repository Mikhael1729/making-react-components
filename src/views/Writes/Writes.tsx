import React, { Component } from 'react';
import Text from 'components/Text/Text';
import TextField from 'components/TextField/TextField';
import Space from 'components/Space/Space';
import Row from 'components/Row/Row';
import Column from 'components/Column/Column';

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

        <TextField
          label="Hola"
          rows={3}
          multiLine={true}
          color="default"
          placeholder="Hellodf"
          block={true}/>
      </>
    );
  }
}

export default Writes;