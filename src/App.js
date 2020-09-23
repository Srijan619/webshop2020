import React, { useState, useEffect } from 'react';
import AddPhone from './addPhone';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const url="http://127.0.0.1:8000/phone/api/";
  useEffect(() => {
    (
      async function () {

        const response = await fetch(url)
        const data = await response.json();
        setData(data);
        setLoading(false);
      }
      

    )();
  }, [data])

  return (
    <div style={style.root}>
      {
        loading ? <div>...Loading</div> :
          <div>
            <AddPhone></AddPhone>
            {data.map(item => (
              <div  key={item.id}>
                <ul> {item.name} {item.number}</ul>
              </div>
            )
            )}
          </div>
      }
    </div>
  );
}

export default App;

const style = {
  root: {
    padding: 5
  }
}