import { useState, useEffect } from "react";

function Filtros({setFiltro}) {
    function filtroCallback(e) {
        setFiltro(e.target.value)
    }

    return (
        <div className="filtros sombra contenedor">
            <form onChange={filtroCallback}>
                <div className="campo">
                    <label htmlFor="filtro">Filtrar Gastos</label>
                    <select id="filtro">
                        <option value="">Todos</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default Filtros;
