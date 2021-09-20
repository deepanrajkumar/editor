import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckApis = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const testData = axios
      .get("http://localhost:5000/list")
      .then((list) => setList(list.data))
      .catch(console.error);
    return () => {
      testData;
    };
  }, []);

  return (
    <div>
      <h2>Api response</h2>
      {console.log(`testDiv`, list)}
      <pre>
        <code>{JSON.stringify(list, null, 2)}</code>
      </pre>
    </div>
  );
};

export default CheckApis;
