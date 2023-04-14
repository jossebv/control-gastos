import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function App() {
    const [presupuesto, setPresupuesto] = useState(0);
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [gastado, setGastado] = useState(0);
    const [modal, setModal] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [gastoEditar, setGastoEditar] = useState({});

    
    useEffect(() => {
        const sumaCostes = gastos.reduce((acc, elem) => elem.cantidad + acc, 0);
        setGastado(sumaCostes);
    }, [gastos]);
    
    function eliminarGasto(idEliminar){
        setGastos(gastos.filter((el)=>el.id !== idEliminar))
    }

    return (
        <div className={modal ? "fijar" : ""}>
            <Header
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                gastado={gastado}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            setModal={setModal}
                            eliminarGasto={eliminarGasto}
                        />
                    </main>

                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Icono Nuevo Gasto"
                            onClick={()=>setModal(true)}
                        />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    gastado={gastado}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    );
}

export default App;
