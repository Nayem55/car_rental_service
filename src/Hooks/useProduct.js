import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://exam-server-7c41747804bf.herokuapp.com/carsList")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
      }, []);

      return [products]

};
export default useProduct;
