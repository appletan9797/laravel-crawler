<?php

namespace App\Http\Controllers;

use Goutte\Client;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
class PostController extends Controller
{
    public function index()
    {
        $result = DB::table('posts')->get();
        return $result->toJson();
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
