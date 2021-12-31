//when deploying to rinkeby, run: npx hardhat run scripts/deploy.js --network rinkeby
//when deploying to local blockchain after first running "npx run node" in NEW terminal window..
//run: npx hardhat run scripts/deploy.js --network localhost

const main = async () => {
    //to deploy something, need wallet address
    //hardhat does this automatically in the background
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    //deployer.address is the address associated with the private key in the .env file
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await waveContract.deployed();
    console.log("WavePortal address: ", waveContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();