'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login } from '../../store/features/authSlice';
import { StyledLogin } from './styles';

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
      router.push('/admin');
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