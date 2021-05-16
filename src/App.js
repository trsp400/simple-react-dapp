import { useState, useCallback, useEffect } from "react";
import { ethers, providers } from "ethers";
import "./App.css";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greeterAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

function App() {
  const [greeting, setGreeting] = useState("");

  const requestAccount = useCallback(async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  }, []);

  const fetchGreeting = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      try {
        const data = await contract.greet();
        console.log("data => " + data);
      } catch (error) {
        console.log("error => " + error);
      }
    }
  }, []);

  const setGreetingValue = useCallback(async () => {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      setGreeting("");
      fetchGreeting();
    }
  }, [greeting]);

  useEffect(() => {
    requestAccount();
  }, [requestAccount]);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {greeting}
        <button onClick={() => fetchGreeting()}>Fetch Greeting</button>

        <input
          value={greeting}
          onChange={(event) => setGreeting(event?.target.value)}
          placeholder="Set greeting"
        />
        <button onClick={() => setGreetingValue(greeting)}>Set Greeting</button>
      </header>
    </div>
  );
}

export default App;
