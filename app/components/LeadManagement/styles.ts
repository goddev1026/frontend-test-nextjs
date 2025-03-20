import styled from "styled-components";

export const StyledLeadManagement = {
  Layout: styled.div`
    display: flex;
    min-height: 100vh;
  `,

  Sidebar: styled.div`
    width: 250px;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    padding: 1.5rem;
  `,

  Logo: styled.div`
    padding: 1rem 0;
    margin-bottom: 2rem;
  `,

  NavItem: styled.div<{ active?: boolean }>`
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    color: ${(props) => (props.active ? "#111827" : "#6B7280")};
    background-color: ${(props) => (props.active ? "#F3F4F6" : "transparent")};
    font-weight: ${(props) => (props.active ? "500" : "normal")};

    &:hover {
      background-color: #f3f4f6;
    }
  `,

  Main: styled.main`
    flex: 1;
    background-color: #f9fafb;
    padding: 2rem;
  `,

  Header: styled.div`
    margin-bottom: 2rem;
  `,

  Title: styled.h1`
    font-size: 1.875rem;
    font-weight: 600;
    color: #111827;
  `,

  Controls: styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  `,

  Search: styled.input`
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
  `,

  StatusFilter: styled.select`
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.25em;

    &:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
  `,

  Table: styled.table`
    width: 100%;
    background-color: #ffffff;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  `,

  Th: styled.th`
    padding: 0.75rem 1rem;
    text-align: left;
    color: #374151;
    font-weight: 500;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;

    &:hover {
      background-color: #f9fafb;
    }
  `,

  Td: styled.td`
    padding: 1rem;
    color: #111827;
    border-bottom: 1px solid #e5e7eb;
  `,

  Status: styled.span<{ status: "PENDING" | "REACHED_OUT" }>`
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    ${(props) =>
      props.status === "PENDING"
        ? "background-color: #FEF3C7; color: #92400E;"
        : "background-color: #D1FAE5; color: #065F46;"}
  `,

  Pagination: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
  `,

  PageButton: styled.button<{ active?: boolean }>`
    padding: 0.5rem 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background-color: ${(props) => (props.active ? "#111827" : "#FFFFFF")};
    color: ${(props) => (props.active ? "#FFFFFF" : "#374151")};

    &:hover {
      background-color: ${(props) => (props.active ? "#111827" : "#F3F4F6")};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
};
