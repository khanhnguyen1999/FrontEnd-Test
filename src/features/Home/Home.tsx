import React, { useState } from 'react';

// components
import BarChart from 'components/ReCharts/BarChart';
import Button from '@material-ui/core/Button';

function Home() {
  const [count, setCount] = useState<any>(1);
  return (
    <div>
      <BarChart />
      <br />
      <h3>Demo react error boundary</h3>
      {count}
      <hr />
      <Button variant="outlined" color="secondary" onClick={() => {
        setCount({})
      }}>
        Click to test error boundary
      </Button>
    </div>
  )
}

export default Home
