<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Section;
use App\Http\Resources\SectionResource;
use App\Http\Requests\api\ListSectionRequest;

class SectionController extends Controller
{

public function __invoke(ListSectionRequest $request)

{
   $sections=Section::where('class_id',$request->class_id)->get();

   return SectionResource::collection($sections);
}


}