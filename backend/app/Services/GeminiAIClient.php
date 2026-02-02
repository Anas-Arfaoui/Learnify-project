<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class GeminiAIClient implements AIClientInterface
{
    protected string $apiKey;
    protected string $endpoint;

    public function __construct()
{
    $this->apiKey = config('services.gemini.key');

    $this->endpoint =
        'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent';
}



    /**
     * Generate quiz using Gemini API
     */
    public function generateQuiz(string $text, string $difficulty): array
    {
        /* Build prompt */
        $prompt = $this->buildPrompt($text, $difficulty);

        /*Send request (to gemini) */
        
        $response = Http::timeout(60)
    ->post(
        $this->endpoint . '?key=' . $this->apiKey,
        [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ]
        ]
    );

    Log::info('Gemini Response', [
    'status' => $response->status(),
    'body' => $response->body()
]);
        if (!$response->successful()) {
            Log::error('Gemini API Error', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            throw new Exception(
    'Gemini Error: ' . $response->status() . ' - ' . $response->body()
);

        }

        /* Extract text */
        $content = $response->json(
            'candidates.0.content.parts.0.text'
        );

        if (!$content) {
            throw new Exception('Empty Gemini response');
        }

        /* Parse JSON */
        $data = $this->parseResponse($content);

        /* Validate structure */
        $this->validateFormat($data);

        return $data;
    }

    /**
     * Build prompt
     */
    protected function buildPrompt(string $text, string $difficulty): string
    {
        return "
Generate a multiple-choice quiz.

Difficulty: {$difficulty}

Rules:
- 5 questions
- 4 answers per question
- Only one correct answer
- Output ONLY valid JSON
- No explanation

JSON Format:

{
  \"title\": \"...\",
  \"questions\": [
    {
      \"question\": \"...\",
      \"answers\": [
        { \"text\": \"...\", \"is_correct\": true },
        { \"text\": \"...\", \"is_correct\": false }
      ]
    }
  ]
}

TEXT:
{$text}
";
    }

    /**
     * Parse JSON
     */
    protected function parseResponse(string $content): array
    {
        $content = trim($content);

        $content = preg_replace('/```json/', '', $content);
        $content = preg_replace('/```/', '', $content);

        $data = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {

            Log::error('Gemini JSON parse error', [
                'response' => $content
            ]);

            throw new Exception('Invalid Gemini JSON');
        }

        return $data;
    }

    /**
     * Validate format
     */
    protected function validateFormat(array $data): void
    {
        if (!isset($data['questions'])) {
            throw new Exception('Invalid format');
        }

        foreach ($data['questions'] as $q) {

            $correct = 0;

            foreach ($q['answers'] as $a) {

                if ($a['is_correct'] === true) {
                    $correct++;
                }
            }

            if ($correct !== 1) {
                throw new Exception('Invalid answer structure');
            }
        }
    }
}
