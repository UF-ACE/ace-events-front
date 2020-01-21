import React from 'react'
import 'es6-shim'
import '../styles/draft.css'
import { useState } from 'react'
import { EditorState, Editor, RichUtils, getDefaultKeyBinding } from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'

const NoSSREditor = (props) => {
  const [editor, setEditState] = useState(EditorState.createEmpty())

  const inlineStyleModifier = (type) => {
    
    setEditState(RichUtils.toggleInlineStyle(editor, type))
    props.onNewEditState(stateToHTML(newState.getCurrentContent()))
  }

  if (props.loadDefault && editor != props.initValue) {
    props.initCallback()
    setEditState(props.initValue)
  }

  if (props.styleRef)
    props.styleRef(inlineStyleModifier.bind(this))

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditState(newState)
      
      props.onNewEditState(stateToHTML(newState.getCurrentContent()))
      return 'handled'
    }
    return 'not-handled'
  }

  const keyToCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editor,
        4, /* maxDepth */
      )
      if (newEditorState !== editor) {
        setEditState(newEditorState)
        props.onNewEditState(stateToHTML(newState.getCurrentContent()))
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  return (
    <Editor 
      editorState={editor} 
      onChange={(state) => { setEditState(state); props.onNewEditState(stateToHTML(state.getCurrentContent())) }}
      handleKeyCommand={handleKeyCommand}
      spellCheck
      placeholder={props.placeholder}
      keyBindingFn={keyToCommand}
    />
  )
}

export default NoSSREditor

