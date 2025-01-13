export const schema = `#graphql

    type Character {
        id: Int!
        name: String!
        species: String!
        gender: String!
        origin: Origin
        location: Location
    }

    type Origin {
        name: String!
        url: String!
    }

    type Location {
        id: Int!
        name: String!
        type: String!
        dimension: String!
        residents: [String!]!
        url: String
    }

    type Query {
        getCharacters: [Character!]!
        getCharacter(id: Int!): Character
        getMultipleCharacter(ids: [Int!]): [Character!]!
        getLocations: [Location!]!
        getLocation(id: Int!): Location
    }

    type Mutation {
        addCharacter(name: String!): Character!
    }

`