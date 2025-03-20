import styled from "styled-components";

export const StyledSuccessPage = {
  Container: styled.div`
    max-width: 42rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  `,

  Icon: styled.img`
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Title: styled.h1`
    font-size: 2rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  `,

  Message: styled.p`
    font-size: 1.125rem;
    color: #111827;
    font-weight: bold;
    margin: 0;
    max-width: 36rem;
  `,

  Button: styled.button`
    width: 100%;
    max-width: 30rem;
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
  `,

  LinkWrapper: styled.a`
    width: 100%;
    text-decoration: none;
  `,
};
