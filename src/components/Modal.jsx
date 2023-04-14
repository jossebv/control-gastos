import { useEffect, useState } from "react";
import Cerrar from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

function Modal({
    setModal,
    gastos,
    setGastos,
    presupuesto,
    gastado,
    gastoEditar,
    setGastoEditar,
}) {
    const [animar, setAnimar] = useState(false);
    const [gasto, setGasto] = useState({
        nombre: "",
        cantidad: "",
        categoria: "",
    });
    const [mensaje, setMensaje] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (Object.values(gasto).includes("")) {
            setMensaje("Debes rellenar todos los campos");

            return;
        }

        if (gasto.cantidad <= 0) {
            setMensaje("La cantidad debe ser mayor que cero");

            return;
        }

        const precioActual = gastoEditar.cantidad | 0

        if (gasto.cantidad + gastado - precioActual > presupuesto) {
            setMensaje("El gasto excede el presupuesto");

            return;
        }

        setMensaje("");
        setModal(false)
        
        const nuevoGasto = { ...gasto, fecha: Date.now() };

        if (Object.keys(gastoEditar).length > 0) {
            const gastosEditados = gastos.map((el) => {
                return el.id === gastoEditar.id ? {...nuevoGasto, id: gastoEditar.id} : el;
            });

            setGastos(gastosEditados);
            setGastoEditar({})
            return
        }

        setGastos(gastos.concat({...nuevoGasto, id: generateId()}));
    }

    useEffect(() => {
        if (Object.keys(gastoEditar).length !== 0) {
            setGasto(gastoEditar);
        }

        setTimeout(() => {
            setAnimar(true);
        }, 100);
    }, []);

    function generateId() {
        return (
            Date.now().toString(36) + Math.random().toString(36).substring(2)
        );
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={Cerrar}
                    alt="Icono Cerrar"
                    onClick={() => {
                        setModal(false);
                        setGastoEditar({});
                    }}
                />
            </div>
            <form
                action="submit"
                className={`formulario ${animar ? "animar" : ""} `}
            >
                <legend>
                    {Object.keys(gastoEditar).length === 0
                        ? "Nuevo Gasto"
                        : "Editar Gasto"}
                </legend>

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        id="nombre"
                        value={gasto.nombre}
                        onChange={(e) =>
                            setGasto({ ...gasto, nombre: e.target.value })
                        }
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        placeholder="Añade la cantidad del gasto: ej. 300"
                        id="cantidad"
                        value={gasto.cantidad}
                        onChange={(ev) => {
                            setGasto({
                                ...gasto,
                                cantidad: Number(ev.target.value),
                            });
                        }}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={gasto.categoria}
                        onChange={(ev) => {
                            setGasto({ ...gasto, categoria: ev.target.value });
                        }}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={
                        Object.keys(gastoEditar).length === 0
                            ? "Añadir Gasto"
                            : "Editar Gasto"
                    }
                    onClick={handleSubmit}
                />
            </form>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
    );
}

export default Modal;
