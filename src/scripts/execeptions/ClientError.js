import Swal from 'sweetalert2';

class ClientError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ClientError';
    this.render(message);
  }

  render(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}

export default ClientError;
