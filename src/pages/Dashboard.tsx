import { useContext } from "react";
import authContext from "@/context/authContext"
import { Button } from "@/components";
import { logout } from "@/services/Api";

function Dashboard() {
  const {user} = useContext(authContext)

  const onLogout = () => {
    logout().then(() => window.location.reload())
  }

  return (
    <div>
        <h1>Welcome {user?.name}</h1>
        <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}

export default Dashboard