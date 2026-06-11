import React, { useState } from 'react';
import NewsBox from '../molecules/NewsBox';
import { ArrowRightAlt, ChevronLeft, ChevronRight, CloseIcon } from '../atoms/Icons';

import { assetUrl } from '../../utils/media';
const NewsColList = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const LOAD_INCREMENT = 3;

  const allItems = data;

  const handleClose = () => setSelectedIndex(null);
  const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % allItems.length);
  const handleLoadMore = () => setVisibleCount((prev) => Math.min(prev + LOAD_INCREMENT, allItems.length));
  const handleViewLess = () => setVisibleCount(6);

  const itemsToShow = allItems.slice(0, visibleCount);

  return (
    <>
      <div className="row">
        {itemsToShow.map((item, index) => (
          <NewsBox key={index} item={item} index={index} onClick={setSelectedIndex} />
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={assetUrl(allItems[selectedIndex].image[0].filepath)} alt={allItems[selectedIndex].alt} className="modal-img" />
            <button className="prev-btn" onClick={handlePrev}><ChevronLeft /></button>
            <button className="next-btn" onClick={handleNext}><ChevronRight /></button>
            <button className="close-btn" onClick={handleClose}><CloseIcon /></button>
          </div>
        </div>
      )}

      {allItems.length > 6 && (
        <div className="text-start mt-4">
          {visibleCount < allItems.length ? (
            <button className="mr-btn border-0" onClick={handleLoadMore}> View More <ArrowRightAlt /> </button>
          ) : (
            <button className="mr-btn border-0" onClick={handleViewLess}> View Less <ArrowRightAlt /></button>
          )}
        </div>
      )}
    </>
  );
};



export default NewsColList;
