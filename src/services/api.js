import axios from 'axios';

// Cache for homeworld names
const homeworldCache = {};

export const fetchCharacters = async (page) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
    const characters = response.data.results;

    // Fetch homeworld names, using cache when available
    const homeworldPromises = characters.map(async (character) => {
      if (homeworldCache[character.homeworld]) {
        return { ...character, homeworld: homeworldCache[character.homeworld] };
      }
      const homeworldResponse = await axios.get(character.homeworld);
      homeworldCache[character.homeworld] = homeworldResponse.data.name;
      return { ...character, homeworld: homeworldResponse.data.name };
    });
    const updatedCharacters = await Promise.all(homeworldPromises);

    return updatedCharacters;
  } catch (error) {
    throw new Error('Failed to fetch characters');
  }
};

export const fetchCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    const character = response.data;

    // Use cached homeworld if available
    if (homeworldCache[character.homeworld]) {
      character.homeworld = homeworldCache[character.homeworld];
    } else {
      const homeworldResponse = await axios.get(character.homeworld);
      homeworldCache[character.homeworld] = homeworldResponse.data.name;
      character.homeworld = homeworldResponse.data.name;
    }

    // Fetch film titles
    const filmPromises = character.films.map((filmUrl) => axios.get(filmUrl));
    const filmResponses = await Promise.all(filmPromises);
    character.films = filmResponses.map((res) => res.data.title);

    // Fetch starship names
    const starshipPromises = character.starships.map((shipUrl) => axios.get(shipUrl));
    const starshipResponses = await Promise.all(starshipPromises);
    character.starships = starshipResponses.map((res) => res.data.name);

    return character;
  } catch (error) {
    throw new Error('Failed to fetch character details');
  }
};