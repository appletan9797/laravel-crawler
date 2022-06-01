import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppContainer from './AppContainer';

const Result = () =>{
    const param = useParams();
    const resultID = param.id;

    console.log('id from result' + resultID);


    const [id, setID] = useState('');
    const [imgName, setImgName] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const [pageUrl, setPageUrl] = useState('');
    const [pageDesc, setPageDesc] = useState('');
    const [pageHTML, setPageHTML] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const fetchResult = () => {
        axios.get('http://localhost/api/results/'+resultID)
        .then(res => {
            console.log(res.data);
            const data = res.data;
            setID(data.id);
            setImgName(data.screenshot_img_name);
            setPageTitle(data.page_title);
            setPageUrl(data.page_url);
            setPageDesc(data.page_desc);
            setPageHTML(data.page_html);
            setCreatedAt(data.created_at);

            //setResult(res.data.data);
        }).catch (error => {
            console.log(error);
        });
    };

    useEffect( () => {
        fetchResult();
    }, [])

    return (
        <AppContainer title="Laravel Practice - Result">
            <div id = "btnMainPage">
                <Link to='/'><button>Main Page</button></Link>
                <Link to='/showhistory'><button id='iBtnHistory'>Show Crawled History</button></Link>
            </div>
            <div id="Container">
                <table>
                <tbody>
                    <tr>
                        <td className="cTitle">Screenshot</td>
                        <td>
                        {/* <td>{imgName}<br></br> */}
                        <img id= "iScreenshot" src={'/img/'+imgName}></img>
                        </td>
                    </tr>
                    <tr>
                        <td className="cTitle">Title</td>
                        <td><a href={pageUrl}>{pageTitle}</a></td>
                    </tr>
                    <tr>
                        <td className="cTitle">HTML Description</td>
                        <td>{pageDesc}</td>
                    </tr>
                    <tr>
                        <td className="cTitle">HTML Body</td>
                        <td><div>{pageHTML}</div></td>
                    </tr>
                    <tr>
                        <td className="cTitle">Created At</td>
                        <td>{createdAt}</td>
                    </tr>
                </tbody>
            </table>
                {/* {results.map((result) => (
                    <div className='card' key={result.id}>
                        <h3>{result.page_desc}</h3>
                        <p>{result.page_title}</p>
                    </div>
                    ))} */}
            </div>
        </AppContainer>
    );
}

export default Result;
