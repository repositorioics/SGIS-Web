import React from 'react';
import Cargador from '@/components/Cargador';
import successImage from '@/assets/images/success.png';
import errorImage from '@/assets/images/error.png';
import '@/assets/styles/autenticacion/ActivateAccount.css';

const PaginaActivarCuenta = ({ status, onNavigateToLogin }) => {
  return (
    <div className="activate-account">
      {status === 'loading' && (
        <div className="activate-account__loading">
          <Cargador />
        </div>
      )}

      {status === 'success' && (
        <div className="activate-account__success">
          <img src={successImage} alt="Success" className="activate-account__image" />
          <h1 className="activate-account__title" style={{ color: '#28A745' }}>
            Account Activated!
          </h1>
          <p className="activate-account__description">
            Your account has been successfully activated. You can now log in to your account.
          </p>
          <button className="activate-account__button" onClick={onNavigateToLogin}>
            Go to Login
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="activate-account__error">
          <img src={errorImage} alt="Error" className="activate-account__image" />
          <h1 className="activate-account__title" style={{ color: '#DC3545' }}>
            Activation Failed
          </h1>
          <p className="activate-account__description">
            The activation link is invalid or has expired. Please contact support for assistance.
          </p>
          <button className="activate-account__button" onClick={onNavigateToLogin}>
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginaActivarCuenta;