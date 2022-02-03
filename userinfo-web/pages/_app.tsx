import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"


function getLibrary(provider: any) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function UserInfoApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}
