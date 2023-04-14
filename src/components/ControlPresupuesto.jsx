import { useState } from "react";

function ControPresupuesto({ presupuesto, gastado}) {

    function formatearDinero(number){
        return number.toLocaleString('es-ES', {style:"currency", currency: "EUR"})
    }

    return (
        <div className="contenedor contenedor-presupuesto sombra dos-columnas">
            <div>
                <p>Grafica aquí</p>
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span>{formatearDinero(Number(presupuesto))}   
                </p>
                
                <p>
                    <span>Disponible: </span>{formatearDinero(Number(presupuesto) - gastado)}   
                </p>

                <p>
                    <span>Gastado: </span>{formatearDinero(Number(gastado))}   
                </p>
            </div>
        </div>
    );
}

export default ControPresupuesto;
