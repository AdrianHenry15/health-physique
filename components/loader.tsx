"use client"

import { CSSProperties } from "react"
import { PuffLoader } from "react-spinners"

const override: CSSProperties = {
  display: "flex",
  margin: "0 auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

export const Loader = () => {
  return <PuffLoader color="black" size={150} cssOverride={override} />
}
