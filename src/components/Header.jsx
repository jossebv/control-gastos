import ControPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

function Header({
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto,
    gastado,
    setGastos
}) {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {!isValidPresupuesto? (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            ):(
              <ControPresupuesto presupuesto={presupuesto} gastado={gastado} setPresupuesto={setPresupuesto} setGastos={setGastos} setIsValidPresupuesto={setIsValidPresupuesto}/>
            )}

        </header>
    );
}

export default Header;
