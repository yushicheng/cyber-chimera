import { useContext } from "react";
import { RenderContext } from "@/render/render_context";

export default function useInitialValue() {
  const { initial_value } = useContext(RenderContext);
  return initial_value;
};