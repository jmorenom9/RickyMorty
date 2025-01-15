import { GraphQLError } from "graphql";
import { APICharacters, APILocation, Character } from "./types.ts";

type GetQueryArgs = {
    id: number
}

type GetMultipleCharacterQueryArgs = {
    ids: number[]
}

type getCharacterByPageQueryArgs = {
    page: number
}

type getLocationByPageQueryArgs = {
    page: number
}

const fetchAllCharacters = async (url = `https://rickandmortyapi.com/api/character/?page=1`, allCharacters = []): Promise<Character[]> => {
  const data = await fetch(url);
  if (data.status !== 200) throw new GraphQLError("Api error");

  const response = await data.json();
  const updatedCharacters = allCharacters.concat(response.results);

  return response.info.next 
    ? fetchAllCharacters(response.info.next, updatedCharacters) 
    : updatedCharacters;

  
};

export const resolvers = {
    Query: {
        getCharacters: async (_: unknown, __: unknown, ___: unknown): Promise<Character[]> => {
            /*const url = `https://rickandmortyapi.com/api/character`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response.results;*/
            return fetchAllCharacters();
        },

        getLocations: async (_: unknown, __: unknown, ___: unknown): Promise<Location[]> => {
            const url = `https://rickandmortyapi.com/api/location`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response.results;
        },

        getCharacter: async (_: unknown, args: GetQueryArgs, __: unknown): Promise<Character | null> => {
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
        },

        getCharacterByPage: async (_: unknown, args: getCharacterByPageQueryArgs, __: unknown): Promise<Character[]> => {
            const url = `https://rickandmortyapi.com/api/character/?page=${args.page}`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response.results;
        },

        getLocationByPage: async (_: unknown, args: getLocationByPageQueryArgs, __: unknown): Promise<Location[]> => {
            const url = `https://rickandmortyapi.com/api/location/?page=${args.page}`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response.results;
        }
    },

    Mutation: {

    },

    Character: {
        location: async (parent: Character, _: unknown, __: unknown): Promise<Location> => {
            const l = parent.location;
            const url = `${l.url}`;
            const data = await fetch(url);
            if (data.status !== 200) throw new GraphQLError("Api error");
            const response = await data.json();
            return response;
        }
    },

    Location: {

    }
}