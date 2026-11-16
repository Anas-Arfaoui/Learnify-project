<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Services\QuizGenerationService;
use Illuminate\Http\Request;
use App\Models\Result;

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

    $result = Result::updateOrCreate(
        [
            'user_id' => $request->user()->id,
            'quiz_id' => $quiz->id,
        ],
        [
            'score' => $score
        ]
    );

    return response()->json([
        'score' => $score,
        'total' => count($quiz->questions)
    ]);
}



    public function myResults(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    $results = Result::with('quiz')
        ->where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($r) {
            return [
                'quiz_title' => $r->quiz->title ?? 'Unknown',
                'name' => $r->quiz->user->name ?? 'Unknown',
                'score' => $r->score,
                'date' => $r->created_at->format('Y-m-d')
            ];
        });

    return response()->json($results);
}




    public function correctAnswers(Quiz $quiz, Request $request)
{
    $user = $request->user();

    abort_if(!$user || $quiz->user_id !== $user->id, 403);

    $quiz->load('questions.answers');

    $data = [];

    foreach ($quiz->questions as $q) {

        $correct = $q->answers()
            ->where('is_correct', true)
            ->first();

        $data[] = [
            'question' => $q->question_text,
            'answer' => $correct?->text
        ];
    }

    return response()->json($data);
}




}
