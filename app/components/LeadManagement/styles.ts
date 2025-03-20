import styled from "styled-components";

// Add breakpoints
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export const StyledLeadManagement = {
  Layout: styled.div`
    display: flex;
    min-height: 100vh;
    position: relative;

    @media (max-width: ${breakpoints.md}) {
      flex-direction: column;
    }
  `,

  Sidebar: styled.div`
    width: 250px;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    padding: 1.5rem;
    height: 100vh;
    position: fixed;

    @media (max-width: ${breakpoints.md}) {
      width: 100%;
      height: auto;
      position: static;
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem;
    }
  `,

  MobileMenuButton: styled.button`
    display: none;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      margin-left: auto;
    }
  `,

  Navigation: styled.div<{ isOpen: boolean }>`
    @media (max-width: ${breakpoints.md}) {
      display: ${(props) => (props.isOpen ? "block" : "none")};
    }
  `,

  Logo: styled.div`
    padding: 1rem 0;
    margin-bottom: 2rem;

    @media (max-width: ${breakpoints.md}) {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,

  Main: styled.main`
    flex: 1;
    background-color: #f9fafb;
    padding: 2rem;
    margin-left: 250px;

    @media (max-width: ${breakpoints.md}) {
      margin-left: 0;
      padding: 1rem;
    }
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
    position: fixed;
    bottom: 0;
    left: 0;
    width: 250px;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background-color: #ffffff;

    @media (max-width: ${breakpoints.md}) {
      position: static;
      width: 100%;
    }
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

  TableContainer: styled.div`
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    background-color: #ffffff;

    @media (max-width: ${breakpoints.md}) {
      border-radius: 0.5rem;
      margin: 0 -1rem;
      width: calc(100% + 2rem);
      border-left: none;
      border-right: none;
      border-radius: 0;
    }
  `,

  Table: styled.table`
    width: 100%;
    min-width: 750px;
    background-color: #ffffff;
    border-collapse: separate;
    border-spacing: 0;

    @media (max-width: ${breakpoints.md}) {
      border: none;
    }
  `,

  Th: styled.th`
    position: sticky;
    top: 0;
    background-color: #ffffff;
    padding: 0.875rem 1.5rem;
    text-align: left;
    color: #6b7280;
    font-weight: 500;
    font-size: 0.875rem;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    white-space: nowrap;
    z-index: 1;

    &:first-child {
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }

    @media (max-width: ${breakpoints.md}) {
      padding: 0.75rem 1rem;

      &:first-child {
        padding-left: 1rem;
      }

      &:last-child {
        padding-right: 1rem;
      }
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

    &:last-child {
      padding-right: 1.5rem;
    }

    @media (max-width: ${breakpoints.md}) {
      padding: 0.75rem 1rem;

      &:first-child {
        padding-left: 1rem;
      }

      &:last-child {
        padding-right: 1rem;
      }
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

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      align-items: stretch;
    }
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

    @media (max-width: ${breakpoints.sm}) {
      justify-content: center;
      flex-wrap: wrap;
    }
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

  NavigationContainer: styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;

    @media (max-width: ${breakpoints.md}) {
      margin-bottom: 1rem;
    }
  `,

  NavItem: styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: ${(props) => (props.active ? "#111827" : "#6B7280")};
    background-color: ${(props) => (props.active ? "#F3F4F6" : "transparent")};
    font-weight: ${(props) => (props.active ? "500" : "normal")};
    font-size: 0.875rem;

    &:hover {
      background-color: #f3f4f6;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `,
};
