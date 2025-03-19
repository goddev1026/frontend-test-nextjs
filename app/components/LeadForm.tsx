'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';
import { LeadFormData } from '../types';
import { leadService } from '../services/leadService';
import { useState } from 'react';
import IntroHeader from './IntroHeader';
import { formHeaderInfomationList } from '@/utils/common';

const FormContainer = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.625rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuccessMessage = styled.div`
  background-color: #dcfce7;
  border: 1px solid #86efac;
  color: #166534;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const visaOptions = [
  'H1B',
  'L1',
  'E2',
  'O1',
  'EB1',
  'EB2',
  'EB3',
  'Other',
];

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
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
        <FormGroup>
          <Label>First Name</Label>
          <Input {...register('firstName')} type="text" />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <Input {...register('lastName')} type="text" />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input {...register('email')} type="email" />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>LinkedIn Profile</Label>
          <Input {...register('linkedinProfile')} type="url" />
          {errors.linkedinProfile && (
            <ErrorMessage>{errors.linkedinProfile.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Visas of Interest</Label>
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

        <FormGroup>
          <Label>Resume/CV</Label>
          <Input
            {...register('resume')}
            type="file"
            accept=".pdf,.doc,.docx"
          />
        </FormGroup>

        <FormGroup>
          <Label>Additional Information</Label>
          <TextArea
            {...register('additionalInfo')}
            rows={4}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
} 