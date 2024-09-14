<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ClassesResource;
use App\Http\Resources\StudentResource; 
use App\Models\Student;
use App\Models\Classes;
use App\Http\Requests\api\StoreStudentRequest;



class StudentController extends Controller
{
    
    public function index()
    {
        // Fetch all students and transform them using StudentResource
        $students = StudentResource::collection(Student::paginate(10));

        // Return the Inertia response with the students data
        return inertia('Students/Index', [
            'students' => $students,
        ]);
    }


    public function create()
    {
        $classes= ClassesResource::collection(Classes::all());

        return inertia('Students/Create', [
            'classes'=> $classes,
        ]
        );

    }


    public function store(StoreStudentRequest $request)
    {

        Student::create($request->validated());

        return redirect()->route('students.index');


    }





}
