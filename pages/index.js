import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Form from '../components/Form';
const Map = dynamic(import('../components/Map'), { ssr: false });

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../static/locales/en/common.json';
import ru from '../static/locales/ru/common.json';
import de from '../static/locales/de/common.json';

const Index = () => {
  const router = useRouter();

  i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      de: { translation: de },
    },
    lng: router.query.l || 'en',
    interpolation: { escapeValue: false }
  });
  
  let mapData ={
    center: [59.9182, 30.1341],
    zoom: 10
  };

  if (router.query
    && router.query.lat
    && router.query.long
    && router.query.zoom
  ) {
    mapData ={
      center: [router.query.lat, router.query.long],
      zoom: router.query.zoom
    };
  }

  useEffect(() => {
    Router.replace({ 
      pathname: Router.route, 
      query:  { 
          ...Router.query,
          l: navigator.language.split('-')[0]
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>React SSR</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossOrigin=""/>
      </Head>
      <Map data={ mapData } />
      <Form />

      <style jsx global>{`
        html, body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background: #333;
        }

        a { color: #333 }
      `}</style>
    </div>
  )
};

export default Index;
