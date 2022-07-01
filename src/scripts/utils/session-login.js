const SessionLogin = () => {
  const dataSession = localStorage.getItem('loginfin');

  if (!dataSession) {
    window.location.href = '/';
    return;
  }

  const dataId = JSON.parse(dataSession);
  return dataId;
};

export default SessionLogin;
