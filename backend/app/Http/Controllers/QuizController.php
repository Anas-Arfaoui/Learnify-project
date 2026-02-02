<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Services\QuizGenerationService;
use Illuminate\Http\Request;

class QuizController extends Controller
{

    public function generate(Request $request, QuizGenerationService $service)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,docx,txt',
            'difficulty' => 'nullable|string',
        ]);

        $quiz = $service->generateFromFile(
            $request->file('file'),
            $request->user(),
            $request->difficulty ?? 'medium'
        );

        return response()->json($quiz, 201);
    }


    public function show(Quiz $quiz, Request $request)
    {
        $user = $request->user();

        abort_if(!$user || $quiz->user_id !== $user->id, 403);

        return response()->json(
            $quiz->load('questions.answers'),
            200
        );
    }


    public function submit(Request $request, Quiz $quiz)
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        $answers = $request->answers;

        $score = 0;
        
        $quiz->load('questions.answers');

        foreach ($quiz->questions as $q) {

            $correct = $q->answers
                ->where('is_correct', true)
                ->first();

            if (
                $correct &&
                isset($answers[$q->id]) &&
                $answers[$q->id] == $correct->id
            ) {
                $score++;
            }
        }

        return response()->json([
            'score' => $score,
            'total' => count($quiz->questions)
        ]);
    }
}
