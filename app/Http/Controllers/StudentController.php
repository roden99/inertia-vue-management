<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\StudentResource; // Ensure this is the correct namespace
use App\Models\Student; //


class StudentController extends Controller
{
    
    public function index()
    {
        // Fetch all students and transform them using StudentResource
        $students = StudentResource::collection(Student::all());

        // Return the Inertia response with the students data
        return inertia('Students/Index', [
            'students' => $students,
        ]);
    }





}
