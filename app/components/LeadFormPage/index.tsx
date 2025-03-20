'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LeadFormData } from '../../types';
import { useState } from 'react';
import IntroHeader from '../IntroHeader';
import { formHeaderInfomationList, countries, visaOptions } from '@/utils/common';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createLead } from '../../store/features/leadsSlice';
import { useRouter } from 'next/navigation';
import { StyledForm } from './styles';

// Form Validation Schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  citizenship: z.string().min(1, 'Please select your country of citizenship'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  visasOfInterest: z.array(z.string()).min(1, 'Select at least one visa type'),
  resume: z.instanceof(File, { message: 'Resume is required' }),
  additionalInfo: z.string().optional(),
});

export default function LeadForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('resume', file);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'resume' && value instanceof File) {
          formData.append('resume', value);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
      await dispatch(createLead(formData)).unwrap();
      router.push('/success');
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

          <StyledForm.Group>
            <StyledForm.FileUploadContainer>
              <StyledForm.FileInput
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                id="resume"
              />
              <label htmlFor="resume">
                {selectedFile ? (
                  <>
                    <StyledForm.FileName>{selectedFile.name}</StyledForm.FileName>
                    <StyledForm.FileUploadText>Click to change file</StyledForm.FileUploadText>
                  </>
                ) : (
                  <StyledForm.FileUploadText>
                    Drag and drop your resume here or click to browse
                  </StyledForm.FileUploadText>
                )}
              </label>
            </StyledForm.FileUploadContainer>
            {errors.resume && (
              <StyledForm.ErrorMessage>{errors.resume.message}</StyledForm.ErrorMessage>
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