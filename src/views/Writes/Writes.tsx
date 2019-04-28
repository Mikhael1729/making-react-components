import * as React from 'react';
import Text from 'components/Text/Text';
import TextField from 'components/TextField/TextField';
import Space from 'components/Space/Space';

export interface WritesProps {
}

export interface WritesState {
}

class Writes extends React.Component<WritesProps, WritesState> {
  public render() {
    return (
      <>
        <Text size="h3">Escribe</Text>

        <Space size={2} />

        <TextField label="Hola" color="default" placeholder="Hellodf" />
      </>
    );
  }
}

export default Writes;