const { ethers, BigNumber } = require("ethers");

const DAITokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";


async function main() {
  const buildbearProvider=new ethers.providers.JsonRpcProvider("https://ethindia.backend.buildbear.io/node/Illegal_Luminara_Unduli_f158cbf5")

  const myWallet = new ethers.Signer(process.env.MY_PRIVATEKEY);
  const approvedAccount= new ethers.Signer(process.env.APPROVED_ACCOUNT_PRIVATEKEY);
  const relayer= new ethers.Signer(process.env.RELAYER_PRIVATEKEY);

  const domainName = "BuildBear" // put your token name 
  const domainVersion = "1" 
  const chainId = 1 // this is the chain ID of the chain you are using
  const contractAddress = deployedContractAddress

  const DAITokenConrtact = await hre.ethers.getContractAt("token", DAITokenAddress, deployerSigner);
  const nonce = await DAITokenConrtact.nonces(myWallet.address)
  const currentBlockTimeStamp = (await hre.ethers.provider.getBlock("latest")).timestamp;
  const expiry = (BigNumber.from(currentBlockTimeStamp).add(BigNumber.from(100)));
  const allowed = true;

  // pending from here

  const domain = {
    name: domainName,
    version: domainVersion,
    verifyingContract: contractAddress,
    chainId
  }

  const types = {
    Permit: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'deadline',
        type: 'uint256',
      },
    ]
  }

  const values = {
    owner: ownerSigner.address,
    spender: spenderSigner.address,
    value: value,
    nonce: nonce,
    deadline: deadline
  }

  const signature = await ownerSigner._signTypedData(domain, types, values);
  console.log(signature);

  const splitSig = (signature) => {
    // splits the signature to r, s, and v values.
    const pureSig = signature.replace("0x", "")

    const r = new Buffer.from(pureSig.substring(0, 64), 'hex')
    const s = new Buffer.from(pureSig.substring(64, 128), 'hex')
    const v = new Buffer.from((parseInt(pureSig.substring(128, 130), 16)).toString());
    console.log(`r: 0x${r.toString('hex')}, s: 0x${s.toString('hex')}, v: ${v}`)  
  }

  splitSig(signature);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
