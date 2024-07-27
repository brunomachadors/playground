'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { InstructionsTable } from '../components/Instructions';

interface Character {
  id: string;
  name: string;
  house: string;
  dateOfBirth: string;
  actor: string;
  image: string;
}

const shuffleArray = (array: Character[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const CharacterTable: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(
        'https://hp-api.onrender.com/api/characters'
      );
      const data = await response.json();
      const topTenCharacters = data.slice(0, 10);
      setCharacters(shuffleArray(topTenCharacters));
    };

    fetchCharacters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 pt-2 px-4 sm:px-6 lg:px-8">
      <InstructionsTable />
      <div className="max-w-5xl mx-auto mt-6 mb-6">
        <div className="block sm:hidden">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-gray-800 text-gray-100 mb-4 p-4 rounded-lg shadow-md flex flex-col items-center border"
            >
              <div className="w-24 h-24 relative mb-4">
                <Image
                  src={character.image}
                  alt={character.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <p className="font-bold text-lg">{character.name}</p>
              <p>{character.house}</p>
              <p>{character.dateOfBirth || 'Unknown'}</p>
              <p>{character.actor}</p>
            </div>
          ))}
        </div>
        <div className="hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 border border-gray-300 text-center table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-600">Image</th>
                  <th className="py-2 px-4 border-b border-gray-600">Name</th>
                  <th className="py-2 px-4 border-b border-gray-600">House</th>
                  <th className="py-2 px-4 border-b border-gray-600">
                    Date of Birth
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600">Actor</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((character) => (
                  <tr
                    key={character.id}
                    className="hover:bg-gray-600 text-gray-100"
                  >
                    <td className="py-2 px-4 border-b border-gray-600 text-gray-100">
                      <div className="flex items-center justify-center w-16 h-16 relative">
                        <Image
                          src={character.image}
                          alt={character.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-600 text-gray-100">
                      {character.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-600 text-gray-100">
                      {character.house}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-600 text-gray-100">
                      {character.dateOfBirth || 'Unknown'}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-600 text-gray-100">
                      {character.actor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterTable;
