import img from '../assets/images/error.svg';
import Wrapper from '../assets/Wrapper/ErrorPageWrapper';
const Error = () => {
  return (
    <Wrapper className='container'>
      <div>
        <img src={img} alt='error' />
        <div className='grid'>
          <div>
            <h3>Page not found</h3>
            <p>We can't find the page you are looking for.</p>
          </div>

          <a href='/' role={'button'} className='outline'>
            Back home
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error;
