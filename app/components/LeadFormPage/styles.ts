import styled from "styled-components";

export const StyledForm = {
  Container: styled.div`
    max-width: 42rem;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  `,

  SubContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  `,

  Section: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 30rem;
    width: 100%;
    gap: 1.25rem;
  `,

  Group: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
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

    &:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }
  `,

  Select: styled.select`
    width: 100%;
    padding: 1rem;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #111827;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5em;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
  `,

  TextArea: styled.textarea`
    width: 100%;
    padding: 1rem;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #111827;
    min-height: 8rem;
    resize: vertical;
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

  CheckboxGrid: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `,

  CheckboxLabel: styled.label`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    cursor: pointer;

    input[type="checkbox"] {
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid #e5e7eb;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:checked {
        background-color: #2563eb;
        border-color: #2563eb;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'%3E%3C/path%3E%3C/svg%3E");
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }

      &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
      }
    }

    span {
      font-size: 1rem;
      color: #111827;
    }
  `,

  SubmitButton: styled.button`
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

  ErrorMessage: styled.p`
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  `,

  FileUploadContainer: styled.div`
    width: 100%;
    padding: 2rem;
    background: #ffffff;
    border: 1px dashed #e5e7eb;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #2563eb;
      background: #f8fafc;
    }
  `,

  FileInput: styled.input`
    display: none;
  `,

  FileUploadText: styled.p`
    font-size: 1rem;
    color: #6b7280;
    text-align: center;
  `,

  FileName: styled.span`
    font-size: 0.875rem;
    color: #111827;
    font-weight: 500;
  `,
};
