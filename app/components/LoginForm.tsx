'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { login } from '../store/features/authSlice';

const StyledLogin = {
  Container: styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F9FAFB;
    padding: 1.5rem;
  `,

  FormContainer: styled.div`
    max-width: 28rem;
    width: 100%;
    background: white;
    border-radius: 1rem;
    padding: 2.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #111827;
    transition: all 0.2s ease;
    
    &::placeholder {
      color: #9CA3AF;
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
    background-color: #FEE2E2;
    border: 1px solid #FCA5A5;
    border-radius: 0.75rem;
    color: #B91C1C;
    font-size: 0.875rem;
  `
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { status, error } = useSelector((state: RootState) => state.auth);
  const isSubmitting = status === 'loading';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();
      router.push('/admin'); // Redirect to admin page after successful login
    } catch (err) {
      // Error handling is managed by Redux
    }
  };

  return (
    <StyledLogin.Container>
      <StyledLogin.FormContainer>
        <StyledLogin.Header>
          <StyledLogin.Title>Admin Login</StyledLogin.Title>
        </StyledLogin.Header>

        <StyledLogin.Form onSubmit={handleSubmit}>
          {error && (
            <StyledLogin.ErrorMessage>
              {error}
            </StyledLogin.ErrorMessage>
          )}

          <StyledLogin.Group>
            <StyledLogin.Label htmlFor="email">
              Email
            </StyledLogin.Label>
            <StyledLogin.Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </StyledLogin.Group>

          <StyledLogin.Group>
            <StyledLogin.Label htmlFor="password">
              Password
            </StyledLogin.Label>
            <StyledLogin.Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </StyledLogin.Group>

          <StyledLogin.Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </StyledLogin.Button>
        </StyledLogin.Form>
      </StyledLogin.FormContainer>
    </StyledLogin.Container>
  );
} 