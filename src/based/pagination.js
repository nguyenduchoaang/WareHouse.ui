import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

export default function PaginationBase(props) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    props.onChangePage(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      props.onChangePage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < props.totalPages) {
      setCurrentPage(currentPage + 1);
      props.onChangePage(currentPage + 1);
    }
  };

  const renderPaginationItems = () => {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(props.totalPages, currentPage + 1);

    let items = [];
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePreviousClick();
            }}
          />
        </PaginationItem>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {renderPaginationItems()}
        {currentPage < props.totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNextClick();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
