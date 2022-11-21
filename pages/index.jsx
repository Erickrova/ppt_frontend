import Link from "next/link";
import LayoutInicio from "../components/LayoutInicio";


export default function Home() {
  return (
    <LayoutInicio>
      <div className="my-4 grid gap-2 justify-items-center justify-center">
        <Link href="/crear-sala" className="text-xl w-full text-center text-white px-3 py-2 from-slate-800 to-slate-900 bg-gradient-to-r rounded-md font-bold hover:bg-gradient-to-l cursor-pointer">Crear Sala</Link>
        <Link href="/unirse-sala" className="text-xl w-full text-center text-white px-3 py-2 from-slate-800 to-slate-900 bg-gradient-to-r rounded-md font-bold hover:bg-gradient-to-l cursor-pointer">Unirme a Sala</Link>
      </div>
    </LayoutInicio>
    
  )
}
