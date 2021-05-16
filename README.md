# Simple React Dapp

## This is a simple dapp with two solidity contracts, that uses hardhat for deploy

# Steps to run in development

- You must have metamask to run it

- Install dependencies
```
 yarn
```

- Start the nodes
```
 npx hardhat node
```

- Deploy the app
```
 npx hardhat run scripts/deploy.js --network localhost
```

- You'll see something like:
```
Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Token deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### Greeter and Token are the two contracts i've built with solidity

- After deploying, copy the two adresses given and paste them into the App.js file, here (lines 8 and 9):
```
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
```

### After pasting those adresses, you can test the greeter contract by clicking on the Greeter option:

![image](https://user-images.githubusercontent.com/53320507/118412761-32382780-b672-11eb-890f-98447b5008a1.png)

### And just type the greeting to update it on the localhost blockchain

![image](https://user-images.githubusercontent.com/53320507/118412808-6ad80100-b672-11eb-8457-171f3e8443ce.png)


### Select the localhost network on metamask. Now, you need to get one of the private key from the hardhat node and use it to import an account on Metamask. Get the Token address you got after deploying the contracts and click on Add Token, paste the token address and add it.

### After that you can use the simple token on localhost.

