export interface Pokemon {
    id: number
    name: string
    url: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    sprites: {
        front_default: string
    }
}