import {createContext, useEffect, useState} from "react"

const AppContext = createContext()

const AppProvider = ({children,setGlobalRoom,setglobaluser}) =>{

    const [usuario,setUsuario] = useState("")
    const [salaObtenida,setSalaObtenida] = useState({})
    const [contrincante,setContrincante] = useState("")
    const [contador,setContador] = useState(5)
    const [enPartida,setEnPartida] = useState(true)
    const [ronda,setRonda] = useState(0)
    const [rondasUsuario,setRondasUsuario] = useState(0)
    const [rondasContrincante,setRondasContrincante] = useState(0)
    const [sala,setSala] = useState("")
    const [resultado,setResultado] = useState(false)
    const [eligiendo,setEligiendo] = useState(false)
    const [eleccion,setEleccion] = useState("")
    const [eleccionContrincante,setEleccionContrincante] = useState("")
    const [ganador,setGanador] = useState("")

    const handleRevancha = () =>{
        setContador(5)
        setRonda(0)
        setEligiendo(0)
        setEleccion("")
        setEleccionContrincante("")
        setEnPartida(true)
        setResultado(false)
        setRondasContrincante(0)
        setRondasUsuario(0)
        setGanador("")
    }
    const handleStartRound = (data) =>{
        setGanador("")
        setEleccion("")
        setEleccionContrincante("")
        setResultado(false)
        setEligiendo(true)
        setRonda(data)
    }
    const handleRound = data =>{
        setRonda(data)
    }
    const handleContador = (data) =>{
        if(data >= 0){
            setContador(data)
        }else
        {
            setResultado(true)
            setEligiendo(false)
            setContador(5)
        }
    }
    useEffect(()=>{
        setglobaluser(usuario)
        setGlobalRoom(sala)
    },[usuario])


    return(
        <AppContext.Provider
            value={{
                contador,
                setContador,
                enPartida,
                setEnPartida,
                ronda,
                setRonda,
                sala,
                setSala,
                resultado,
                setResultado,
                eligiendo,
                setEligiendo,
                eleccion,
                setEleccion,
                eleccionContrincante,
                setEleccionContrincante,
                ganador,
                setGanador,
                handleRevancha,
                usuario,
                setUsuario,
                contrincante,
                setContrincante,
                salaObtenida,
                setSalaObtenida,
                handleStartRound,
                handleContador,
                rondasUsuario,
                setRondasUsuario,
                rondasContrincante,
                setRondasContrincante,
                handleRound
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export{
    AppProvider
}

export default AppContext


