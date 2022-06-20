const logout = () => {
  // if url /#/logout is called, logout the user
  if (window.location.hash === '#/logout') {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/logout');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-token', JSON.parse(localStorage.getItem('data')).token);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('logout successful');
        localStorage.removeItem('data');
        window.location.hash = '#/';
        // remove idb data
      }
    };
    xhr.onerror = () => {
      console.log('logout failed');
    };
  }
};

export default logout;
