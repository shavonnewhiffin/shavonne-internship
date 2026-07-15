import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../UI/Card";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExploreItems();
  }, []);

  async function fetchExploreItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );

      setExploreItems(data);
    } catch (error) {
      console.error("There was an error fetching Explore Items", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {/* 1. Wrap the conditional rendering in a "row" div */}
      <div className="row">
        {loading
          ? new Array(16).fill(0).map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                {/* 2. Pro Tip: Ensure your CSS skeleton class has a defined height/width */}
                <div className="exploreItems__img--skeleton skeleton" style={{ height: "350px", width: "100%", borderRadius: "8px" }} />
              </div>
            ))
          : exploreItems.map((item, index) => (
              <div
                key={item.nftId || index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <Card {...item} />
              </div>
            ))}
      </div>

      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;