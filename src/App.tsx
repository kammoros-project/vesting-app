import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Auth from "./components/pages/Auth";
import Header from "./components/layout/Header";

export default function App() {

  const address = useAddress()

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      { !address && <Auth />}
    </div>
  )
}
