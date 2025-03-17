import React from 'react';
import { Button } from './Button';
import '../styles/components/Pagination.css';

export const Pagination = ({ currentPage, onPrevious, onNext }) => (
  <div className="pagination">
    <Button onClick={onPrevious} disabled={currentPage === 1}>
      Previous
    </Button>
    <span>Page {currentPage}</span>
    <Button onClick={onNext}>Next</Button>
  </div>
);