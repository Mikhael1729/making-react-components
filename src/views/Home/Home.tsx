import * as React from 'react';

interface HomeProps {
}

const Home: React.SFC<HomeProps> = (props) => {
  return <>
    <h1>Inicio</h1>

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

export default Home;