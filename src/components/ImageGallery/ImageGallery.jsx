import { GalleryContainer } from './ImageGalleryStyles';

export const ImageGallery = ({ imgData, openModal }) => {
  return (
    <GalleryContainer>
      {imgData !== null &&
        imgData.map(image => {
          return (
            <li key={image.id}>
              <img
                onClick={() =>
                  openModal({
                    id: image.id,
                    largeImageURL: image.largeImageURL,
                    tags: image.tags,
                  })
                }
                src={image.webformatURL}
                alt={image.tags}
                width="300"
                height="200"
                loading="lazy"
              ></img>
            </li>
          );
        })}
    </GalleryContainer>
  );
};
