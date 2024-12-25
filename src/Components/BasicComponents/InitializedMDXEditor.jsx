'use client';
import React, { forwardRef } from 'react'; // forwardRef를 사용하기 위해 import
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './InitializedMDXEditor.css'

// forwardRef를 사용하여 ref를 전달받는 컴포넌트
const InitializedMDXEditor = forwardRef((props, ref) => {
  return (
    <MDXEditor
        contentEditableClassName="prose"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      {...props} // MDXEditor에 전달할 나머지 props들
      ref={ref} // ref를 전달하여 MDXEditor 인스턴스를 접근할 수 있게 해줌
    />
  );
});

export default InitializedMDXEditor;
