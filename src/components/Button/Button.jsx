import { ContainerBtn } from './ButtonStyles';

export const Button = ({ handleButton }) => {
  return (
    <ContainerBtn>
      <button className="loadMoreBtn" type="button" onClick={handleButton}>
        Load more
      </button>
    </ContainerBtn>
  );
};
