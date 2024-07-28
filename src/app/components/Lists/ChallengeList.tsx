import React from 'react';

function ChallengeList() {
  return (
    <main
      id="mainContent"
      className="flex flex-col items-center justify-start flex-grow p-6 bg-gray-800"
    >
      <section id="introSection" className="text-center mb-16">
        <p id="introText" className="text-lg max-w-4xl mx-auto">
          Esta página foi desenvolvida pela equipe do Bug Buster Mentoria com o
          intuito educativo.
        </p>
      </section>
      <section
        id="challengesSection"
        className="p-6 rounded-lg shadow-lg border border-gray-600 mx-auto"
      >
        <h3
          id="challengesTitle"
          className="text-2xl font-semibold mb-6 text-center"
        >
          Desafios Disponíveis:
        </h3>
        <ul
          className="list-disc list-inside text-lg space-y-2 text-center"
          id="challengeList"
        >
          <li id="loginChallenge">Login</li>
          <li id="formChallenge">Formulários</li>
          <li id="tableChallenge">Tabela dinâmica</li>
          <li id="moreChallenges">E muito mais!</li>
        </ul>
      </section>
    </main>
  );
}

export default ChallengeList;
