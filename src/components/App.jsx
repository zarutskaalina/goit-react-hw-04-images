import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './Styles';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const App = () => {
  const [imgData, setImgData] = useState(null);
  const [lastImages, setLastImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const perPage = 12;

  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(
        `?key=39583334-643e1265d57bd4d698c546928&image_type=photo&orientation=horizontal&per_page=${perPage}&q=${query}&page=${page}`
      );

      setLastImages(data.hits);
      setImgData(prevState => [...prevState, ...data.hits]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, query]);

  const handleSearchInput = query => {
    setImgData([]);
    setPage(1);
    setQuery(query);
  };

  useEffect(() => {
    handleSearchInput(query);
    fetchImages(query);
  }, [query, fetchImages]);

  const handleButton = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
    fetchImages(query);
  };

  const openModal = someDataToModal => {
    setIsOpenModal(true);
    setModalData(someDataToModal);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  return (
    <div>
      <Searchbar handleSearchInput={handleSearchInput} />
      {error !== null && (
        <ErrorMessage>
          <b>Sorry, an error occurred {error}!</b>
        </ErrorMessage>
      )}
      <ImageGallery imgData={imgData} openModal={openModal} />
      {isLoading && <Loader />}
      {!error && !isLoading && imgData && lastImages.length >= 12 && (
        <Button handleButton={handleButton} />
      )}
      {isOpenModal && <Modal closeModal={closeModal} modalData={modalData} />}
    </div>
  );
};
