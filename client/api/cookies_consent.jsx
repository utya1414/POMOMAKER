import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(Cookies.get('cookieConsent') === 'true');
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 }); // クッキーの有効期限を1年に設定
    setAccepted(true);
  };

  if (accepted) {
    console.log('クッキーの使用に同意しています。');
    return null;
  }

  return (
    <div>
      <p>当サイトはクッキーを使用します。クッキーの使用に同意しますか？</p>
      <button onClick={handleAccept}>はい</button>
    </div>
  );
};

export default CookieConsent;