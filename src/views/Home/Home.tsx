import * as React from 'react';
import Text from 'components/Text/Text';

interface HomeProps {
}

export const Home: React.SFC<HomeProps> = (props) => {
  return <>
    <Text size="h3">Inicio</Text>

    <p>
      Esta página es varias cosas a la vez: una demotración de mi ego de programador web, un lugar donde creo y uso mis propios controles visuales en ReactJS y un diario relativamente personal de mi vida.
    </p>

    <br />

    <b>¿Dónde hay más?</b>

    <p>
      ¿Quieres ver más de lo que hay en esta ruta? Hay muchas más esperando a ser presionadas en el <i>Sidebar</i>, y quién sabe si alguna otra más se encuentre escondida dentro de alguna ruta superficial, encontrándose entre las que están anidadas.
    </p>
  </>;
};