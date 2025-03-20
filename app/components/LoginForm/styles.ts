import styled from "styled-components";

export const StyledLogin = {
  Container: styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
    padding: 1.5rem;
  `,

  FormContainer: styled.div`
    max-width: 28rem;
    width: 100%;
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  `,

  Header: styled.div`
    text-align: center;
    margin-bottom: 2rem;
  `,

  Title: styled.h2`
    font-size: 1.875rem;
    font-weight: 600;
    color: #111827;
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,

  Group: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,

  Label: styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  `,

  Input: styled.input`
    width: 100%;
    padding: 1rem;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #111827;
    transition: all 0.2s ease;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
  `,

  Button: styled.button`
    width: 100%;
    padding: 1rem;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #1a1a1a;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,

  ErrorMessage: styled.div`
    padding: 1rem;
    background-color: #fee2e2;
    border: 1px solid #fca5a5;
    border-radius: 0.75rem;
    color: #b91c1c;
    font-size: 0.875rem;
  `,
};
