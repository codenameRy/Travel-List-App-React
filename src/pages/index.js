import React from "react";
import { Helmet } from "react-helmet";
import { Marker, Popup } from "react-leaflet";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";

import { useDestinations } from "hooks";

const LOCATION = {
  lat: 38.9072,
  lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  const { destinations } = useDestinations();
  console.log("destinations", destinations);
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if (!map) return;
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Travel List App!</title>
      </Helmet>

      <Map {...mapSettings}>
      { destinations.map(destination => {
        const { id, location, name } = destination;
        const { latitude, longitude } = location;
        const position = [latitude, longitude];
        return (
          <Marker key ={id} position={position}>
            <Popup>
              { name }
            </Popup>
          </Marker>
        )
      })}
        
      </Map>

      <Container type="content" className="text-center home-start">
        <h2>My Destinations</h2>
        <ul>
          {destinations.map(destination => {
            const { id, name } = destination;
            return <li key={id}>{name}</li>;
          })}
        </ul>
        <h2>Still Getting Started?</h2>
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
