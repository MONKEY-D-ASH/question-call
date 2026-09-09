"use client"

import dynamic from "next/dynamic";
import Editor from '@uiw/react-markdown-editor';

// This is the only place InitialilzedMDXEditor is imported directly 
const RTE = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => {return mod.default}),
  { ssr: false }
);

export const MarkdownPreview = Editor.Markdown;

export default RTE