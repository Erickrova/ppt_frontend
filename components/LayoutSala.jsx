import useApp from "../hooks/useApp"
import Head from "next/head"

const LayoutSala = ({children}) => {
  const {ronda,sala} = useApp()

  return (
    <>
      <Head>
        <title>Piedra Papel o Tijeras</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="juego de piedra papel o tijeras online" />
      </Head>
      <div className="h-screen overflow-hidden">
          <header>
              <div className="w-full flex justify-evenly items-center p-4">
                  <h2 className="text-4xl font-bold text-white">Sala {sala}</h2>
                  <h2 className="text-4xl font-bold text-white">Ronda {ronda}/3</h2>
              </div>
          </header>
          {children}
      </div>
    </>
  )
}

export default LayoutSala