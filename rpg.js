const char = { 
    health: 1000,
    level: 1,
    alive: true,
    factions: []
}
const melee_char = { ...char, max_range: 2 };
const ranged_char = { ...char, max_range: 20 };


function deal_damage(value, distance, action_char = {}, target_char = {}) {
    if (target_char === action_char) {
        return target_char;
    }
    if (common_element(target_char.factions, action_char.factions)) {
        return target_char;
    }
    if (action_char.max_range < distance) {
        return target_char;
    }
    const levels_diff = target_char.level - action_char.level;
    if (levels_diff >= 5) {
        return _deal_damage(value * 0.5, target_char);
    }
    if (levels_diff <= -5) {
        return _deal_damage(value * 1.5, target_char);
    }
    return _deal_damage(value, target_char);
}
function deal_damage_to_prop(value, distance, action_char = {}, prop = {}) {
    if (action_char.max_range < distance) {
        return prop;
    }
    return _deal_damage(value, prop);
}
function _deal_damage(value, target_char = {}) {
    const health = (target_char.health || 0) - value;
    if (health <= 0) {
        if (target_char.alive) {
            return { ...target_char, alive: false, health: 0 };
        }
        return { ...target_char, destroyed: true, health: 0 };
    }
    return { ...target_char, health };
}
function heal_damage(value, action_char = {}, target_char = {}) {
    if (!common_element(target_char.factions, action_char.factions)) {
        if (target_char !== action_char) {
            return target_char;
        }
    }
    if (!target_char.alive) {
        return target_char;
    }
    return _heal_damage(value, target_char);
}

function _heal_damage(value, target_char = {}) {
    const health = (target_char.health || 0) + value;
    return { ...target_char, health: Math.min(1000, health) };
}

function join_faction(faction, target_char = {}) {
    const set = new Set(target_char.factions.concat(faction));
    return {...target_char, factions: [...set]};
}
function leave_faction(faction, target_char = {}) {
    const set = new Set(target_char.factions);
    set.delete(faction);
    return {...target_char, factions: [...set]};
}

function common_element(arr1 = [], arr2 = []) {
    return arr1.some(v => arr2.includes(v));
}

let c1 = {...melee_char,  factions: ["z"], level: 20};
let c2 = {...ranged_char,  factions: ["y"], level: 10};
console.log(c1, c2);
c2=deal_damage(100, 10, c1,c2);
console.log(c1, c2);
c2=deal_damage(999, 2, c1,c2);
console.log(c1, c2);


c1 = {...char, factions: ["z"]};
c2 = {...char, factions: ["z"], health: 500};
console.log(c1, c2);
c2=heal_damage(100,c1,c2);
console.log(c1, c2);
c2=heal_damage(100,c1,c2);
console.log(c1, c2);
c2=heal_damage(999,c1,c2);
console.log(c1, c2);

c1 = {...melee_char,  factions: ["z"], level: 20};
c2 = {health: 300};
console.log(c1, c2);
c2=deal_damage_to_prop(100, 1, c1, c2);
console.log(c1, c2);
c2=deal_damage_to_prop(999, 1, c1,c2);
console.log(c1, c2);