import type { TTypeAndColorSchema } from "shared/schemas";
import { pieceIcons } from "../constants/chess.const";

export const getIconByPiece = (typeAndColor: TTypeAndColorSchema) => {
  const props = { className: "size-full", color: typeAndColor.color };
  const Icon = pieceIcons[typeAndColor.type];
  return <Icon {...props} />;
};
