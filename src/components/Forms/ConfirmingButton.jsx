import { useState } from 'react';

export default function ConfirmingButton({ id, children, message, onConfirm }) {
  const [confirming, setConfirming] = useState(false);
  return <>
    { confirming
      ? <div>
        <div data-testid={`confirm-message-${id}`}>
          {message}
        </div>
        <button
          data-testid={`confirm-confirmation-button-${id}`}
          onClick={() => onConfirm(id)}
        >
            confirm
        </button>
        <button
          data-testid={`confirm-deny-button-${id}`}
          onClick={() => setConfirming(false)}
        >
            deny
        </button>
      </div>
      : <button
        data-testid={`confirm-initiate-button-${id}`}
        onClick={() => setConfirming(true)}
      >
        {children}
      </button>
    }
  </>;
}
