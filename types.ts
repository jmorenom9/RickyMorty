export type Character = {
    id: number,
    name: string,
    species: string,
    gender: string,
    origin: Origin,
    location: Location 
}

export type Origin = {
    name: string,
    url: string
}

export type Location = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: Character[],
    url: string
}

//https://rickandmortyapi.com/api/character/2
export type APICharacters = {
    id: number,
    name: string,
    species: string,
    gender: string,
    origin: Origin,
    location: Location
}

//https://rickandmortyapi.com/api/location/3
export type APILocation = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: Character[],
    url: string
}