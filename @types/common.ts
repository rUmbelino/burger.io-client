export interface Ingredient {
    id: number
    name: string
    icon: string
    storedAmount: number
}

export interface RecepieIngredient extends Ingredient {
    recipeAmount: number
}

export interface Recepie {
    id: number
    icon: string
    name: string
    quantity: number
    ingredients: RecepieIngredient[]
}

export interface Order {
    id: number,
    recepies: Recepie[]
}