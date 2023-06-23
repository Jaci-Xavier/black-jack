export async function drawCards() {
  const resp = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  const data = await resp.json();
  const deckId = data.deck_id;
  const resp2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
  const data2 = await resp2.json();
  return data2;
}
