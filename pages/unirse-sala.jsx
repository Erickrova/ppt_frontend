import Link from "next/link"
import FormularioUnirseSala from "../components/FormularioUnirseSala"
import LayoutInicio from "../components/LayoutInicio"


const unirsesala = () => {
  
  return (
    <LayoutInicio>
      <Link href="/" className="text-xl my-4 ml-0 mr-auto text-center text-white px-3 py-2 from-slate-800 to-slate-900 bg-gradient-to-r rounded-md font-bold hover:bg-gradient-to-l cursor-pointer"> Volver </Link>
        <FormularioUnirseSala />
    </LayoutInicio>
  )
}

export default unirsesala