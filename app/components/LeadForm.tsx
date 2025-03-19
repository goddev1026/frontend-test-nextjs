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

const FormContainer = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.5rem;
`;

const FormMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30rem;
  gap: 1rem;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #111827;
  
  &::placeholder {
    color: #9CA3AF;
  }
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #111827;
  min-height: 8rem;
  resize: vertical;
  
  &::placeholder {
    color: #9CA3AF;
  }
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1a1a1a;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CheckboxGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
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
`;

const SuccessMessage = styled.div`
  background-color: #dcfce7;
  border: 1px solid #86efac;
  color: #166534;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;



const Select = styled.select`
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
  
  &::placeholder {
    color: #9CA3AF;
  }
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  citizenship: z.string().min(1, 'Please select your country of citizenship'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  visasOfInterest: z.array(z.string()).min(1, 'Select at least one visa type'),
  resume: z.instanceof(File).optional(),
  additionalInfo: z.string().optional(),
});

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <IntroHeader
          icon={formHeaderInfomationList.intro.icon}
          title={formHeaderInfomationList.intro.title}
          description={formHeaderInfomationList.intro.description}
        />
        <FormMainContainer>
          <FormGroup>
            <Input
              {...register('firstName')}
              type="text"
              placeholder="First Name"
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Input {...register('lastName')} type="text" placeholder="Last Name" />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Input {...register('email')} type="email" placeholder="Email" />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Select {...register('citizenship')} defaultValue="">
              <option value="" disabled>Country of Citizenship</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
            {errors.citizenship && (
              <ErrorMessage>{errors.citizenship.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Input {...register('linkedinProfile')} type="url" placeholder="LinkedIn / Personal Website URL" />
            {errors.linkedinProfile && (
              <ErrorMessage>{errors.linkedinProfile.message}</ErrorMessage>
            )}
          </FormGroup>
        </FormMainContainer>

        <IntroHeader
          icon={formHeaderInfomationList.visa.icon}
          title={formHeaderInfomationList.visa.title}
        />
        <FormMainContainer>
          <FormGroup>
            <CheckboxGrid>
              {visaOptions.map((visa) => (
                <CheckboxLabel key={visa}>
                  <input
                    type="checkbox"
                    value={visa}
                    {...register('visasOfInterest')}
                  />
                  <span>{visa}</span>
                </CheckboxLabel>
              ))}
            </CheckboxGrid>
            {errors.visasOfInterest && (
              <ErrorMessage>{errors.visasOfInterest.message}</ErrorMessage>
            )}
          </FormGroup>
        </FormMainContainer>

        <IntroHeader
          icon={formHeaderInfomationList.additionalInfo.icon}
          title={formHeaderInfomationList.additionalInfo.title}
        />
        <FormMainContainer>
          <FormGroup>
            <TextArea
              {...register('additionalInfo')}
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
              rows={8}
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </FormMainContainer>

      </Form>
    </FormContainer>
  );
} 