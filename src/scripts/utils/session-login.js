const SessionLogin = () => {
  const dataSession = sessionStorage.getItem('loginfin');

  if (!dataSession) {
    window.location.href = '/';
    return;
  }

  const dataId = JSON.parse(dataSession);
  return dataId;
};

export default SessionLogin;
