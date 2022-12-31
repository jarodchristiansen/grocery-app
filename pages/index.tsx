import { useSession, getSession } from "next-auth/client";
import styled from "styled-components";
import { MediaQueries } from "../styles/MediaQueries";

const Home = () => {
  return (
    <HomePageContainer>
      <h1>Home Page Grocery App</h1>
      <h2>Test deploy</h2>
    </HomePageContainer>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  /* @media ${MediaQueries.MD} {

  } */
`;

export default Home;
