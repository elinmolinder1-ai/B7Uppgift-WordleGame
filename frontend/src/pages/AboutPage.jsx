export default function AboutPage() {
  return (
    <div className="about-container">
      <h1>Om projektet</h1>

      <p>
        Detta projekt är ett Wordle-inspirerat spel utvecklat som en fullstack-applikation
        i kursen JavaScript Fullstack. Spelet låter användaren gissa ett slumpmässigt ord
        och får feedback i form av färger: grönt för rätt bokstav på rätt plats, gult för
        rätt bokstav på fel plats och rött för bokstäver som inte finns i ordet.
      </p>

      <h2>Tekniker</h2>
      <ul>
        <li>React (frontend)</li>
        <li>Node.js + Express (backend)</li>
        <li>API för spellogik och feedback</li>
        <li>Databas för highscore-lista</li>
        <li>Server-side rendering av highscore-sidan</li>
      </ul>

      <h2>Funktioner</h2>
      <ul>
        <li>Starta ett nytt spel med slumpat ord</li>
        <li>Gissa ord och få feedback</li>
        <li>Se antal försök kvar</li>
        <li>Registrera resultat efter vinst</li>
        <li>Highscore-lista med namn, tid och inställningar</li>
      </ul>

      <h2>Syfte</h2>
      <p>
        Syftet med projektet är att träna på fullstack-utveckling, API-design,
        server-side rendering, datalagring och integration mellan frontend och backend.
      </p>
    </div>
  );
}
