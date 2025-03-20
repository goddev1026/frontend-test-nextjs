'use client';

import Link from 'next/link';
import { StyledSuccessPage as S } from './styles';

export default function SuccessPage() {
  return (
    <S.Container>
      <S.Icon src="/intro.png" alt="Success" />
      <S.Title>Thank You</S.Title>
      <S.Message>
        Your information was submitted to our team of immigration attorneys.
        Expect an email from hello@tryalma.ai.
      </S.Message>
      <Link href="/" passHref legacyBehavior>
        <S.LinkWrapper>
          <S.Button>Go Back to Homepage</S.Button>
        </S.LinkWrapper>
      </Link>
    </S.Container>
  );
} 