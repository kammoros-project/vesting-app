import { useAddress } from "@thirdweb-dev/react";
import Auth from "./components/pages/Auth";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Footer from "./components/layout/Footer";

export default function App() {

  const address = useAddress()

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <Header />
        {address ? <Home /> : <Auth />}
      </div>
      <Footer />
    </div>
  )
}
