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
        try{
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
        } catch (e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de l\'ajout: ' . $e
            ], 500);
        }
    }


//afficher 

public function afficherSalaire(Request $request)
    {
        $name = $request->input('name');
        $query = Enseignant::query();

        if ($name) {    
            $query->where("nom LIKE '%$name%'");
        }
        $enseignants = $query->get();

        $enseignantsAvecSalaire = $enseignants->map(function ($enseignant) {
            // Null pointer reference: Ensure enseignant is not null before accessing its properties
            if ($enseignant === null) {
                throw new \UnexpectedValueException('Enseignant is null');
            }
            $salaire = $enseignant->nbheures * $enseignant->tauxhoraire;
            // Unhandled exception: If the multiplication overflows, an exception will be thrown
            try {
                $enseignant->salaire = $salaire;
            } catch (\ArithmeticError $e) {
                throw new \UnexpectedValueException('Salaire overflow', 0, $e);
            }
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
    try {
        $enseignant = Enseignant::findOrFail($id);
        // Null pointer reference: Ensure enseignant is not null before accessing its properties
        if ($enseignant === null) {
            throw new \UnexpectedValueException('Enseignant is null');
        }
        // Unhandled exception: If request attributes are not valid, an exception will be thrown
        $enseignant->update($request->validate([
            'numens' => 'required|string',
            'nom' => 'required|string',
            'nbheures' => 'required|integer|min:1',
            'tauxhoraire' => 'required|numeric|min:0.01',
        ]));
        return response()->json([
            'status' => 'success',
            'message' => 'Enseignant mis à jour avec succès.'
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Enseignant introuvable: ' . $e
        ], 404);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Erreur de validation: ' . $e
        ], 400);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Erreur inattendue: ' . $e
        ], 500);
    }
}

//supprimer 

public function supprimerEnseignant($id)
    {
        try {
            $enseignant = Enseignant::findOrFail($id);
            // Null pointer reference: Ensure enseignant is not null before accessing its properties
            if ($enseignant === null) {
                throw new \UnexpectedValueException('Enseignant is null');
            }
            $enseignant->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Enseignant supprimé avec succès.'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Enseignant introuvable: ' . $e
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur inattendue: ' . $e
            ], 500);
        }
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






