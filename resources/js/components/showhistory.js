import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppContainer from './AppContainer';
import Pagination from 'react-js-pagination';


const ShowHistory = () =>{

    const [results, setResults] = useState([]);
    const [paginations, setPagination] = useState();
    const [spinner, setSpinner] = useState(false);

    const fetchResult = async (pageNumber = 1) => {
        setSpinner(true);

        await axios.get('http://localhost/api/results?page='+pageNumber)
        .then(res => {
            setSpinner(false);
            setPagination(res.data);
            console.log(res);
            setResults(res.data.data);
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

    const returnPagination = () => {
        if (!spinner){
            return <Pagination
            activePage={paginations?.current_page ? paginations?.current_page : 0}
            itemsCountPerPage={paginations?.per_page ? paginations?.per_page : 0}
            totalItemsCount={paginations?.total ? paginations?.total : 0}
            onChange={(pageNumber) => {fetchResult(pageNumber);}}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First Page"
            lastPageText="Last Page"
        />
        }
    }

    return (
        <AppContainer title="Laravel Practice - Result">
            <div id = "btnMainPage">
                <Link to='/'><button>Main Page</button></Link>
            </div>
            <div id="Container">
                {spinner ? returnLoading() : returnPost()}
            </div>
            <div id="Pagination">
                {returnPagination()}
            </div>
        </AppContainer>
    );
}

export default ShowHistory;
