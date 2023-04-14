import React from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import Ahorro from "../img/icono_ahorro.svg";
import Casa from "../img/icono_casa.svg";
import Comida from "../img/icono_comida.svg";
import Gastos from "../img/icono_gastos.svg";
import Ocio from "../img/icono_ocio.svg";
import Salud from "../img/icono_salud.svg";
import Suscripciones from "../img/icono_suscripciones.svg";

function Gasto({ gasto, setModal, setGastoEditar, eliminarGasto }) {
    function formattedFecha(fecha) {
        const date = new Date(fecha);
        return date.toLocaleDateString("es-ES");
    }

    function editarHandler() {
        setModal(true);
        setGastoEditar(gasto);
    }

    function eliminarHandler() {
        if (confirm("Estás seguro que quieres eliminar el gasto?")) {
            eliminarGasto(gasto.id)
        }
    }

    function formatearDinero(number) {
        return number.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
        });
    }

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={editarHandler}>Editar</SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={eliminarHandler}>Delete</SwipeAction>
        </TrailingActions>
    );

    const diccionarioIconos = {
        ahorro: Ahorro,
        casa: Casa,
        comida: Comida,
        gastos: Gastos,
        ocio: Ocio,
        salud: Salud,
        suscripciones: Suscripciones,
    };

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img
                            src={diccionarioIconos[gasto.categoria]}
                            alt="Imagen categoría"
                        />

                        <div className="descripcion-gasto">
                            <p className="categoria">{gasto.categoria}</p>
                            <p className="nombre-gasto">{gasto.nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el:{" "}
                                <span>{formattedFecha(gasto.fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">
                        {" "}
                        {formatearDinero(Number(gasto.cantidad))}
                    </p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default Gasto;
