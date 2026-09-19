import { Fragment } from "react";

// Divide um texto em palavras com recorte, para entrada palavra a palavra
// (efeito SplitText da referência). Anima quando um ancestral recebe .is-visible.
// O espaço fica FORA do span recortado para não ser colapsado.
export const SplitWords = ({ text, start = 0 }) => {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="w" style={{ "--i": start + i }}>
        <span className="w__in">{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
};
