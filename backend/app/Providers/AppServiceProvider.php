<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\AIClientInterface;
use App\Services\GeminiAIClient;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void

    {
        $this->app->bind(AIClientInterface::class, GeminiAIClient::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
