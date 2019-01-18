import * as React from "react";
import { RouteComponentProps, Route } from "react-router";
import { Link } from "react-router-dom";

const Part1 = () => <h3>Parte 1</h3>
const Part2 = () => <h3>Parte 2</h3>
const Part3 = ({ match }: { match: any }) => {
  console.log(match);
  
 return <h3>Parte 3 {match.params.id}</h3>
}

export interface NestedRoutesProps extends RouteComponentProps { }

const NestedRoutes: React.SFC<NestedRoutesProps> = (props) => {
  const { match } = props;

  console.log(match)
  return <>
    <h1>Nested routes</h1>

    <ul>
      <li>
        <Link to={`${match.url}/part1`}>Parte 1</Link>
      </li>
      <li>
        <Link to={`${match.url}/part2`}>Parte 2</Link>
      </li>
      <li>
        <Link to={`${match.url}/part3`}>Parte 3</Link>
      </li>
    </ul>

    <div>
      <Route path={`${match.path}/:id`} component={Part3} />
      <Route
        exact={true}
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  </>
}

export default NestedRoutes;