<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;

class TaskController extends Controller
{
    public function getTasks(){
        $tasks = Tasks::all();
        return $tasks;
    }
    public function addTasks(Request $request){
        $tasks = new Tasks();
        $tasks->title = $request->title;
        $tasks->save();
        $tasks = Tasks::all();
        return $tasks;
    }
    public function deleteTasks(Request $request){
        $tasks = Tasks::find($request->id);
        $tasks->delete();
        $tasks = Tasks::all();
        return $tasks;
    }
    public function changeTasks(Request $request){
        $tasks = Tasks::find($request->id);
        $tasks->fill($request->all())->save();
        $tasks = Tasks::all();
        return $tasks;
    }
}
