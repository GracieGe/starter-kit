export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/statistics-information',
      permanent: false
    }
  }
}

const Home = () => {
  return <>Home Page</>
}

export default Home
