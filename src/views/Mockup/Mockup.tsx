import * as React from "react"
import "./Mockup.css";
import Text from "components/Text/Text";
import Space from "components/Space/Space";

const Mockup: React.SFC<any> = () => {
  return <>
    <Text size="h3">¿Probando cajitas?</Text>

    <Space size={2}/>
    
    <label className="container">
      <input type="checkbox" />
      <span className="checkmark"></span>
      <span>Hello</span>
    </label>
  </>
}

export default Mockup;