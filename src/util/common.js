export const registerCheck = (email, password = '', password2 = '') => {
  const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!reg.test(email)) {
    return { res: false, err: 'Emailアドレスを正しく入力して下さい' };
  }
  if (password) {
    if (password !== password2) {
      return { res: false, err: 'パスワードが正しく入力して下さい' };
    }
    if (password.length < 8) {
      return { res: false, err: 'パスワードを８桁以上に設定して下さい' };
    }
  }
  return { res: true };
};
