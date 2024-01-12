import React, { useEffect, useState } from "react";
import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages,
} from "chakra-paginator";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const Pagination = ({ totalItems, curPage, setCurPage, itemLimit }) => {
  const [pagesQuantity, setPagesQuantity] = useState(4);

  const normalStyles = {
    bg: "white",
  };

  const activeStyles = {
    bg: "blue.300",
  };

  const handlePageChange = (page) => {
    setCurPage(page - 1);
  };

  useEffect(() => {
    const pagesTotal = Math.ceil(totalItems / itemLimit);
    setPagesQuantity(pagesTotal);
  }, [totalItems, itemLimit]);
  return (
    <>
      <Paginator
        onPageChange={handlePageChange}
        pagesQuantity={pagesQuantity - 1}
      >
        <Previous bg="white">
          <CgChevronLeft />
        </Previous>
        <PageGroup>
          {generatePages(pagesQuantity)?.map((page) => (
            <Page
              key={`paginator_page_${page}`}
              page={page}
              normalStyles={normalStyles}
              activeStyles={activeStyles}
            />
          ))}
        </PageGroup>
        <Next bg="white">
          <CgChevronRight />
        </Next>
      </Paginator>
    </>
  );
};

export default Pagination;
