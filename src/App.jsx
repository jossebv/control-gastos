import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";

function App() {
    const [presupuesto, setPresupuesto] = useState(0);
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [gastado, setGastado] = useState(0);
    const [modal, setModal] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState("")
    const [carga, setCarga] = useState(true)

    useEffect(()=>{
        const loadedPresupuesto = Number(localStorage.getItem('presupuesto'))
        const loadedGastos = JSON.parse(localStorage.getItem('gastos'))
        setPresupuesto(loadedPresupuesto)
        setGastos(loadedGastos)
        if (loadedPresupuesto) {
            setIsValidPresupuesto(true)
        }
    },[])
    
    useEffect(() => {
        const sumaCostes = gastos.reduce((acc, elem) => elem.cantidad + acc, 0);
        setGastado(sumaCostes);

        if (!carga) {
            localStorage.setItem('gastos', JSON.stringify(gastos))
        }

        return () => {
            setCarga(false)
        }
    }, [gastos]);

    useEffect(()=>{
        if (!carga) {
            localStorage.setItem('presupuesto', presupuesto)
        }
        return ()=>{
            setCarga(false)
        }
    },[presupuesto])

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
                setGastos={setGastos}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros setFiltro={setFiltro}/>
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            setModal={setModal}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
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
