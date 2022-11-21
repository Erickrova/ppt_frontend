import Image from "next/image"
import { useEffect, useState } from "react"
import Elegir from "../components/Elegir"
import LayoutSala from "../components/LayoutSala"
import useApp from "../hooks/useApp"
import io from "socket.io-client"
import axios from "axios"
import {useRouter} from "next/router"

let socket

const Sala = () => {

    const {
      handleContador,
      resultado,
      handleStartRound,
      usuario,
      contrincante,
      setContrincante,
      sala,
      eligiendo,
      eleccion,
      eleccionContrincante,
      setEleccionContrincante,
      setGanador,
      ganador,
      ronda,
      handleRevancha,
      enPartida,
      setEnPartida,
      rondasUsuario,
      setRondasUsuario,
      rondasContrincante,
      setRondasContrincante,
      handleRound
    } = useApp();

    const router = useRouter()

    const handleIniciarRonda = () =>{
        if(usuario && contrincante){
            socket.emit("startRound",{ronda:ronda+1,sala})
        }
    }
    const handlerevancha = () =>{
        socket.emit("revancha",sala)
    }
    const handleAbandonarSala = () =>{
      router.push("/")   
    }
    const filtrar = (data)=>{
        const otherUser = data.filter(user => user != usuario)[0]
        if(otherUser){
            setContrincante(otherUser)
        }

    }
    
    useEffect(()=>{
        socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)
        socket.emit("onRoom",{usuario,sala})
    },[])
    useEffect(()=>{
        socket.on("usersOn",data =>{
            if(sala){
                filtrar(data)
            }
        })
        socket.on("leaveUser",data=>{
            if(data.includes(usuario)){
                setContrincante("")
                handlerevancha()
            }
        })
        socket.on("roundStarted",(data)=>{
            handleStartRound(data)
        })
        socket.on("startingRevancha",()=>{
            handleRevancha()
        })
        socket.on("contando",data =>{
            handleContador(data)
        })
        socket.on("eleccion",data =>{
            if(data.usuario != usuario){
                setEleccionContrincante(data.eleccion)
            }
        })
    })
    useEffect(()=>{
        if(ronda === 3){
            setEnPartida(false)
        }else{
            setEnPartida(true)
        }
    },[ronda])
    useEffect(()=>{
        if(resultado){
            if(eleccion == "piedra" && eleccionContrincante == "papel"){
                setGanador(contrincante)
                setRondasContrincante(rondasContrincante+1)
            }else if(eleccion == "piedra" && eleccionContrincante == "tijeras"){
                setGanador(usuario)
                setRondasUsuario(rondasUsuario+1)
            }else if(eleccion == "papel" && eleccionContrincante == "piedra"){
                setGanador(usuario)
                setRondasUsuario(rondasUsuario+1)
            }else if(eleccion == "papel" && eleccionContrincante == "tijeras"){
                setGanador(contrincante)
                setRondasContrincante(rondasContrincante+1)
            }else if(eleccion == "tijeras" && eleccionContrincante == "piedra"){
                setGanador(contrincante)
                setRondasContrincante(rondasContrincante+1)
            }else if(eleccion == "tijeras" && eleccionContrincante == "papel"){
                setGanador(usuario)
                setRondasUsuario(rondasUsuario+1)
            }else if (eleccion && !eleccionContrincante){
                setGanador(usuario)
                setRondasUsuario(rondasUsuario+1)
            }else if (!eleccion && eleccionContrincante){
                setGanador(contrincante)
                setRondasContrincante(rondasContrincante+1)
            }else{
                handleRound(ronda-1)
            }
        }
    },[resultado])
    useEffect(()=>{
        if(rondasContrincante === 2 || rondasUsuario === 2){
            setEnPartida(false)
        }
    },[rondasContrincante,rondasUsuario])

    
    if (!sala) {router.push("/")}
  return (
        <LayoutSala >
            {eligiendo ? (
                <Elegir />
            ) : (

                <div
                    
                className="w-full h-full flex justify-evenly items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">{usuario}</h2>
                    <p className={`text-white ${eleccion ? "mb-16":""}`}>Rondas Ganadas {rondasUsuario}/3</p>
                    {eleccion ? (
                        <Image className={`rounded-full ${ganador == usuario ? " animate-bounce":""}`} height={200} width={200} src={`/img/${eleccion}.png`} priority  alt="eleccion" />
                    ):null}
                    </div>
                <div>
                    {enPartida ? (
                        <button
                        onClick={handleIniciarRonda}
                        className="text-xl font-bold text-white px-3 py-2 bg-amber-600 hover:bg-amber-700   rounded-md">
                        Iniciar Ronda
                        </button>
                    ):(
                        <div className="flex gap-2 flex-col">        
                            <button
                            onClick={handlerevancha}
                            className="text-xl font-bold text-white px-3 py-2 bg-green-600 hover:bg-green-700   rounded-md">
                            Revancha
                            </button>
                            <button
                            onClick={handleAbandonarSala}
                            className="text-xl font-bold text-white px-3 py-2 bg-red-600 hover:bg-red-700   rounded-md">
                            Abandonar Sala
                            </button>
                        </div>
                    )}
                 
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{contrincante ? contrincante : "Esperando rival..."}</h2>
                    <p className={`text-white ${eleccionContrincante ? "mb-16":""}`}>Rondas Ganadas {rondasContrincante}/3</p>
                    {eleccionContrincante ? (
                        <Image className={`rounded-full ${ganador == contrincante ? " animate-bounce":""}`} height={200} width={200} src={`/img/${eleccionContrincante}.png`} priority  alt="eleccion" />
                    ):null}
                </div>
            </div>
                )}
        </LayoutSala>
  
  )
}

export default Sala