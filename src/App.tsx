import { DynamicRoutes } from "@/components";
import {AuthContextProvider} from "@/context/authContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient


function App() {
    return (
        <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <main className="bg-light min-h-screen text-lg font-sans">
                <DynamicRoutes/>
            </main>
        </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;
