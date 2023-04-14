import React from "react";
import Gasto from "./Gasto";

function ListadoGastos({
    gastos,
    setModal,
    setGastoEditar,
    eliminarGasto,
}) {
    return (
        <div className="listado-gastos contenedor">
            <h2>
                {gastos.length > 0 ? "Gastos" : "Aún no hay gastos que mostrar"}
            </h2>

            {gastos.map((gasto) => {
                return (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setModal={setModal}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                    />
                );
            })}
        </div>
    );
}

export default ListadoGastos;
