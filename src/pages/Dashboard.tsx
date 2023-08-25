import { useContext } from "react";
import authContext from "@/context/authContext"

function Dashboard() {
  const {user} = useContext(authContext)
  return (
    <div>
        <h1>Welcome {user?.name}</h1>
    </div>
  )
}

export default Dashboard