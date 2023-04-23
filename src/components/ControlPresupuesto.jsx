import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ControPresupuesto({ presupuesto, gastado,setPresupuesto,setGastos,setIsValidPresupuesto }) {

    function formatearDinero(number){
        return number.toLocaleString('es-ES', {style:"currency", currency: "EUR"})
    }

    function percentage() {
        return ((gastado / presupuesto) * 100)
    }

    function resetearApp() {
        setPresupuesto(0)
        setGastos([])
        setIsValidPresupuesto(false)
    }

    return (
        <div className="contenedor contenedor-presupuesto sombra dos-columnas">
            <div>
                <CircularProgressbar value={percentage()} styles={buildStyles({pathColor: '#3b82f6', trailColor: '#f5f5f5'})} text={`${percentage()}% Gastado`} />
            </div>
            <div className="contenido-presupuesto">
                <button className='reset-app' type='button' onClick={resetearApp}>Resetear App</button>
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
