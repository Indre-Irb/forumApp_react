import React, {useContext} from 'react';
import Pagination from 'react-js-pagination'

const PaginationMain = ({getActivePage, changePage, getPageCount}) => {

    return (
        <div>
               <Pagination
                   activePage={getActivePage === 0 ? 1 : getActivePage}
                   itemsCountPerPage={10}
                   totalItemsCount={getPageCount}
                   pageRangeDisplayed={5}
                   onChange={changePage}
                   // itemClass="page-item"
                   hideFirstLastPages={true}
                   nextPageText='Next >'
                   prevPageText='< Previous'
                   hideDisabled={true}
               />
        </div>
    );
};

export default PaginationMain;