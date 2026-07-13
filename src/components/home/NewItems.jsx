import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const NewItems = () => {

const [newItems, setNewItems] = useState([])
const [loading, setLoading] = useState(true)
const [now, setNow] = useState(Date.now())

useEffect(() => {
  fetchNewItems();
}, [])

useEffect(() => {
  const interval = setInterval(() => setNow(Date.now()), 1000);
  return () => clearInterval(interval);
}, [])

  async function fetchNewItems() {
    try {
      const { data } = await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
          );
          setNewItems(data)
          setLoading(false)
        } catch {
          setLoading(false)
          console.error("There was an error fetching New Items");
        }
      }

      function getCountdown(expiryDate, now){
        const timeLeft = expiryDate - now;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        return { hours, minutes, seconds };
      }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newItems.map(({ authorImage, likes, nftImage, price, title, expiryDate, nftId, authorId }) => {
                  const countdown = expiryDate ? getCountdown(expiryDate, now) : null;
            return ( <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nftId}>
              <div className="nft__item" key={nftId}>
                <div className="author_list_pp">
                  <Link
                    to={`/author/${authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {countdown && (
                  <div className="de_countdown">{countdown.hours}h:{countdown.minutes}m:{countdown.seconds}s</div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{title}</h4>
                  </Link>
                  <div className="nft__item_price">{price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>);
          })}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
