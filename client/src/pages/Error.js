import img from '../assets/images/error.svg';
import Wrapper from '../assets/Wrapper/ErrorPageWrapper';
const Error = () => {
  return (
    <Wrapper className='container'>
      <div>
        <img src={img} alt='error' />
        <div className='grid'>
          <a href='/' role={'button'} className='btn'>
            Back home
          </a>
          <hgroup>
            <h3>Page not found</h3>
            <p>We can't find the page you are looking for.</p>
          </hgroup>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error;
