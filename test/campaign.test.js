const assert = require("assert")
const Web3 = require("web3")
const ganache = require("ganache-cli")
const web3 = new Web3(ganache.provider())
const compiledFactory = require("../ethereum/build/CampaignFactory.json")
const compiledCampaign = require("../ethereum/build/Campaign.json")

let campaign
let campaignAddress
let accounts
let factory

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({data: compiledFactory.bytecode})
      .send({gas: "1000000", from: accounts[0]})
  await factory.methods.createCampaign("100").send({from: accounts[0], gas: "1000000"})
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)
})








































