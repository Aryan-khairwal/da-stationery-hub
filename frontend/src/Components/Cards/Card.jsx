import React, { useState, useEffect } from "react";

const Card = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://da-stationery-hub.onrender.com/api/products`;
        let response = await fetch(url);
        let parsedData = await response.json();

        console.log("API Response:", parsedData);
        setProducts(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container} className="bg-slate-500">
      <h2>Da Stationary Hub</h2>
      <div style={styles.cardContainer}>
        {console.log(products.length)}
        {
          products.map((product, index) => (
            <div key={index} style={styles.card}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};


const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
  },
};

export default Card;
