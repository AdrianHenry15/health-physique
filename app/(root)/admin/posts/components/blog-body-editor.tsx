"use client"

import "react-markdown-editor-lite/lib/index.css"
import MdEditor from "react-markdown-editor-lite"
import MarkdownIt from "markdown-it"
import { FC } from "react"

const mdParser = new MarkdownIt()

interface BlogBodyEditorProps {
  value: string
  onChange: (value: string) => void
}

const BlogBodyEditor: FC<BlogBodyEditorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <MdEditor
        value={value}
        style={{ height: "450px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => onChange(text)}
      />
    </div>
  )
}

export default BlogBodyEditor
