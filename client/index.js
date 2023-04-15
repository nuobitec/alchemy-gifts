const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  

  //get root 
  const tree = new MerkleTree(niceList)
  const root = tree.getRoot()

  //get an item in nice list (leaf)
  const leaf = 'Katrina Hansen'
  const index= niceList.findIndex(n => n === leaf)
  //get the proof
  const proof = tree.getProof(index);
  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    leaf:  leaf, 
    root:  root,
  });

  console.log({ gift });
}

main();