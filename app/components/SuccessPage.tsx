'use client';

import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Icon = styled.img`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.125rem;
  color: #111827;
  font-weight: bold;
  margin: 0;
  max-width: 36rem;
`;

const Button = styled.button`
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
`;

export default function SuccessPage() {
  return (
    <Container>
      <Icon src="/intro.png" />
      <Title>Thank You</Title>
      <Message>
        Your information was submitted to our team of immigration attorneys.
        Expect an email from hello@tryalma.ai.
      </Message>
      <Link href="/" style={{ width: '100%' }}>
        <Button>Go Back to Homepage</Button>
      </Link>
    </Container>
  );
} 