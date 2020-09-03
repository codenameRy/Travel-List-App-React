import React from "react";
import { Helmet } from "react-helmet";
import { Marker, Popup } from "react-leaflet";

import { useDestinations } from "hooks";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  const { destinations } = useDestinations();

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if ( !map ) return;
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "Mapbox",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
        {destinations.map(destination => {
          const { id, location, name } = destination;
          const { latitude, longitude } = location;
          const position = [latitude, longitude];
          return (
            <Marker key={id} position={position}>
              <Popup>{name}</Popup>
            </Marker>
          )
        })}
      </Map>

      <Container type="content" className="text-center home-destinations">
        <h2>Destinations</h2>
        <ul>
          {destinations.map((destination) => {
            const { id, name } = destination;
            return <li key={id}>{name}</li>;
          })}
        </ul>
      </Container>

      <Container type="content-full" className="text-center home-start">
        <h2>Want to create your own mapping app?</h2>
        <p>Run the following in your terminal!</p>
        <Snippet>
          gatsby new [directory]
          https://github.com/colbyfayock/gatsby-starter-leaflet
        </Snippet>
        <p className="note">
          Note: Gatsby CLI required globally for the above command
        </p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
