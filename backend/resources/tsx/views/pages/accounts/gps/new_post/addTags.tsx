import './react_tag.css';
import ReactTags from 'react-tag-autocomplete';
import { useState } from 'react';
import { withAlert } from 'react-alert'; 
import React from 'react';

export const AddTags =  (props:any) => {
  
  return (
      <div>
        <ReactTags
            tags={props.tags}
            suggestions={props.suggestions}
            onDelete={props.onDelete}
            onAddition={props.onAddition}
            minQueryLength={1}
            placeholderText = "タグを追加" id="tag-input" allowNew
        />
      </div>
  );
}

