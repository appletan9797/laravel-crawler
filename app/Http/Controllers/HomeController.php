<?php

namespace App\Http\Controllers;

use Goutte\Client;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('index');
    }

    //goute
    public function gouttecrawler(Request $request)
    {
        $client = new Client();
        $url = $request->urlToCrawl;
        $crawler = $client->request('GET',$url);
        $pageTitle = $crawler->filter('title')->text();
        //echo '<a href='.$url.'>'. $pageTitle."\n";
        $metadata = $crawler->filterXpath('//meta[@name="description"]')->attr('content');
       // echo "\nmetadata: ".$metadata;
        //echo $crawler->html();
       // echo $crawler->html();
        /* $crawler->filter('title')->each(function($node) {
            echo "The title of the url is: ";
            echo '<a href='.$url.'>' + $node->text();
        }); */
    }
}
