import React, { useState, useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Spinner from "../Loader/Loader";
import fetchImages from "../../services/pixabay-api";

import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeImageId, setActiveImageId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [query, page]);
  useEffect(() => {
    handleScroll();
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const hadleChangeQuery = (query) => {
    setQuery(query);
    setPage(1);
    setData([]);
  };

  const getData = () => {
    if (query !== "" || page !== 1) {
      fetchImages(query, page)
        .then(({ hits }) => setData([...data, ...hits]))
        .then(handleScroll)
        .catch((error) => console.log(error.message));
    }
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const modalContentSet = (itemId) => {
    const element = data.find(({ id }) => id === itemId);

    setActiveImageId(element.largeImageURL);
  };

  const isNotLastPage = data.length / page === 12;
  const btnEnable = data.length > 0 && !isLoading && isNotLastPage;

  return (
    <div className="App">
      <Searchbar onSubmit={hadleChangeQuery} />
      {data.length === 0 ? (
        <h2>Enter query</h2>
      ) : (
        <>
          <ImageGallery
            images={data}
            onClick={toggleModal}
            onItemClick={modalContentSet}
          />

          {showModal && (
            <Modal content={activeImageId} onBackdrop={toggleModal} />
          )}
          {isLoading && <Spinner />}

          {btnEnable && <Button name="Load more" onPress={handleNextPage} />}
        </>
      )}
    </div>
  );
}
