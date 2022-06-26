import styled from 'styled-components';

const Wrapper = styled.nav`
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 0px 0px;
  background-color: #fff;
  height: 80px;

  .logo {
    display: flex;
    align-items: center;
    .brand {
      margin: 0;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
  }
  .icons-container {
    display: flex;
    gap: 1rem;
    .icon svg {
      width: 2rem;
      height: auto;
      color: var(--muted-color);
    }

    [data-tooltip]::before {
      top: 100%;
      bottom: unset;
    }

    .icon.active svg {
      color: var(--primary);
    }
  }

  .toggle-btn {
    border-color: var(--muted-color);
    svg {
      width: 1.5rem;
      height: auto;
      color: var(--muted-color);
    }
  }

  li {
    padding: 0;
    .active {
      font-weight: bolder;
      color: var(--primary);
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: var(--primary);
    }
  }

  .nav-link:last-of-type {
    border-top: 1px solid #ccc;
    svg {
      color: var(--red-dark);
    }
  }

  summary {
    display: flex;
    align-items: center;

    h5 {
      margin: 0 8px;
      display: none;
      @media (min-width: 992px) {
        display: block;
      }
    }
    :focus {
      background-color: #00897b;
      h5 {
        color: white;
      }
    }
  }
`;
export default Wrapper;
