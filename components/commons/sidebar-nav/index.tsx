import { useState } from "react";
import styled from "styled-components";
import { MediaQueries } from "../../../styles/MediaQueries";

const SideMenu = ({ navLinks }) => {
  //   constructor() {
  //     super();
  //     this.state = {
  //       style: "menu",
  //       menuStatus: "open",
  //     };
  //     this.handleClick = this.handleClick.bind(this);
  //   }
  const [menuStatus, setMenuStatus] = useState("open");
  const [style, setStyle] = useState("menu active");

  const handleClick = () => {
    switch (menuStatus) {
      case "open":
        setMenuStatus("close");
        setStyle("menu active");
        break;
      case "close":
        setMenuStatus("open");
        setStyle("menu");
        break;
    }
  };

  const runPropFunction = (stateChanger) => {
    if (!!stateChanger && typeof stateChanger === "function") {
      console.log("Should run prop function");
      stateChanger();
    }
  };

  return (
    <Wrapper>
      <div className={style}>
        <ul>
          {navLinks.map(({ name, stateChanger }) => (
            <li onClick={() => runPropFunction(stateChanger)}>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;

  @media ${MediaQueries.MD} {
    display: unset;
  }

  .menu {
    // TODO: Fix Styling to be more dynamic
    background: #34495e;
    height: 110vh;
    width: 20%;
    max-width: 18rem;
    min-width: 14rem;
    margin-top: -0.5rem;
    margin-bottom: -4rem;
    padding-top: 1rem;

    span {
      color: #fff;
      text-decoration: none;
      display: block;
      padding: 20px;
    }

    ul {
      padding: 0;
      margin: 0;

      li {
        font-size: 16px;
        border-bottom: 1px solid #fff;
        transition: all 0.25s ease;
        animation: fadeInRight 0.25s ease forwards;
        /* opacity: 0; */

        &:hover {
          opacity: 0.8;
          transition: all 0.25s ease;
          background: #000;
          cursor: pointer;
        }
      }
    }
  }

  .active {
    opacity: 1;
    visibility: visible;
  }

  @-webkit-keyframes fadeInRight {
    0% {
      opacity: 0;
      left: 20%;
    }
    100% {
      opacity: 1;
      left: 0;
    }
  }
`;

export default SideMenu;
