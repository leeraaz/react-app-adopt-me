import { Component } from "react";
import { useParams, useState } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false, adopt: 0 };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }
  
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adoptMe = () => {
    this.setState({ adopt: this.state.adopt + 1 });
    this.toggleModal();
  };

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      images,
      showModal,
      adopt,
    } = this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1 id="dog-name">{name}</h1>
          <h2 id="dog-details">{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <p className="items-center">I'm adopted <strong data-cy="adopt-count">{adopt}</strong> times.</p>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                data-cy="adopt-me"
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div className="buttons">
                <h1>Would you like to adopt {name}?</h1>
                <button onClick={this.adoptMe}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
