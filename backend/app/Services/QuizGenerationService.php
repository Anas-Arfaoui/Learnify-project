<?php

namespace App\Services;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class QuizGenerationService
{
    protected $extractor;
    protected $ai;

    public function __construct(
        TextExtractionService $extractor,
        AIClientInterface $ai
    ) {
        $this->extractor = $extractor;
        $this->ai = $ai;
    }

 
    public function generateFromFile(UploadedFile $file, User $user, string $difficulty): Quiz {

        return DB::transaction(function () use ($file, $user, $difficulty) {

            $path = $file->store('tmp', 'local');

            if (!\Storage::disk('local')->exists($path)) {
                throw new \Exception("Uploaded file missing: " . $path);
            }

        $fullPath = \Storage::disk('local')->path($path);

            $text = $this->extractor->extract($fullPath);

            $aiResult = $this->ai->generateQuiz($text, $difficulty);

            $quiz = Quiz::create([
                'user_id'    => $user->id,
                'title'      => $aiResult['title'] ?? 'Generated Quiz',
                'difficulty' => $difficulty,
            ]);

            foreach ($aiResult['questions'] as $q) {

                $question = $quiz->questions()->create([
                    'question_text' => $q['question'],
                ]);

                foreach ($q['answers'] as $a) {

                    $question->answers()->create([
                        'text' => $a['text'],
                        'is_correct'  => $a['is_correct'],
                    ]);
                }
            }

            Storage::delete($path);

            return $quiz;
        });
    }
}
