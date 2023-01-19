export interface Pokemon {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    sprites: {
        front_default: string
    }
    abilities: Array<Ability>
    moves: Array<Move>
}

export interface Ability {
    ability: {
        name: string
    }
}

export interface Move {
    move: {
        name: string
    }
}