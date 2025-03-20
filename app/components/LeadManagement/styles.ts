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

  UserSection: styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 250px;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background-color: #ffffff;
  `,

  UserButton: styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
      background-color: #f3f4f6;
    }
  `,

  UserAvatar: styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #6b7280;
  `,

  UserInfo: styled.div`
    text-align: left;
  `,

  UserName: styled.div`
    font-weight: 500;
    color: #111827;
  `,

  UserEmail: styled.div`
    font-size: 0.875rem;
    color: #6b7280;
  `,

  UserDropdown: styled.div<{ isOpen: boolean }>`
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    border-top: 1px solid #e5e7eb;
    display: ${(props) => (props.isOpen ? "block" : "none")};
  `,

  LogoutButton: styled.button`
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: left;
    border: none;
    background: transparent;
    color: #dc2626;
    cursor: pointer;

    &:hover {
      background-color: #f3f4f6;
    }
  `,

  Table: styled.table`
    width: 100%;
    background-color: #ffffff;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    border-spacing: 0;
  `,

  Th: styled.th`
    padding: 0.875rem 1.5rem;
    text-align: left;
    color: #6b7280;
    font-weight: 500;
    font-size: 0.875rem;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    white-space: nowrap;

    &:first-child {
      padding-left: 1.5rem;
    }
  `,

  Td: styled.td`
    padding: 1rem 1.5rem;
    color: #111827;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.875rem;

    &:first-child {
      padding-left: 1.5rem;
    }
  `,

  Status: styled.span<{ status: "PENDING" | "REACHED_OUT" }>`
    padding: 0.375rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    ${(props) =>
      props.status === "PENDING"
        ? "background-color: #FEF3C7; color: #92400E;"
        : "background-color: #D1FAE5; color: #065F46;"}
  `,

  Controls: styled.div`
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    align-items: center;
  `,

  Search: styled.input`
    flex: 1;
    max-width: 24rem;
    padding: 0.625rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    font-size: 0.875rem;

    &::placeholder {
      color: #9ca3af;
    }
  `,

  StatusFilter: styled.select`
    padding: 0.625rem 2rem 0.625rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    font-size: 0.875rem;
    color: #111827;
  `,

  Pagination: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.25rem;
    margin-top: 1.5rem;
    padding: 0 1rem;
  `,

  PageButton: styled.button<{ active?: boolean }>`
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background-color: ${(props) => (props.active ? "#111827" : "#FFFFFF")};
    color: ${(props) => (props.active ? "#FFFFFF" : "#374151")};
    font-size: 0.875rem;

    &:hover:not(:disabled) {
      background-color: ${(props) => (props.active ? "#111827" : "#F3F4F6")};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
};
