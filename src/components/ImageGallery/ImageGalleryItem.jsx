export const ImageGalleryItem = ({ id, largeImageURL, tags }) => {
  return (
    <div className="modal">
      <img key={id} src={largeImageURL} alt={tags} height="500" width="900" />
    </div>
  );
};
