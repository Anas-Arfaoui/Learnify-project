<?php

namespace App\Services;

use Smalot\PdfParser\Parser;
use PhpOffice\PhpWord\IOFactory;

class TextExtractionService
{
    public function extract(string $path): string
    {
        if (!file_exists($path)) {
            throw new \Exception("File not found: $path");
        }

        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));

        return match ($extension) {

            'txt'  => $this->fromTxt($path),

            'pdf'  => $this->fromPdf($path),

            'docx' => $this->fromDocx($path),

            default => throw new \Exception("Unsupported file type: $extension")
        };
    }

    protected function fromTxt(string $path): string
    {
        return file_get_contents($path);
    }

    protected function fromPdf(string $path): string
    {
        $parser = new Parser();

        $pdf = $parser->parseFile($path);

        return $pdf->getText();
    }

    protected function fromDocx(string $path): string
    {
        $phpWord = IOFactory::load($path);

        $text = '';

        foreach ($phpWord->getSections() as $section) {

            foreach ($section->getElements() as $element) {

                if (method_exists($element, 'getText')) {
                    $text .= $element->getText() . "\n";
                }
            }
        }

        return $text;
    }
}
