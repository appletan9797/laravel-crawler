<?php

namespace App\Http\Controllers;

use Goutte\Client;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $client = new Client();
        $url = $request->urlToCrawl;
        $crawler = $client->request('GET',$url);
        $pageTitle = $crawler->filter('title')->text();
        $metadata = $crawler->filterXpath('//meta[@name="description"]')->attr('content');
        $html = $crawler->html();
        $createdDate = date("Y/m/d");

        $this->saveData($pageTitle,$metadata,$html,$createdDate);
    }

    public function saveData($pageTitle,$metadata,$html,$createdDate)
    {
        $record = new Post;
        $record->screenshot_img_name = "update until screenshot part is done";
        $record->page_title = $pageTitle;
        $record->page_desc = $metadata;
        $record->page_html = $html;
        $record->created_at = $createdDate;
        $record->timestamps = false;
        $record->save();
        echo $record->id;
    }
}
