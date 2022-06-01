import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppContainer from './AppContainer';

const ShowHistory = () =>{

    const [results, setResults] = useState([]);
    const [spinner, setSpinner] = useState(false);

    const fetchResult = () => {
        setSpinner(true);

        axios.get('http://localhost/api/results')
        .then(res => {
            setSpinner(false);
            setResults(res.data);
        }).catch (error => {
            console.log(error);
        });
    };

    useEffect( () => {
        fetchResult();
    }, [])

    const returnPost = () => {
        if (!results){
            return(
                {/* <tbody>
                    <tr>Loading Results....</tr>
                </tbody> */}
                <Text>
                <h2>Loading...</h2>
            );
        }

        return results.map((result) => (
            <div id={result.id} className='eachResult'>
                <div id='bigcontainer'>
                    <div id='left'>
                        <Link to={'../result/'+result.id}>
                            <img id='img' src={'./img/'+result.screenshot_img_name} />
                        </Link>
                    </div>

                    <div id='right'>
                        <a href={result.page_url}>{result.page_title}</a>
                        <br />
                        {result.page_desc}
                        <br />
                        {result.created_at}
                    </div>
                </div>
                <div id='html'>
                    {result.page_html}
                </div>
            </div>
        ))
    }

    const returnLoading = () => {
        return <div id='loading'>LOADING...</div>
    }

    return (
        <AppContainer title="Laravel Practice - Result">
            <div id = "btnMainPage">
                <Link to='/'><button>Main Page</button></Link>
            </div>
            <div id="Container">
                {spinner ? returnLoading() : returnPost()}

                {/* <table>
                    {returnPost()}
                </table> */}
            </div>
        </AppContainer>
    );
}

export default ShowHistory;
