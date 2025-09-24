

export const ProductDescription = ({
    name,
    description,
    category,
    stock
  }) => {
    return (
      <div className="product-description-container">
        <span className="product-description-title">{name}</span>
  
        <div className="product-description-details">
          <span className="product-description">Descripción: {description}</span>
          <span className="product-description">Categoría: {category}</span>
          <span
            className="product-description"
            style={{ color: stock > 0 ? "green" : "red" }}
          >
            Stock: {stock}
          </span>
        </div>
      </div>
    );
  };
  