import React from 'react';
import styled from 'styled-components';
import CenteredImg from './centeredImg';
import Category from 'styles/category';
import DateTime from 'styles/dateTime';

const PostList = ({
  thumbnail,
  alt,
  category,
  title,
  excerpt,
  desc,
  date,
  korDate,
}) => {
  return (
    <Wrapper>
      <ImgWrapper>
        <CenteredImg src={thumbnail} alt={alt} />
      </ImgWrapper>
      <Text>
        <div>
          <Category>{category}</Category>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        <DateTime dateTime={date}>{korDate}</DateTime>
      </Text>
    </Wrapper>
  );
};

const ImgWrapper = styled.div`
  width: 132px;
  height: 132px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: var(--sizing-md);

  & > * {
    display: block;
  }
`;

const Wrapper = styled.div`
  display: flex;
  outline: 1px solid red;
`;

export default PostList;
