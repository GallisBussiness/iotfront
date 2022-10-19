import { useAuthUser } from "react-auth-kit"
import { useQuery} from "react-query"
import { Route, Routes } from "react-router-dom"
import { getAuth } from "../services/authservice"
import { Navbar } from "./atomes/Navbar"
import Capteurs from "./Capteurs"
import Types from './Types'
import { Champs } from "./Champs"
import Cultures from "./Cultures"
import { Profil } from "./Profil"
import Users from "./Users"
import Noeud from "./Noeud"

const Dashboard = () => {

 
  const auth = useAuthUser()();
  const qk = ['auth',auth?.id]
  const {data} = useQuery(qk, () => getAuth(auth?.id), {
    stateTime: 100_000,
    refetchOnWindowFocus:false,
  })

  return (
    <div className="overflow-x-hidden">
    <Navbar />
     <Routes>
     <Route path="" element={<Profil auth={data} />} />
     <Route path="profil" element={<Profil auth={data}/>} />
     <Route path="capteurs" element={<Capteurs auth={data}/>} />
     <Route path="champs" element={<Champs auth={data}/>} />
     <Route path="cultures" element={<Cultures auth={data}/>} />
     <Route path="noeuds" element={<Noeud auth={data}/>} />
     <Route path="types" element={<Types auth={data}/>} />
     <Route path="users" element={<Users auth={data}/>} />
     </Routes>
    </div>
  )
}

export default Dashboard