import * as React from "react"
import "styles/views/Mockup.css";

const Mockup: React.SFC<any> = () => {
  return <>
    <h1>¿Probando cajitas?</h1>

    <label className="container">
      <input type="checkbox" />
      <span className="checkmark"></span>
      <span>Hello</span>
    </label>
  </>
}

export default Mockup;