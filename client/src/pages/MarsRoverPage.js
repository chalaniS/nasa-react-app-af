import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "pVpMiLmP9aaHnBIoFiF9x82jfbxixrE9yXT1PYIv"; // Replace with your NASA API key

const cameraNames = {
  FHAZ: "Front Hazard Avoidance Camera",
  RHAZ: "Rear Hazard Avoidance Camera",
  MAST: "Mast Camera",
  CHEMCAM: "Chemistry and Camera Complex",
  MAHLI: "Mars Hand Lens Imager",
  MARDI: "Mars Descent Imager",
  NAVCAM: "Navigation Camera",
};

const MarsRoverPage = () => {
  const [rover, setRover] = useState("curiosity");
  const [roverData, setRoverData] = useState({});
  const [photos, setPhotos] = useState({});
  const [loadingRover, setLoadingRover] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoverData = async () => {
      setLoadingRover(true);
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`
        );
        setRoverData(response.data);
        setLoadingRover(false);
      } catch (error) {
        setError("Error fetching rover data");
        setLoadingRover(false);
      }
    };

    fetchRoverData();
  }, [rover]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (rover === "curiosity") {
        setLoadingPhotos(true);
        try {
          const cameras = [
            "FHAZ",
            "RHAZ",
            "MAST",
            "CHEMCAM",
            "MAHLI",
            "MARDI",
            "NAVCAM",
          ];
          const photoData = {};
          for (let camera of cameras) {
            const response = await axios.get(
              `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&camera=${camera}&page=1&api_key=${API_KEY}`
            );
            if (response.data.photos.length > 0) {
              photoData[camera] = response.data.photos;
            }
          }
          setPhotos(photoData);
          setLoadingPhotos(false);
        } catch (error) {
          setError("Error fetching photos");
          setLoadingPhotos(false);
        }
      } else {
        setPhotos({});
      }
    };

    fetchPhotos();
  }, [rover]);

  return (
    <div className="container">
      <h1 className="mt-4">Mars Rover Mission Information</h1>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="rover">Select Rover:</label>
          <select
            id="rover"
            className="form-select mb-3"
            value={rover}
            onChange={(e) => setRover(e.target.value)}
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </div>
        <div className="col-md-4">
          {loadingRover ? (
            <p>Loading rover data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div>
              <h2>{roverData.photo_manifest.name}</h2>
              <p>
                Landing Date on Mars: {roverData.photo_manifest.landing_date}
              </p>
              <p>
                Launch Date from Earth: {roverData.photo_manifest.launch_date}
              </p>
              <p>Mission Status: {roverData.photo_manifest.status}</p>
              <p>Total Photos Taken: {roverData.photo_manifest.total_photos}</p>
            </div>
          )}
        </div>
        <div className="row">
          {rover === "curiosity" && !loadingPhotos ? (
            Object.keys(photos).map((camera) => (
              <div key={camera}>
                <h3>Camera: {cameraNames[camera]}</h3>
                <div
                  id={`${camera}-carousel`}
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {photos[camera].map((photo, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          src={photo.img_src}
                          className="d-block w-100"
                          alt={`Mars Rover ${camera}`}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#${camera}-carousel`}
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#${camera}-carousel`}
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>
              {rover !== "curiosity"
                ? `No photos available for ${rover} rover`
                : "Loading photos..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarsRoverPage;
