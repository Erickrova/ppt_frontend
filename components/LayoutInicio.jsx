import { useEffect } from "react"
import useApp from "../hooks/useApp"
import Head from "next/head"

const LayoutInicio = ({children}) => {
  const {handleRevancha,setContrincante,setUsuario,setSala} = useApp()
  useEffect(()=>{
    handleRevancha()
    setContrincante("")
    setUsuario("")
    setSala("")
  },[])
  return (
    <>
      <Head>
        <title>Piedra Papel o Tijeras</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="juego de piedra papel o tijeras online" />
      </Head>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-8xl font-black breack-words text-center text-white md:w-96">Piedra Papel o Tijeras</h1>
          {children}
        </div>
      </div>
    </>
  )
}

export default LayoutInicio