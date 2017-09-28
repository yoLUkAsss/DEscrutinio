pragma solidity ^0.4.11;

contract Mesa {

    enum CategoriaParticipante {Fiscal, ApoderadoMesa}

    struct ParticipantData {
        CategoriaParticipante categoria;
        uint8 counts;
        bool finished;
        mapping (bytes32 => uint8) votes;
    }

    address owner;
    uint8 total;
    bytes32[] candidateList;
    bytes32[] participantList;
    mapping (bytes32 => ParticipantData) participantMap;

    // Constructor... msg.sender es duenio de mesa
    function Mesa(bytes32 apoderado, bytes32[] fiscales, bytes32[] inputCandidates, uint8 inputTotalVotes) public{
        owner = msg.sender;
        total = inputTotalVotes;
        participantList = fiscales;
        candidateList = inputCandidates;
        candidateList.push("Votos en Blanco");
        candidateList.push("Votos Inpugnados");
        candidateList.push("Votos Nulos");

        //para el apoderado
        participantMap[apoderado] = ParticipantData(CategoriaParticipante.ApoderadoMesa, 0, false);
        for ( uint k = 0; k<candidateList.length; k++ ) {
            participantMap[apoderado].votes[candidateList[k]] = 0;
        }
        //para cada fiscal
        for(uint i=0; i<participantList.length; i++){
          participantMap[participantList[i]] = ParticipantData(CategoriaParticipante.Fiscal, 0, false);
          //para cada candidato
          for(uint j = 0; j<candidateList.length; j++){
            participantMap[participantList[i]].votes[candidateList[j]] = 0;
          }
        }

        // al final se agrega al apoderado como un participante mas de la mesa
        participantList.push(apoderado);
    }

    function getCandidates() public constant returns (bytes32[]){
        return candidateList;
    }
    function getParticipantList() public constant returns (bytes32[]){
        return participantList;
    }

    function getParticipantDataCounts(bytes32 participant) public constant returns (uint8){
        return participantMap[participant].counts;
    }

    function getParticipantVotesForACandidate(bytes32 participant, bytes32 candidate) public constant returns (bytes32, uint8) {
        if (isValidParticipant(participant) && isValidCandidate(candidate)) {
            return (candidate, participantMap[participant].votes[candidate]);
        } else {
            return ('', 0);
        }
    }

    function isValidCandidate(bytes32 candidate) public constant returns (bool){
      for(uint i=0; i < candidateList.length; i++){
        if(candidate == candidateList[i]){
          return true;
        }
      }
      return false;
    }

    /**
     * Es participante valido en el contexto de esta mesa
     */
    function isValidParticipant(bytes32 participant) public constant returns (bool){
      for(uint i=0; i < participantList.length; i++){
        if(participant == participantList[i]){
          return true;
        }
      }
      return false;
    }

    function loadVotesForParticipant(bytes32 participant, bytes32 candidato, uint8 votos) public {
      if(!isValidParticipant(participant) || !isValidCandidate(candidato)) revert();
      participantMap[participant].votes[candidato] = votos;
    }

    function isApoderadoDeMesa(bytes32 participant) public constant returns (bool) {
        return isCategory(participant, CategoriaParticipante.ApoderadoMesa);
    }

    function isFiscal(bytes32 participant) public constant returns (bool) {
        return isCategory(participant, CategoriaParticipante.Fiscal);
    }

    function isCategory(bytes32 participant, CategoriaParticipante category) internal constant returns (bool) {
        return isValidParticipant(participant) && participantMap[participant].categoria == category;
    }

    function destroy(address parent) {
        selfdestruct(parent);
    }

    //latest functions added
    function setFiscal(bytes32 fiscal) public{
        SetRole(msg.sender, fiscal);
    }

    function setPresidenteDeMesa(bytes32 presidente) public{
        SetRole(msg.sender, presidente);
    }
    function setVicePresidenteDeMesa(bytes32 vicepresidente) public{
        SetRole(msg.sender, vicepresidente);
    }
    event SetRole(address indexed userAddress, bytes32 fiscal);

}
