import { useState, useCallback, useEffect } from "react";
import { ethers, providers } from "ethers";
import "./App.css";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

const greeterAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  const [greeting, setGreeting] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);

  const [selectedContract, setSelectedContract] = useState(null);

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
  }, [greeting, fetchGreeting, requestAccount]);

  const getTokenBalance = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);

      setBalance(parseFloat(balance));
      console.log(parseFloat(balance));
    }
  }, []);

  const sendCoins = useCallback(async () => {
    setSuccessMessage(false);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

      try {
        const transaction = await contract.transfer(
          userAccount,
          parseFloat(amount)
        );
        await transaction.wait();
        console.log(`${amount} coins successfully sent to ${userAccount}`);
        setError(false);
        setSuccessMessage(
          `${amount} coins successfully sent to ${userAccount}`
        );
      } catch (error) {
        setError(error);
      }
    }
  }, [amount, requestAccount, userAccount]);

  useEffect(() => {
    requestAccount();
    getTokenBalance();
  }, [requestAccount, getTokenBalance]);

  // useEffect(() => {
  //   setTimeout(() => setSuccessMessage(false), 5000);
  // }, [successMessage]);

  const returnContractBySelection = (contract) => {
    switch (contract) {
      case "greeter":
        return (
          <div className="main">
            {greeting}
            <button onClick={() => fetchGreeting()}>Fetch Greeting</button>

            <input
              value={greeting}
              onChange={(event) => setGreeting(event?.target.value)}
              placeholder="Set greeting"
            />
            <button onClick={() => setGreetingValue(greeting)}>
              Set Greeting
            </button>

            <button onClick={() => setSelectedContract(null)}>Go back</button>
          </div>
        );
      case "token":
        return (
          <div className="main">
            <h3>
              Balance <b>{balance}</b> TRT
            </h3>
            <button onClick={() => getTokenBalance()}>Get Balance</button>

            <input
              value={userAccount}
              onChange={(event) => setUserAccount(event?.target.value)}
              placeholder="Account to send"
            />
            <input
              value={amount}
              onChange={(event) => setAmount(event?.target.value)}
              placeholder="Amount"
            />

            <button
              disabled={!amount || !userAccount}
              onClick={() => sendCoins()}
            >
              {amount && userAccount ? "Send coins" : "Type a valid amount"}
            </button>

            {error ? (
              <span>{error?.data?.message || error?.message}</span>
            ) : null}

            {successMessage ? <h6>{successMessage}</h6> : null}

            <button onClick={() => setSelectedContract(null)}>Go back</button>
          </div>
        );
      default:
        break;
    }
  };

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
        {selectedContract ? (
          returnContractBySelection(selectedContract)
        ) : (
          <div className="choose_contract">
            <h2>Choose the contract</h2>
            <button onClick={() => setSelectedContract("greeter")}>
              Greeter
            </button>

            <button onClick={() => setSelectedContract("token")}>Token</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
