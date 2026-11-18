import CarteLivre from "./CarteLivre.jsx";

function ListeLivre({ livres, idEnModification, onModifier, onSupprimer, onBasculerLu }) {
    // Calcule le nombre de livres marqués comme "lus"
    const nbLus = livres.filter((livre) => livre.lu).length;
    
    // Récupère le nombre total de livres dans la liste
    const nbTotal = livres.length;

    // Détermine si un livre est actuellement en cours de modification (si un ID est fourni)
    const modeModification = idEnModification !== null ;

        // Si la liste des livres est vide, affiche un message d'alerte informatif
        if (livres.length === 0) {
            return (
                <div className="alert alert-info">
                    <span>Ta bibliotheque est vide.  Ajoute ton premier livre !</span>
                </div>
            );
        }

    return (
         <section className="p-4">
        {/* En-tête de la section avec le titre et le compteur de livres lus */}
        <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Mes livres</h2>
                <span className="badge badge-info">{nbLus} / {nbTotal} Lus</span>
        </div>

        {/* Grille responsive affichant la liste des cartes de livres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {livres.map((livre) => (
                <CarteLivre
                    key={livre.id}
                    livre={livre}
                    // Indique si ce livre spécifique est celui en cours de modification
                    estEnModification={modeModification && idEnModification === livre.id}
                    onModifier={onModifier}
                    onSupprimer={onSupprimer}
                    onBasculerLu={onBasculerLu}
                />
            ))
            }
        </div>
       </section>
    );
}

export default ListeLivre;