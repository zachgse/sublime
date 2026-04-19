import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { menuBarStateSelector } from './menuBarState'
import {RiBold, RiItalic, RiSeparator, RiStrikethrough, RiUnderline} from '@remixicon/react'
import clsx from 'clsx'

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap bg-[#f0f4f9] p-1">
        <button type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            className={clsx("cursor-pointer p-2",
                editorState.isBold ? 'bg-blue-200 hover:bg-blue-200' : 'hover:bg-gray-200')}>
            <RiBold />
        </button>
        <button type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            className={clsx("cursor-pointer p-2",
                editorState.isItalic ? 'bg-blue-200 hover:bg-blue-200' : 'hover:bg-gray-200')}>
            <RiItalic />
        </button>
        <button type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editorState.canStrike}
            className={clsx("cursor-pointer p-2",
                editorState.isStrike ? 'bg-blue-200 hover:bg-blue-200' : 'hover:bg-gray-200')}>
            <RiStrikethrough />
        </button>
        <button type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editorState.canUnderline}
            className={clsx("cursor-pointer p-2",
                editorState.isUnderline ? 'bg-blue-200 hover:bg-blue-200' : 'hover:bg-gray-200')}>
            <RiUnderline />
        </button>
        <button type="button" 
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={clsx("hover:bg-gray-200 cursor-pointer p-2")}>
            <RiSeparator/>
        </button>
    </div>
  )
}