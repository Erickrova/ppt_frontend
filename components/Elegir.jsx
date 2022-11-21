import Image from "next/image"
import useApp from "../hooks/useApp"
import Contador from "./Contador"
import io from "socket.io-client"
import { useEffect } from "react"

let socket

const Elegir = () => {
   

    const {setEleccion,usuario,sala} = useApp()

    const handleEleccion = (op)=>{
        const piedra = document.body.querySelector("#piedra")
        const papel = document.body.querySelector("#papel")
        const tijeras = document.body.querySelector("#tijeras")
        if(op == "piedra"){
            piedra.className = "h-96 w-96 rounded-full"
            papel.className = "hidden"
            tijeras.className = "hidden"
        }else if (op == "papel"){
            papel.className = "h-96 w-96 rounded-full"
            piedra.className = "hidden"
            tijeras.className = "hidden"
        }else if (op == "tijeras"){
            tijeras.className = "h-96 w-96 rounded-full"
            papel.className = "hidden"
            piedra.className = "hidden"
        }
        socket.emit("eligiendo",{eleccion:op,usuario,sala})
        setEleccion(op)
    }

    useEffect(()=>{
        socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)
    },[])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <Contador />
        <div className="flex justify-between items-center gap-2">
            <button onClick={()=> handleEleccion("piedra")}>
                <Image id="piedra" className="rounded-full" height={200} width={200} src="/img/piedra.png" priority  alt="piedra" />
            </button>
            <button  onClick={()=> handleEleccion("papel")}>
                <Image id="papel" className="rounded-full" height={200} width={200} src="/img/papel.png" priority  alt="piedra" />
            </button>
            <button onClick={()=> handleEleccion("tijeras")}>
                <Image id="tijeras" className="rounded-full" height={200} width={200} src="/img/tijeras.png"  priority  alt="piedra" />
            </button>
        </div>
    </div>
  )
}

export default Elegir