import Wrapper from '../assets/Wrapper/AlertWrapper';

const Alert = ({ alertType, alertText }) => {
  return (
    <Wrapper>
      <div className={`alert alert-${alertType}`}>{alertText}</div>
    </Wrapper>
  );
};

export default Alert;
