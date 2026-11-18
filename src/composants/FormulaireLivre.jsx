import {useState} from "react";
import { GENRES } from "./data/Livre.js";

// Définition d'un objet représentant un formulaire vide (état initial)
const FORM_VIDE = { titre: "", auteur: "", annee: "", genre: "Roman", lu: false };

function FormulaireLivre({ livre, onAjouter, onEnregistrer, onAnnuler })  {
    // Détermine si le formulaire est en mode modification (si un livre est passé en prop)
    let enModification = (livre !== null);

    // Déclaration des états locaux du formulaire et des messages d'erreur
    const [form, setForm] = useState( FORM_VIDE);
    const [erreur, setErreur] = useState("");

    // Synchronise le formulaire avec le livre à modifier si l'ID change
    if (enModification && form.id !==livre.id) {
        setForm({ ...livre, annee: livre.annee.toString() });
    }

    // Gestionnaire de changement pour mettre à jour l'état du formulaire dynamiquement
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm({...form,[name]: type === "checkbox" ? checked : value, });
    }

    // Gestionnaire de soumission du formulaire
    function handleSubmit(e) {
        e.preventDefault();
        
        // Vérification des champs obligatoires (titre et auteur)
        if (!form.titre || !form.auteur) {
            setErreur(" Le titre et l'auteur sont obligatoires.");
        } 
     return // Interruption de la fonction si les champs sont vides

     setErreur(" ");
        // Vérification que l'année entrée est bien un nombre valide
        if (form.annee && isNaN(Number(form.annee))) {
            setErreur(" L'année doit être un nombre."); // Vérification si l'année est un nombre
            return;
        }

        setErreur(" ");
        
        // Traitement selon le mode (Modification ou Ajout)
        if (enModification) {
            onEnregistrer({ ...form, id: livre.id, annee:  Number(form.annee) });
            setForm(FORM_VIDE);
            enModification = false;
        } else {
            onAjouter({ ...form, annee: Number(form.annee) });
            setForm(FORM_VIDE);
            enModification = false;
        }
   }
  
  return (
            <form className="card bg-base-100 shadow" onSubmit={handleSubmit}>
                <div className="card-body">
                    {/* Titre dynamique selon le mode (Modification / Nouveau) */}
                    <h2 className="card-title">{enModification ? "Modifier le livre" : "Nouveau livre"}</h2>
                    
                    {/* Affichage conditionnel du message d'erreur */}
                    { (erreur ?
                    ( <div className="label label-error text-sm">
                            <span>{erreur}</span>
                    </div>
                    ) :null
                    )}

                        <fieldset>
                            {/* Champ Titre */}
                            <legend className="fieldset-legend">Titre</legend>
                            <input className="input w-full" name="titre" placeholder="Ex: Le Petit Prince" value={form.titre}onChange={handleChange}/>
                            
                            {/* Champ Auteur */}
                            <legend className="fieldset-legend">Auteur</legend>
                            <input className="input w-full" name="auteur" placeholder="Ex: Antoine de Saint-Exupéry" value={form.auteur} onChange={handleChange} />

                            {/* Sélecteur de Genre */}
                            <legend className="fieldset-legend">Genre</legend>
                            <select className="select w-full" name="genre" value={form.genre} onChange={handleChange}>
                                {GENRES.map((genre) => (<option key={genre} value={genre}> {genre}</option>))}
                            </select>

                        {/* Champ Année de publication */}
                        <legend className="fieldset-legend">Année de publication</legend>    
                        <input className="input w-full" name="annee" placeholder="Ex: 1943" value={form.annee} onChange={handleChange} />

                        {/* Case à cocher "Déjà lu" */}
                        <label className="label cursor-pointer gap-3 mt-3">
                        <input type="checkbox" className="checkbox  toggle-success" name="lu" checked={form.lu} onChange={handleChange}  />
                            <span className="label-text"> Deje Lu</span>
                            </label>

                        </fieldset>   

                            <div className="card-actions justify-end mt-2">
                                {/* Affichage conditionnel du bouton Annuler en mode modification */}
                                {( enModification ? 
                                    <button type="button" className="btn btn-ghost" onClick={onAnnuler}> Annuler </button>
                                : null 
                                )}  
                                
                                {/* Bouton de soumission dynamique (Enregistrer ou Ajouter) */}
                                {( enModification ?
                                    <button type="submit" className="btn btn-primary"> Enregistrer </button>
                                    :
                                    <button type="submit" className="btn btn-primary"> Ajouter </button>
                                )}
                            </div>
                    </div>
            </form>
        );
    }

    export default FormulaireLivre;