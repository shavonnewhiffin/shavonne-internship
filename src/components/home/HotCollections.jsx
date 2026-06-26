import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function fetchHotCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
    } catch {
      console.error("There was an error fetching the hot collections");
    }
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            {hotCollections.length > 0 && (
              <OwlCarousel
                className="owl-theme"
                loop
                data-aos="fade-up"
                data-aos-duration="700"
                nav
                dots={false}
                margin={8}
                navText={["<", ">"]}
                responsive={{
                  0: { items: 1 },
                  572: { items: 2 },
                  992: { items: 3 },
                  1200: { items: 4 },
                }}
              >
                {hotCollections.map(
                  (
                    { nftId, authorId, authorImage, nftImage, title, code },
                    index,
                  ) => (
                    <div key={nftId}
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${nftId}`}>
                            <img
                              src={nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{title}</h4>
                          </Link>
                          <span>ERC-{code}</span>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </OwlCarousel>
            )}
          </div>
        </div>
      </section>
    );
  };

export default HotCollections;
