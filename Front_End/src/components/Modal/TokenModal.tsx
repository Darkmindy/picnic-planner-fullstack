import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchNewToken } from '../../api/api';
import { useAuth } from '../../services/AuthContext';


const TokenModal: React.FC = () => {

  const { refreshToken, show, setShow } = useAuth();

  const handleClose = () => {
    setShow(false);

};

  const handleRefresh = async () => {
    await fetchNewToken(refreshToken);
    setShow(false);
  }
  //const handleShow = () => setShow(true);

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Attention! Token Expired.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your session token is expired. Please refresh your token or login again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRefresh}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TokenModal;