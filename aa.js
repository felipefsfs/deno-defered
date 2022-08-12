const base_vals = "Two,Three,Four,Five,Six,Seven,Eight,Nine,Ten,Jack,Quenn,King,Ace".split(",");
const base_suits = "Clubs,Spades,Hearts,Diamonds".split(",");
const full_deck = base_suits.flatMap(suit => base_vals.map(val => `${val} of ${suit}`));

console.log(decks_count("a1,s,2,4,f,2,,d,e,e"))
console.log(decks_count("a1,s,2,4,f,2,Two of Clubs,d,e,e"))
console.log(decks_count(full_deck.join(',').concat(",", full_deck.join(','))))

function decks_count(str = "") {
    const all_cards = str.split(",").reduce((counter, card) => {
        counter[card] = (counter[card] || 0) + 1;
        return counter;
    }, {});
    return full_deck.slice(0).reduce((min, card, _, arr) => {
        const single_count = all_cards[card];
        if (single_count === undefined) {
            arr.splice(1);
            return 0;
        }
        return single_count < min ? single_count : min;
    }, Number.POSITIVE_INFINITY);
}

function decks_count2(str = "") {
    const all_cards = str.split(",").reduce((counter, card) => {
        counter[card] = (counter[card] || 0) + 1;
        return counter;
    }, {});

    let min = Number.POSITIVE_INFINITY;
    for (card of full_deck) {
        const single_count = all_cards[card];
        if (single_count === undefined) {
            return 0;
        }
        if (single_count < min) {
            min = single_count;
        } 
    }
    return min;
}

function decks_count3(str = "") {
    const all_cards = str.split(",").reduce((counter, card) => {
        counter[card] = (counter[card] || 0) + 1;
        return counter;
    }, {});

    return count_minimun(all_cards);
}

function count_minimun(cards_count = {}, card_index = 0, min = Number.POSITIVE_INFINITY) {
    const card = full_deck[card_index];
    if (card === undefined) {
        return min;
    }
    const single_count = cards_count[card];
    if (single_count === undefined) {
        return 0;
    }
    if (single_count < min) {
        return count_minimun(cards_count, card_index + 1, single_count);
    } 
    return count_minimun(cards_count, card_index + 1, min);
}