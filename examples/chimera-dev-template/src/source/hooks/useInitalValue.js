import { useContext } from "react";
import { RenderContext } from "@/source/context/render_context";

export default function useInitalValue() {
  const { initial_value } = useContext(RenderContext);
  return initial_value;
};