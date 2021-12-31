//run with npx hardhat run scripts/run.js

const main = async () => {
    //deploy
    //to deploy something, need wallet address
    //hardhat does this automatically in the background
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //compile the contract & generate artifact abi file
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    //create a local ethereum network
    //deploy the contract
    //when the script ends, hardhat destroys the network
    //to spin up a local network that isn't destroyed, run "npx hardhat node" in a NEW terminal window
    //then run "npx hardhat run scripts/deploy.js --network localhost"
    // const waveContract = await waveContractFactory.deploy();
     //deploy contract with 0.1 ethers
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
      });
    //wait until contracty is deployed
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    // console.log("Contract deployed by:", owner.address)

    //get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    //get wave count
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    //send a few waves
    //owner waves (AKA address that deployed the contract)
    let waveTxn = await waveContract.wave('Hey Matt!');
    await waveTxn.wait();
    //randomPerson waves
    waveTxn = await waveContract.connect(randomPerson).wave('Yo Matt');
    await waveTxn.wait();

    //get all waves
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    //get contract balance again
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );
    

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();