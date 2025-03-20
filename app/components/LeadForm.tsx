'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';
import { LeadFormData } from '../types';
import { leadService } from '../services/leadService';
import { useState } from 'react';
import IntroHeader from './IntroHeader';
import { formHeaderInfomationList, countries, visaOptions } from '@/utils/common';

// Styled Components
const StyledForm = {
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

    &:disabled {
      background-color: #F3F4F6;
      cursor: not-allowed;
    }
  `,

  Select: styled.select`
    width: 100%;
    padding: 1rem;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
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
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #111827;
    min-height: 8rem;
    resize: vertical;
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
      border: 2px solid #E5E7EB;
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
    background: #FFFFFF;
    border: 1px dashed #E5E7EB;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: #2563eb;
      background: #F8FAFC;
    }
  `,

  FileInput: styled.input`
    display: none;
  `,

  FileUploadText: styled.p`
    font-size: 1rem;
    color: #6B7280;
    text-align: center;
  `,

  FileName: styled.span`
    font-size: 0.875rem;
    color: #111827;
    font-weight: 500;
  `
};

// Form Validation Schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  citizenship: z.string().min(1, 'Please select your country of citizenship'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  visasOfInterest: z.array(z.string()).min(1, 'Select at least one visa type'),
  additionalInfo: z.string().optional(),
});

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      setIsSubmitting(true);

      await leadService.createLead(data);

      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledForm.Container>
      <StyledForm.Form onSubmit={handleSubmit(onSubmit)}>
        <IntroHeader
          icon={formHeaderInfomationList.intro.icon}
          title={formHeaderInfomationList.intro.title}
          description={formHeaderInfomationList.intro.description}
        />

        {/* Personal Information Section */}
        <StyledForm.Section>
          <StyledForm.Group>
            <StyledForm.Input
              {...register('firstName')}
              type="text"
              placeholder="First Name"
            />
            {errors.firstName && (
              <StyledForm.ErrorMessage>{errors.firstName.message}</StyledForm.ErrorMessage>
            )}
          </StyledForm.Group>

          <StyledForm.Group>
            <StyledForm.Input
              {...register('lastName')}
              type="text"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <StyledForm.ErrorMessage>{errors.lastName.message}</StyledForm.ErrorMessage>
            )}
          </StyledForm.Group>

          <StyledForm.Group>
            <StyledForm.Input
              {...register('email')}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <StyledForm.ErrorMessage>{errors.email.message}</StyledForm.ErrorMessage>
            )}
          </StyledForm.Group>

          <StyledForm.Group>
            <StyledForm.Select {...register('citizenship')} defaultValue="">
              <option value="" disabled>Country of Citizenship</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </StyledForm.Select>
            {errors.citizenship && (
              <StyledForm.ErrorMessage>{errors.citizenship.message}</StyledForm.ErrorMessage>
            )}
          </StyledForm.Group>

          <StyledForm.Group>
            <StyledForm.Input
              {...register('linkedinProfile')}
              type="url"
              placeholder="LinkedIn / Personal Website URL"
            />
            {errors.linkedinProfile && (
              <StyledForm.ErrorMessage>{errors.linkedinProfile.message}</StyledForm.ErrorMessage>
            )}
          </StyledForm.Group>
        </StyledForm.Section>

        {/* Visa Information Section */}
        <StyledForm.SubContainer>
          <IntroHeader
            icon={formHeaderInfomationList.visa.icon}
            title={formHeaderInfomationList.visa.title}
          />
          <StyledForm.Section>
            <StyledForm.Group>
              <StyledForm.CheckboxGrid>
                {visaOptions.map((visa) => (
                  <StyledForm.CheckboxLabel key={visa}>
                    <input
                      type="checkbox"
                      value={visa}
                      {...register('visasOfInterest')}
                    />
                    <span>{visa}</span>
                  </StyledForm.CheckboxLabel>
                ))}
              </StyledForm.CheckboxGrid>
              {errors.visasOfInterest && (
                <StyledForm.ErrorMessage>{errors.visasOfInterest.message}</StyledForm.ErrorMessage>
              )}
            </StyledForm.Group>
          </StyledForm.Section>
        </StyledForm.SubContainer>

        {/* Additional Information Section */}
        <StyledForm.SubContainer>
          <IntroHeader
            icon={formHeaderInfomationList.additionalInfo.icon}
            title={formHeaderInfomationList.additionalInfo.title}
          />
          <StyledForm.Section>
            <StyledForm.Group>
              <StyledForm.TextArea
                {...register('additionalInfo')}
                placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
                rows={8}
              />
            </StyledForm.Group>
          </StyledForm.Section>
        </StyledForm.SubContainer>
        <StyledForm.Section>
          <StyledForm.SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </StyledForm.SubmitButton>
        </StyledForm.Section>
      </StyledForm.Form>
    </StyledForm.Container>
  );
} 