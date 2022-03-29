import { ACCESS_TOKEN } from '../constants/constants';
import * as React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// TODO: Fix token storage
const OsuOAuth2RedirectHandler = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    router.push('/');
  }, [])

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  return <>{token}</>;

};



// export const getStaticProps = async (context) => {
//   const { query } = context;
//   const token = query.token;
//   if (token) {
//     localStorage.setItem(ACCESS_TOKEN, token);
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false,
//     },
//   }
// }


export default OsuOAuth2RedirectHandler;
