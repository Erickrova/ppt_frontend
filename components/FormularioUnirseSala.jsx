import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "axios"
import useApp from "../hooks/useApp"
import Alerta from "./Alerta"

const FormularioUnirseSala = () => {
    const [nombre,setNombre] = useState("")
    const [codigo,setCodigo] = useState("")
    const [alerta,setAlerta] = useState("")

    const {setUsuario,setSala,setSalaObtenida} = useApp()

    const router = useRouter()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setUsuario(nombre)
        setSala(codigo)
        if([nombre,codigo].includes("")){
            setAlerta("Todos los campos son obligatorios")
            setTimeout(()=>{
                setAlerta("")
            },3000)
            return
        }
        try {
            const {data} = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/join/${codigo}/${nombre}`)
            setSalaObtenida(data)
            router.push("/sala")
           
        } catch (error) {
            // console.log(error.response?.data.msg)
            setAlerta(error?.response?.data?.msg)
            setTimeout(()=>{
                setAlerta("")
            },3000)
            
        }
    }



  return (
    <form  className="mt-4"
        onSubmit={handleSubmit}
    >
        {alerta ? <Alerta alerta={alerta} /> : null}
        <div className="mb-2">
            <label htmlFor="nombre" className="text-xl font-bold text-white">Nombre</label>
            <input 
            value={nombre}
            onChange={e=> setNombre(e.target.value)} 
            type="text" id="nombre" minLength={4} maxLength={20} className="w-full p-3 rounded-md" />
        </div>
        <div className="mb-2">
            <label htmlFor="codigo" className="text-xl font-bold text-white">Codigo Sala</label>
            <input
            value={codigo}
            onChange={e=> setCodigo(e.target.value)} 
             type="text" id="codigo" maxLength={20} className="w-full p-3 rounded-md" />
        </div>
        <input type="submit" value="Unirse a Sala" className="text-xl w-full text-center text-white px-3 py-2 from-slate-800 to-slate-900 bg-gradient-to-r rounded-md font-bold hover:bg-gradient-to-l cursor-pointer" />
    </form>
  )
}

export default FormularioUnirseSala