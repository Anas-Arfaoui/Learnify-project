<?php
namespace App\Services;

interface AIClientInterface
{
        public function generateQuiz(string $text, string $difficulty): array;
}