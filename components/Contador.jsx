import { useEffect, useState } from "react"
import useApp from "../hooks/useApp"
import io from "socket.io-client"

let socket

const Contador = () => {
    const {contador,sala} = useApp()

    useEffect(()=>{
        socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)
    },[])
    
    useEffect(()=>{
        setTimeout(()=>{
            if(contador >= 0){
                socket.emit("contador",{contador,sala})
            }
        },1000)
    },[contador])

    return (
    <h2 className="text-6xl text-center font-black text-white p-5"> {contador}... </h2>
  )
}

export default Contador