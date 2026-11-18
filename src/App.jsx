import { useState } from "react"
import {LIVRES_INITIAUX} from "./composants/data/Livre.js"
import ListeLivre from "./composants/ListeLivre.jsx"
import FormulaireLivre from "./composants/FormulaireLivre.jsx"

function App() {
  const [livres, setLivres] = useState(LIVRES_INITIAUX);

  const [idEnModification, setIdEnModification] = useState(null);


  function AjouterLivre(Livre) {
    const idLivre = livres.map((l) => l.id);  
    const idUnique = idLivre.length > 0 ? Math.max(...idLivre) + 1 : 1;
    setLivres([...livres, { ...Livre, id: idUnique }]);
  }



  function EnregistrerLivre(livreModifie) {
    setLivres(livres.map((livre) =>
      livre.id === livreModifie.id ? livreModifie : livre
    ));
  }


  function supprimerLivre(idLivre) {
    setLivres(livres.filter((livre) => livre.id !== idLivre));
  }

  function basculerLu(idLivre) {
    setLivres(livres.map((livre) =>
      livre.id === idLivre ? { ...livre, lu: !livre.lu } : livre
    ));
  }

  function commencerModification(id) {
    setIdEnModification(id);
  }

  function annulerModification() {
    setIdEnModification(null);
  }

    const livreEnModification = livres.find((livre) => livre.id === idEnModification) || null;
        return (
              <div className="min-h-screen bg-base-200">
                  <div className="navbar bg-base-100 shadow-sm px-4">
                     <samp>Ma bibliothèque</samp>
                  </div>
                  
                <main className="max-w-6xl mx-auto p-4 lg:grid-cols-4">
                  <div>
                    <FormulaireLivre
                      livre={livreEnModification}
                      onAjouter={AjouterLivre}
                      onEnregistrer={EnregistrerLivre}
                      onAnnuler={annulerModification}
                    />
                  </div>

                  <div className="lg:col-span-2">
                      <ListeLivre
                      livres={livres}
                      idEnModification={idEnModification}
                      onModifier={commencerModification}
                      onBasculerLu={basculerLu}
                      onSupprimer={supprimerLivre}
                    />
                  </div>
                </main>
              </div>
                );
            }



export default App
