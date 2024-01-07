import { Component } from 'react';
import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './Styles';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    imgData: null,
    lastImages: [],
    isLoading: false,
    error: null,
    page: 1,
    per_page: 12,
    query: '',
    isOpenModal: false,
    modalData: null,
  };

  fetchImages = async query => {
    try {
      this.setState({
        isLoading: true,
      });

      const { data } = await axios.get(
        `?key=39583334-643e1265d57bd4d698c546928&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}&q=${query}&page=${this.state.page}`
      );

      this.setState(prevState => ({
        imgData: [...prevState.imgData, ...data.hits],
        lastImages: data.hits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSearchInput = query => {
    this.setState({ imgData: [], page: 1, query });
  };

  componentDidUpdate(_, prevState) {
    const { query } = this.state;

    if (prevState.query !== query) {
      this.handleSearchInput(query);
      this.fetchImages(query);
    }
  }

  handleButton = () => {
    const { query } = this.state;
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        isLoading: true,
      }),
      () => {
        this.fetchImages(query);
      }
    );
  };

  openModal = someDataToModal => {
    this.setState({
      isOpenModal: true,
      modalData: someDataToModal,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const { imgData, isLoading, error, isOpenModal, lastImages } = this.state;

    return (
      <div>
        <Searchbar handleSearchInput={this.handleSearchInput} />
        {error !== null && (
          <ErrorMessage>
            <b>Sorry, an error occurred {error}!</b>
          </ErrorMessage>
        )}
        <ImageGallery imgData={imgData} openModal={this.openModal} />
        {isLoading && <Loader />}
        {!error && !isLoading && imgData && lastImages.length >= 12 && (
          <Button handleButton={this.handleButton} />
        )}
        {isOpenModal && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
