import Wrapper from '../assets/Wrapper/AvatarWrapper';
const Avatar = ({ src }) => {
  return (
    <Wrapper>
      <img src={src} alt='avatar' crossOrigin='anonymous' />
    </Wrapper>
  );
};

export default Avatar;
