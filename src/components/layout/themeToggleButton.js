import React, { useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'components/layout/layout';
import { DARK } from 'constants/constants';

const INPUT_ID = 'themeToggler';
const ENTER = 'Enter';
const SPACE_BAR = ' ';
const LABEL_TEXT = '다크 모드로 보기';

const ThemeToggleButton = ({ themeToggler }) => {
  const theme = useContext(ThemeContext);
  const inputRef = useRef(null);
  const isDarkTheme = (currTheme) => (currTheme === DARK ? true : false);

  const handleKeyPress = (e) => {
    if (e.key === SPACE_BAR || e.key === ENTER) themeToggler();
  };

  useLayoutEffect(() => {
    if (!inputRef) return;
    isDarkTheme(theme)
      ? (inputRef.current.checked = true)
      : (inputRef.current.checked = false);
  }, [theme]);

  return (
    <ThemeToggleButtonWrap>
      <input
        ref={inputRef}
        className="visually-hidden"
        type="checkbox"
        id={INPUT_ID}
        name={INPUT_ID}
        onKeyPress={handleKeyPress}
        checked={isDarkTheme(theme)}
        readOnly
      />
      <ToggleLabel htmlFor={INPUT_ID} onClick={themeToggler}>
        <InnerCircle />
        <svg
          version="1.1"
          width="16"
          height="16"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
        >
          <path
            d="M16.3,15.2c-4.1-1.2-7.2-4.8-7.5-9.1C8.8,4.8,8.9,3.5,9.3,2.4C4.8,3.6,1.5,8,2.1,13.1c0.5,4.6,4.2,8.3,8.7,8.8
	c4.9,0.6,9.2-2.4,10.6-6.7C19.9,15.7,18.1,15.8,16.3,15.2z"
          />
        </svg>
        {LABEL_TEXT}
      </ToggleLabel>
    </ThemeToggleButtonWrap>
  );
};

const ToggleLabel = styled.label`
  cursor: pointer;
  display: block;
  position: absolute;
  height: 28px;
  width: 52px;
  font-size: 0;
  border-radius: 20px;
  color: transparent;
  background-color: ${({ theme }) => theme.color.divider};

  svg {
    position: relative;
    top: 6px;
    left: 6px;
    fill: ${({ theme }) => theme.color.icon};
    transition: fill 500ms ease;
  }
`;

const InnerCircle = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2px;
  right: 26px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  transition: right 300ms ease;
`;

const ThemeToggleButtonWrap = styled.div`
  position: relative;
  min-width: 48px;
  min-height: 28px;
  margin-left: 1.875rem;

  & input:checked + label {
    background: rgba(150, 150, 150, 0.3);
  }

  & input:focus + label {
    outline: 4px solid rgba(0, 125, 250, 0.6);
    outline-offset: 1px;
  }

  & input:checked + label div {
    right: 2px;
    background-color: ${({ theme }) => theme.color.text};
  }
`;

export default ThemeToggleButton;
