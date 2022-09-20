import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const URL = "https://api.exchangerate.host/latest"
  const [total, setTotal] = useState(0);
  const [eur, setEur] = useState(0);
  const [eurRate, setEurRate] = useState(0);

  useEffect(()=>{
    updateRate();
  },[]);

  function updateRate(){
    console.log('rates updated');
    axios.get(URL).then((res) => {
      setEurRate(res.data.rates.GBP);
    }).catch(e => {console.log(e.text)});

  }

  function calculateTotal(e){
    e.preventDefault();
    setTotal(eur * eurRate);
  }

  return (
    <div id='container'>
      <form onSubmit={calculateTotal}>
        <div>
          <label>Eur</label>&nbsp;
          <input type='number' step='0.01' value={eur} onChange={(e)=>setEur(e.target.value)}></input>&nbsp;
          <output>{eurRate}</output>
        </div>
        <div>
          <label>GBP</label>&nbsp;
          <output>{total.toFixed(2)} Eur</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
      
    </div>
  );
}

export default App;
