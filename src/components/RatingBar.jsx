import { useState, useEffect } from "react";

import { storageService } from "../services/StorageService";

import star from '../assets/icons/star.svg';          // Estrela vazia
import starFill from '../assets/icons/star-fill.svg'; // Estrela cheia
import heart from '../assets/icons/heart.svg';        // Coração vazio
import heartFill from '../assets/icons/heart-fill.svg'; // Coração cheio

export function RatingBar({ value = 0, id }) {
  const [rating, setRating] = useState(value);        // nota exibida
  const [hover, setHover] = useState(0);              // destaque ao passar o mouse
  const [favorited, setFavorited] = useState(false);  // estado do coração

  // Checa se é favorito ao carregar
  useEffect(() => {
    if (id !== undefined) {
      const isFav = storageService.isFavorito(Number(id));
      setFavorited(isFav);
    }
  }, [id]);

  // Estrelas de avaliação
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((i) => {
      const isFilled = i <= (hover || rating);
      return (
        <img
          key={i}
          src={isFilled ? starFill : star}
          alt={`Estrela ${i}`}
          style={{
            cursor: "pointer",
            width: '2rem',
            height: '2rem',
          }}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
        />
      );
    });
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginTop: '0.5rem'
    }}>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {renderStars()}
      </div>

      <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        {rating.toFixed(1)}
      </span>

      {/* Coração de favorito */}
      <img
        src={favorited ? heartFill : heart}
        alt="Favorito"
        style={{
          width: '2rem',
          height: '2rem',
          cursor: "pointer",
        }}
        onClick={() => {
          const novoEstado = storageService.toggleFavorito(Number(id));
          setFavorited(novoEstado);
        }}
      />
    </div>
  );
}
