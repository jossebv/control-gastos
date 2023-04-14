import { useState } from "react";
import Mensaje from "./Mensaje";

function NuevoPresupuesto({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
}) {
    const [mensaje, setMensaje] = useState("");

    function handleSubmit(ev) {
        ev.preventDefault();
        const value = parseInt(presupuesto);

        if (isNaN(value) || value <= 0) {
            setMensaje("No es un presupuesto válido");
            setIsValidPresupuesto(false);

            return;
        }

        setMensaje("");
        setIsValidPresupuesto(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form
                action="submit"
                className="formulario"
                onSubmit={handleSubmit}
            >
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input
                        type="text"
                        className="nuevo-presupuesto"
                        placeholder="Añade tu Presupuesto"
                        id="presupuesto"
                        onChange={(ev) => {
                            setPresupuesto(ev.target.value);
                        }}
                        onClick={() => {
                            setPresupuesto("");
                        }}
                        value={presupuesto}
                    />
                </div>
                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    );
}

export default NuevoPresupuesto;
