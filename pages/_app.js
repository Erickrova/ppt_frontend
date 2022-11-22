import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AppProvider } from '../context/AppProvider'
import '../styles/globals.css'
import io from "socket.io-client"
import axios from "axios"



let socket;

function MyApp({ Component, pageProps }) {

  const [onRoom,setOnRoom] = useState(false)
  const [globalUser,setGlobalUser] = useState("")
  const [globalRoom,setGlobalRoom] = useState("")

  const router = useRouter()
  useEffect(()=>{
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL)
  },[])

  useEffect(()=>{
    if(router.pathname == "/sala" && !onRoom){
      setOnRoom(true)
      // console.log(globalUser," entró a la sala")
    }
    if(router.pathname != "/sala" && onRoom){
      const deleteuser = async () =>{
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/deleteuser/${globalRoom}/${globalUser}`)
        } catch (error) {
        }
      }
      deleteuser()
      socket.emit("leaveroom",{usuario:globalUser,sala:globalRoom})
      // console.log(globalUser," abandonó la sala")
      setOnRoom(false)
    }
  },[router.pathname])


  return (
    <AppProvider setGlobalRoom={setGlobalRoom} setglobaluser={setGlobalUser} >
      <Component {...pageProps} />
    </AppProvider>
  
  )
}

export default MyApp
