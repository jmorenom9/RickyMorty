import { GraphQLError } from "graphql";
import { APICharacters, APILocation, Character } from "./types.ts";

type Context = {
    CharacterCollection: Character
}

type GetQueryArgs = {
    id: number
}

type GetMultipleCharacterQueryArgs = {
    ids: number[]
}

export const resolvers = {
    Query: {
        getCharacters: async (_: unknown, __: unknown, ___: unknown): Promise<Character[]> => {
            const url = `https://rickandmortyapi.com/api/character`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response.results;
        },

        getLocations: async (_: unknown, __: unknown, ___: unknown): Promise<Location[]> => {
            const url = `https://rickandmortyapi.com/api/location`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response.results;
        },

        getCharacter: async (_: unknown, args: GetQueryArgs, ctx: Context): Promise<Character | null> => {
            const url = `https://rickandmortyapi.com/api/character/${args.id}`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response;
        },

        getLocation: async (_: unknown, args: GetQueryArgs, ___: unknown): Promise<Location | null> => {
            const url = `https://rickandmortyapi.com/api/location/${args.id}`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response;
        },

        getMultipleCharacter: async (_: unknown, args: GetMultipleCharacterQueryArgs, __: unknown): Promise<Character[]> => {
            const url = `https://rickandmortyapi.com/api/character/${args.ids}`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response;
        }
    },

    Mutation: {

    },

    Character: {
        location: async (parent: Character, _: unknown, __: unknown): Promise<Location> => {
            const l = parent.location;
            const url = `${l.url}`.toString();
            const data = await fetch(url);
            const response = await data.json();
            return response;
        }
    },

    Location: {

    }
}