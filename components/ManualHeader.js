import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =
        useMoralis()
    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
            // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
        }
    }, [isWeb3Enabled])
    // no array, run on every render
    // empty array, run once
    // dependency array, run when the stuff in it changesan

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`)
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])
    return (
        <div>
            <button
                onClick={async () => {
                    // await walletModal.connect()
                    const ret = await enableWeb3()
                    if (typeof ret !== "undefined") {
                        // depends on what button they picked
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                            // window.localStorage.setItem("connected", "walletconnect")
                        }
                    }
                }}
                disabled={isWeb3EnableLoading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            >
                Connect
            </button>
            This is header
        </div>
    )
}