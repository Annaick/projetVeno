<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EnseignantController extends Controller
{

    //ajout
    public function ajouterEnseignant(Request $request)
    {
    

        $enseignant = new Enseignant([
            'numens' => $request->input('numens'),
            'nom' => $request->input('nom'),
            'nbheures' => $request->input('nbheures'),
            'tauxhoraire' => $request->input('tauxhoraire'),
        ]);

        $enseignant->save();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Enseignant ajouté avec succès.',
            'enseignant' => $enseignant
        ], 200);
    }


//afficher 

public function afficherSalaire()
    {
        $enseignant= Enseignant::all();

        $enseignantsAvecSalaire = $enseignant->map(function ($enseignant) {
            $enseignant->salaire = $enseignant->nbheures * $enseignant->tauxhoraire;
            return $enseignant;
        });

        return response()->json([
            'status' => 'success',
            'enseignants' => $enseignantsAvecSalaire
        ], 200);
    }

//modif
public function modifierEnseignant(Request $request, $id)
{
    $enseignant = Enseignant::findOrFail($id);
    $enseignant->update($request->all());

    return response()->json([
        'status' => 'success',
        'message' => 'Enseignant mis à jour avec succès.'
    ], 200);
}

//supprimer 

public function supprimerEnseignant($id)
    {
        $enseignant = Enseignant::findOrFail($id);
        $enseignant->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Enseignant supprimé avec succès.'
        ], 200);
    }

//afiche salaire minimal , maximale , salaire totale 
public function afficherStatistiquesSalaires()
{
    $salaireMinimal = Enseignant::min(DB::raw('nbheures * tauxhoraire'));
    $salaireMaximal = Enseignant::max(DB::raw('nbheures * tauxhoraire'));
    $montantTotalSalaires = Enseignant::sum(DB::raw('nbheures * tauxhoraire'));

    return response()->json([
        'status' => 'success',
        'salaire_minimal' => $salaireMinimal,
        'salaire_maximal' => $salaireMaximal,
        'montant_total_salaires' => $montantTotalSalaires
    ], 200);
}
}






