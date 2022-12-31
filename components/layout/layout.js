import { Fragment } from "react";
import Header from "./header";
import styled from "styled-components";

function Layout(props) {
  return (
    <LayoutContainer>
      <Header />
      <main>{props.children}</main>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Layout;
