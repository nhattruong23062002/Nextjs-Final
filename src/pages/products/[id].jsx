import Layout from './layout.jsx'
import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import axiosClient from "../../libraries/axiosClient.js";
import { useRouter } from "next/router";


const ProductDetail = (props) => {
 const {product} = props

  return (
    <Layout>
    <Head>
      <title>Chi tiết sản phẩm</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {product && (
      <main>
        <p>
          <strong>name:</strong> {product.name}
        </p>
        <p>
          <strong>description:</strong> {product.description}
        </p>
      </main>
    )}
  </Layout>
  )
}


export default ProductDetail;

// SSG
// export async function getStaticPaths() {
//   try {
//     const response = await axiosClient.get('/products');

//     const paths = response.data.payload.map((p) => {
//       return {
//         params: { id: p._id},
//       }
//     })

//     return {
//       paths,
//       fallback: block,
//     }
//   } catch (error) {
//     console.log('««««« error »»»»»', error);
//   }
// }

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/products/${params.id}`);

    return {
      props: {
        product: response.data.payload,
      },

      revalidate: 60 * 60 * 24 * 30,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

// SSR
// export async function getServerSideProps(req) {
//   try {
//     const { params } = req;
//     const response = await axiosClient.get(`/products/${params.id}`);

//     return {
//       props: {
//         product: response.data.payload,
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }