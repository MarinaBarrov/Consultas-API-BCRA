import React, { useEffect, useState } from "react";

const urlApi = "https://api.bcra.gob.ar/estadisticas/v1/PrincipalesVariables";

export const Form = () => {
  const [variable, setVariable] = useState([]);
  const [request, setRequest] = useState({
    type: 0,
    since: "",
    until: "",
  });

  useEffect(() => {
    async function getApi() {
      const resp = await fetch(urlApi);
      const data = await resp.json();
      setVariable(data.results);
    }
    getApi();
  }, []);

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
          <label htmlFor="dropdown">Seleccione una variable</label>
          <select
            id="dropdown"
            onChange={(e) => setRequest({ ...request, type: e.target.value })}
          >
            {variable.map((item) => (
              <option value={item.idVariable}>{item.descripcion}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="datePicker">Desde:</label>
          <input
            type="date"
            id="datePicker"
            value={request.since}
            onChange={(e) => setRequest({ ...request, since: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="datePicker1">Hasta:</label>
          <input
            type="date"
            id="datePicker1"
            value={request.until}
            onChange={(e) => setRequest({ ...request, until: e.target.value })}
          />
        </div>
        <button>Consultar</button>
      </form>
    </div>
  );
};
