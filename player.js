export default function createPlayer (playerName,marker) {
  return {
    playerInfo(){
      return {playerName, marker};
    }
  };
}
