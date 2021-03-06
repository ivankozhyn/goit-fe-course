import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import menuOperations from '../../../modules/menu/menuOperations';
import ModalMenuPage from './ModalMenuPage';
import s from './ModalMenuPageContainer.module.css';

class ModalMenuPageContainer extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick);
    window.addEventListener('keydown', this.handleEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleWindowClick = e => {
    if (this.backdropRef.current !== e.target) {
      return;
    }
    this.onClose();
  };

  handleEscClick = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.onClose();
  };

  onClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  render() {
    const { menuOneItemForModal } = this.props;
    return (
      <div className={s.backdrop} ref={this.backdropRef}>
        <ModalMenuPage
          menuOneItemForModal={menuOneItemForModal}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  closeModal: menuOperations.closeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(ModalMenuPageContainer);
