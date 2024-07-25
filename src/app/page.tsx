import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <div className="relative w-11/12 max-w-4xl h-60 mx-auto overflow-hidden mb-6">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dtglidvcw/image/upload/v1721943129/BUGBUSTER/smsccp4wsl8o6v4tmmfb.jpg"
            alt="Bug Buster Mentoria Banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <main className="flex flex-col items-center justify-start flex-grow p-6">
        <section className="text-center mb-16">
          <p className="text-lg max-w-4xl mx-auto">
            Esta página foi desenvolvida pela equipe do Bug Buster Mentoria com
            o intuito educativo. Aqui, você encontrará uma série de desafios
            para scripts de automação de teste, incluindo logins, formulários e
            outros. Esperamos que você aprenda e se divirta!
          </p>
        </section>
        <section className="w-full max-w-4xl p-6 rounded-lg shadow-lg border border-gray-600 mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Desafios Disponíveis:
          </h3>
          <ul className="list-disc list-inside text-lg space-y-2 text-center">
            <li>Login</li>
            <li>Formulários</li>
            <li>Navegação</li>
            <li>Interações com a UI</li>
            <li>E muito mais!</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
