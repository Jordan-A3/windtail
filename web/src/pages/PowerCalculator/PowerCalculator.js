import React, { useState, useEffect } from 'react';

import { api_back } from '../../services/api';

import './calculator.css'

function Calculator() {
  const [vi, setVi] = useState("")
  const [vn, setVn] = useState("")
  const [vf, setVf] = useState("")
  const [pn, setPn] = useState("")

  const [power, setpower] = useState([])

  const windSpeed = JSON.parse(localStorage.getItem('windSpeed'))

  async function handleCalculate(){
    const data = {
      Vi: vi,
      Vn: vn,
      Vf: vf,
      Pn: pn,
      Vv: windSpeed
    }

    await api_back.post('power-calculator', data)
      .then(response => {
        setpower(response.data)
      })
  }

  return (
      <div className="Calculator">
        <div className='form-power' >
          <h2>Verifique aqui a curva de potencia do seu aerogerador</h2>
          <section>
            <span><b>Velocidade inicial: </b></span>
            <input 
              placeholder='Velocidade inicial'
              onChange={e => setVi(parseFloat(e.target.value))}
            />
          </section>

          <section>
            <span><b>Velocidade nominal: </b></span>
            <input 
              placeholder='Velocidade nominal'
              onChange={e => setVn(parseFloat(e.target.value))}
            />
          </section>

          <section>
            <span><b>Velocidade final: </b></span>
            <input 
              placeholder='Velocidade final'
              onChange={e => setVf(parseFloat(e.target.value))}
            />
          </section>

          <section>
            <span><b>Potência nominal: </b></span>
            <input 
              placeholder='Potência nominal'
              onChange={e => setPn(parseFloat(e.target.value))}
            />
            <button onClick={handleCalculate} >Calcular</button>
          </section>
          
         </div>
         <div className='graphics'>
            {
              power.length !== 0 ?
              (
                <>
                  <img 
                    src="http://localhost:5000/graphic/power2d.png"
                    alt="Grafico de probabilidade de densidade"
                    width="400" height="266"
                  />
                  <img 
                    src="http://localhost:5000/graphic/power3d.png"
                    alt="Grafico de probabilidade de densidade"
                    width="400" height="266"
                  />
                </>
                
              ) : 
                <>
                  <img 
                    src="https://www.neoenergia.com/pt-br/sala-de-imprensa/noticias/PublishingImages/sala-de-imprensa/parque-eolico-catite.png"
                    alt="Aerogeradores"
                    width="400"
                  />
                  <img 
                    src="https://www.ofitexto.com.br/wp-content/uploads/2019/09/parque-e%C3%B3lico-central-e%C3%B3lica-aerogeradores-sobreequipamento-1024x573.jpg"
                    alt="Aerogeradores"
                    width="400"
                  />
                </>
              
            }
            
         </div>
      </div>
   );
}
export default Calculator;
