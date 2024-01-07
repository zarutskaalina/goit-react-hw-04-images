import { StyledModal } from './ModalStyles';
import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem';
import { useEffect } from 'react';

export const Modal = ({ modalData, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <StyledModal onClick={handleOverlayClick}>
      <div className="modal">
        <ImageGalleryItem
          id={modalData.id}
          largeImageURL={modalData.largeImageURL}
          tags={modalData.tags}
        />
      </div>
    </StyledModal>
  );
};
