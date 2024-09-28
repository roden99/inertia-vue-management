<?php

namespace Database\Seeders;
use App\Models\Supplier;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Create 100 suppliers using the factory
        Supplier::factory()->count(100)->create();
    }
}
