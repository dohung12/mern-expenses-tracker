import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: #fff;
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
    }
    img {
      width: 50%;
      height: auto;
      margin: auto;
      padding: 1rem;
    }
    .nav-links {
      padding-top: 2rem;
      padding-bottom: 2rem;
      display: flex;
      flex-direction: column;

      h3 {
        text-align: center;
        margin: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        color: var(--primary);
      }
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--contrast);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
      margin: 0;
    }
    .nav-link:hover {
      background: #d9ecda;
      padding-left: 3rem;
      color: var(--primary);
      font-weight: bolder;
      text-decoration: none;
    }
    .nav-link:hover .icon svg {
      color: var(--primary);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: var(--primary);
    }
    .active .icon svg {
      color: var(--primary);
    }
  }
`;

export default Wrapper;
