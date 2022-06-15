import {Link, useSearchParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppContainer from './AppContainer';
import Pagination from 'react-js-pagination';

const ShowHistory = () =>{

    const [spinner, setSpinner] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    //final array to store filter that going to pass in url
    const [arrTitle , setArrTitle] = useState([]);
    const [arrDesc , setArrDesc] = useState([]);
    const [arrDate , setArrDate] = useState([]);

    //variables to store the input from user
    const [titleFilterText, setTitleFilterText] = useState(null);
    const [descFilterText, setDescFilterText] = useState(null);
    const [dateFilterText, setDateFilterText] = useState(null);

    //call api to get data
    const fetchResult = async (pageNumber = 1) => {
        setSpinner(true);

        searchParams.delete('titleFilter');
        searchParams.delete('descFilter');
        searchParams.delete('dateFilter');
        if(arrTitle.length>0)
        {
            searchParams.set('titleFilter', JSON.stringify(arrTitle));
        }

        if(arrDesc.length>0)
        {
            searchParams.set('descFilter',JSON.stringify(arrDesc));
        }

        if(arrDate.length>0)
        {
            searchParams.set('dateFilter',JSON.stringify(arrDate));
        }

        await axios.get('http://localhost/api/results?page='+pageNumber+'&'+searchParams)
        .then(res => {
            setSpinner(false);
            setPagination(res.data);
            setResults(res.data.data);
        }).catch (error => {
            console.log(error);
        });
    };

    useEffect( () => {
        fetchResult();
    }, [])

    //return result from db
    const [results, setResults] = useState([]);
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

    //show loading when fetching data
    const returnLoading = () => {
        return <div id='loading'>LOADING...</div>
    }

    //return pagination
    const [paginations, setPagination] = useState();
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

    //filter
    //variables to store filters for display
    const [titleFilter, setTitleFilter] = useState([]);
    const [descFilter, setDescFilter] = useState([]);
    const [dateFilter, setDateFilter] = useState([]);

    const appendToDiv = (e) =>{
        const source = e.target.getAttribute("name");
        switch(source){
            case "title":
                if (titleFilterText !== undefined && titleFilterText !==null && titleFilterText !== '')
                {
                    setTitleFilter(titleFilter.concat(<span className="cSpan" name={titleFilterText}>{titleFilterText}<i name={titleFilterText} onClick={removeFromDiv} className="title fa fa-minus btnRemove"></i></span>));
                    setArrTitle([...arrTitle,titleFilterText]);
                }
                break;

            case "desc":
                if (descFilterText !== undefined && descFilterText !==null && descFilterText !== '')
                {
                    setDescFilter(descFilter.concat(<span className="cSpan" name={descFilterText}>{descFilterText}<i name={descFilterText} onClick={removeFromDiv} className="desc fa fa-minus btnRemove"></i></span>));
                    setArrDesc([...arrDesc,descFilterText]);
                }
                break;

            case "date":
                if (dateFilterText !== undefined && dateFilterText !==null && dateFilterText !== '')
                {
                    setDateFilter(dateFilter.concat(<span className="cSpan" name={dateFilterText}>{dateFilterText}<i name={dateFilterText} onClick={removeFromDiv} className="date fa fa-minus btnRemove"></i></span>));
                    setArrDate([...arrDate,dateFilterText]);
                }
                break;
        }
    }

    const removeFromDiv = (e) =>{
        const source = e.target.getAttribute('class');
        const name= e.target.getAttribute('name');
        if (source.includes('title'))
        {
            setTitleFilter(titleFilter.filter(item => item.name !== name));
            setArrTitle(arrTitle.filter(title => title !== name));
        }
        else if(source.includes('desc'))
        {
            setDescFilter(descFilter.filter(item => item.name !== name));
            setArrDesc(arrDesc.filter(desc => desc !== name));
        }
        else if(source.includes('date'))
        {
            setDateFilter(dateFilter.filter(item => item.name !== name));
            setArrDate(arrDate.filter(date => date !== name));
        }
    }

    const handlechange = (e) =>{
        const source = e.target.name;
        switch(source){
            case "title":
                setTitleFilterText(e.target.value);
                break;

            case "desc":
                setDescFilterText(e.target.value);
                break;

            case "date":
                setDateFilterText(e.target.value);
                break;
        }
    }

    return (
        <AppContainer title="Laravel Practice - Result">
            <div id = "btnMainPage">
                <Link to='/'><button>Main Page</button></Link>
            </div>
            <div id='filter'>
                <div id='titleFilterDiv'>
                    <input type='text' placeholder='Filter for title' name='title' value={titleFilterText || ''} onChange={handlechange} id='titleFilter'></input>
                    <i name='title' onClick={appendToDiv} id='add' className="fa fa-plus"></i>
                    {titleFilter}
                </div>

                <div id='descFilterDiv'>
                    <input type='text' placeholder='Filter for description' id='descFilter' className='filterTextbox' name='desc' value={descFilterText || ''} onChange={handlechange}></input>
                    <i name='desc' onClick={appendToDiv} id='add' className="fa fa-plus"></i>
                    {descFilter}
                </div>

               <div id='dateFilterDiv'>
                   <input type='date' placeholder='Filter for title' id='dateFilter' className='filterTextbox' name='date' value={dateFilterText || ''} onChange={handlechange}></input>
                   <i name='date' onClick={appendToDiv} id='add' className="fa fa-plus"></i>
                   {dateFilter}
               </div>
               <button id='btnFilter' onClick={fetchResult}>Filter</button>
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
