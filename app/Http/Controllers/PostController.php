<?php

namespace App\Http\Controllers;

use Goutte\Client;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
class PostController extends Controller
{
    public function index(Request $request)
    {
        $results = DB::table('posts');
        if ($request->has('titleFilter')){
            $arrTitle = json_decode($request->titleFilter);
            $results = $results->where(function ($query) use ($arrTitle){
                for ($i=0; $i < count($arrTitle); $i++){
                    $query->orwhere('page_title','like', '%'.$arrTitle[$i].'%');
                }
            });
        }

        if ($request->has('descFilter')){
            $arrDesc = json_decode($request->descFilter);
            $results = $results->orwhere(function ($query) use ($arrDesc){
                for ($i=0; $i < count($arrDesc); $i++){
                    $query->orwhere('page_desc','like', '%'.$arrDesc[$i].'%');
                }
            });
        }

        if ($request->has('dateFilter')){
            $arrDate = json_decode($request->dateFilter);
            $results = $results->orwhere(function ($query) use ($arrDate){
                for ($i=0; $i < count($arrDate); $i++){
                    $query->orwhere('created_at', '=', $arrDate[$i]);
                }
            });
        }
        $results = $results->paginate(5);
        return response($results,200);
    }

    public function show($id)
    {
        $result = DB::table('posts')->whereRaw('id ='.$id)->first();
        return $result;
    }

    public function store(Request $request)
    {
        //$result = Result::create($request->all());
        $client = new Client();
        $url = $request->url;
        $crawler = $client->request('GET',$url);
        $pageTitle = $crawler->filter('title')->text();
        $checkMetadata = $crawler->filterXpath('//meta[@name="description"]');
        if ($checkMetadata->count() > 0){
            $metadata = $checkMetadata->attr('content');
        }
        else{
            $metadata = "Description not found";
        }
        $html = $crawler->html();
        $createdDate = date("Y/m/d");
        $record_id = $this->saveData($pageTitle,$url,$metadata,$html,$createdDate);
       // echo $record_id;
        return $record_id;
    }

    public function saveData($pageTitle,$metadata,$html,$createdDate)
    {
        $record = new Post;
        $record->screenshot_img_name = "image.png";
        $record->page_title = $pageTitle;
        $record->page_desc = $metadata;
        $record->page_html = $html;
        $record->created_at = $createdDate;
        $record->timestamps = false;
        $record->save();
        echo $record->id;
    }
}
