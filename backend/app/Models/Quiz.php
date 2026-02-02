<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'difficulty',
    ];

    /**
     * A quiz belongs to a user (creator / student)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * A quiz has many questions
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
