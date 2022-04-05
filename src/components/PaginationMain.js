import React from 'react';
import Pagination from 'react-js-pagination'

const PaginationMain = ({getActivePage, changePage, getPageCount}) => {

    return (
        <div>
               <Pagination
                   activePage={getActivePage === 0 ? 1 : getActivePage}
                   itemsCountPerPage={10}
                   totalItemsCount={getPageCount}
                   pageRangeDisplayed={8}
                   onChange={changePage}
                   itemClass="page-item"
                   // linkClass="page-link"
                   hideFirstLastPages={true}
                   hideDisabled={true}
               />
        </div>
    );
};

export default PaginationMain;