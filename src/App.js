import React, { useEffect, useState } from "react";

function App() {
  // state
  const [listOfCharacters, setListOfCharacters] = useState([]);

  // fetch
  const fetchData = async (url) => {
    const rawResponse = await fetch(url);
    const response = await rawResponse.json();

    return response;
  };

  useEffect(() => {
    const getCharacters = async () => {
      const characters = [];

      for (let i = 1; i <= 10; i++) {
        let characterData = {
          characterName: "",
          characterHomeworld: "",
        };

        const character = await fetchData(`https://swapi.dev/api/people/${i}/`);
        const homeworld = await fetchData(character.homeworld);

        characterData.characterName = character.name;
        characterData.characterHomeworld = homeworld.name;

        characters.push(characterData);
      }

      setListOfCharacters(characters);
    };

    getCharacters();
  }, []);

  return (
    <ul>
      {listOfCharacters.map((character, index) => {
        const { characterName, characterHomeworld } = character;

        return (
          <li key={index}>
            {`${characterName} is from ${characterHomeworld}`}
          </li>
        );
      })}
    </ul>
  );
}

export default App;
