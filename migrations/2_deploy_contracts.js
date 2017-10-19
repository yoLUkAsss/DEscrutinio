//var Contract = artifacts.require("./path/to/Contract.sol");
let SimpleStorage = artifacts.require("./SimpleStorage.sol")
let UserCRUD = artifacts.require("./UserCRUD.sol")
let UserElectionCRUD = artifacts.require("./UserElectionCRUD.sol")
let MesaCRUD = artifacts.require("./MesaCRUD.sol")
let Election = artifacts.require("./Election.sol")
let DistritoCRUD = artifacts.require("./DistritoCRUD.sol")
let Distrito = artifacts.require("./Distrito.sol")

/**
 * Example of use :
 *
 * deployer.deploy(Contract);
 *
 */
module.exports = (deployer) => {
  deployer.deploy(SimpleStorage)
  deployer.deploy([UserCRUD, MesaCRUD, Distrito])
  deployer.deploy(UserElectionCRUD).then( () => {
    return deployer.deploy(DistritoCRUD)
  }).then( () => {
    return deployer.deploy(Election, UserElectionCRUD.address, DistritoCRUD.address)
  })
  // deployer.deploy(UserCRUD);
  // deployer.deploy(UserElectionCRUD);
  // deployer.deploy(MesaCRUD);
  // deployer.deploy(Election);
}
