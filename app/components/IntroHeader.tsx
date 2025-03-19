"use client"

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const HeaderIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

interface HeaderContainerProps {
  icon: string;
  title: string;
  description?: string;
}

export default function IntroHeader({ icon, title, description }: HeaderContainerProps) {
  return (
    <HeaderContainer>
      <HeaderIcon src={icon} alt={title} />
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </HeaderContainer>
  )
}
