export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}

const Home = () => {
  return <>Home Page</>
}

export default Home
