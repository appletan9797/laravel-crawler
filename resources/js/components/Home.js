import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import AppContainer from './AppContainer';
import { useState } from 'react';

const Home = () =>{

    const nav = useNavigate();
    const csrf = document.querySelector('meta[name="csrf-token"]').content;
    //var csrf_token = '<?php echo csrf_token(); ?>';

    const [url, setUrl] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        //alert(url);
        if (url === undefined || url === null)
        {
            alert ("Please fill in url");
        }
        else{
            axios.post("http://localhost/storeData", {
            url
            })
            .then(response => {
                var id = response.data;
                console.log('id from home'+id);
                nav('/result/'+id);

            }).catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <AppContainer title="Laravel Practice - Crawler">
            <form id="iMainForm" onSubmit={handleSubmit} /* method="post" action="storeData" */>
                <p id='test'>Please enter an URL to crawl:</p>
                <p><input type="text" name="urlToCrawl" id="iTextbox" value={url ?? ''} onChange={(e) => setUrl(e.target.value)} ></input></p>
                {/* <Link to="/result" id="button" className="btn btn-outline-primary">Crawl It!</Link> */}
                <input type="submit" value="Crawl It"></input>
                {/* <br id="br"></br> */}
                <div id='iHistoryBtn'><Link to="/showhistory" id="button" className="btn btn-outline-primary">Show Crawled History</Link></div>
                <input type="hidden" name="_token" value={csrf} />
            </form>
        </AppContainer>
    );
}

export default Home;
