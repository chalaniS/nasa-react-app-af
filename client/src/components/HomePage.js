import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/homePageStyle.css";

const HomePage = () => {
  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Use useEffect to scroll to section when the component mounts
  useEffect(() => {
    const sectionId = window.location.hash.replace("#", "");
    if (sectionId) {
      scrollToSection(sectionId);
    }
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NASA
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#image-of-the-day"
                  onClick={() => scrollToSection("image-of-the-day")}
                >
                  Image of the Day
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#image-library"
                  onClick={() => scrollToSection("image-library")}
                >
                  Image Library
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#mars-rover-photos"
                  onClick={() => scrollToSection("mars-rover-photos")}
                >
                  Mars Rover Photos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid">
        <div id="image-of-the-day" className="row text-white">
          <div className="mt-5 position-relative">
            <div className="image-container">
              <h2 className="position-absolute top-0 start-50 translate-middle m-0">
                Image Of The Day
              </h2>
              <Link
                to={`/ImageLibrary`}
                className="btn btn-outline-light position-absolute bottom-0 end-0 m-3"
                role="button"
              >
                View Image <i className="bi bi-arrow-right-circle-fill"></i>
              </Link>
              <p
                className="mt-3 m-3"
                style={{ width: "50vw", textAlign: "justify" }}
              >
                "Embark on an odyssey through the cosmos with NASA's captivating
                Image of the Day series. Delve into the boundless expanse of
                space with each stunning snapshot, from mesmerizing views of
                distant galaxies to awe-inspiring glimpses of our own planet.
                Every day unveils a fresh visual voyage through the marvels of
                space exploration, revealing the beauty and enigma of the
                universe captured by NASA's state-of-the-art imaging technology.
                Join us on this cosmic journey as we unravel the mysteries and
                unveil the splendor of the cosmos, one breathtaking image at a
                time."
              </p>
            </div>
          </div>
        </div>

        <div id="image-library" className="row text-white">
          <div className="mt-5 position-relative">
            <div className="image-container">
              <h2 className="position-absolute top-0 start-50 translate-middle m-0">
                NASA Image and Video Library
              </h2>
              <Link
                to={`/ImageOfTheDay`}
                className="btn btn-outline-light position-absolute bottom-0 end-0 m-3"
                role="button"
              >
                Browse Image Archive{" "}
                <i className="bi bi-arrow-right-circle-fill"></i>
              </Link>
              <p
                className="mt-3 m-3"
                style={{ width: "50vw", textAlign: "justify" }}
              >
                "Plunge into the expansive NASA Image and Video Library, a
                virtual vault teeming with spellbinding visuals from the
                vanguard of space exploration. Each click uncovers a treasure
                trove of captivating imagery, ranging from breathtaking
                photographs showcasing remote celestial wonders to enthralling
                videos immortalizing the grandeur of rocket launches and
                planetary vistas. Immerse yourself in the celestial symphony of
                the cosmos, traversing through this multimedia odyssey of
                discovery. Join us as we peel back the layers of the universe's
                allure, embarking on an exploration that unfolds in pixels and
                frames, illuminating the beauty and intrigue of cosmic realms,
                one image and video at a time."
              </p>
            </div>
          </div>
        </div>

        <div id="mars-rover-photos" className="row text-white">
          <div className="mt-5 position-relative">
            <div className="image-container">
              <h2 className="position-absolute top-0 start-50 translate-middle m-0">
                Mars Rover Photos
              </h2>
              <Link
                to={`/MarsRoverPage`}
                className="btn btn-outline-light position-absolute bottom-0 end-0 m-3"
                role="button"
              >
                Start Exploring{" "}
                <i className="bi bi-arrow-right-circle-fill"></i>
              </Link>
              <p
                className="mt-3 m-3"
                style={{ width: "50vw", textAlign: "justify" }}
              >
                "Commence on an enthralling visual journey across the Crimson
                World with Mars Rover Images. Immerse yourself in the Martian
                landscape through the lens of NASA's robotic explorers,
                capturing sweeping panoramas, intriguing geological formations,
                and remnants of ancient environments. Join us as we traverse the
                extraterrestrial terrain and uncover the enigmas of Mars, one
                captivating snapshot at a time. Let each photograph transport
                you to this distant realm, where every pixel holds the promise
                of revelation and every frame unveils a vivid portrayal of our
                neighboring planet's past and potential futures."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
