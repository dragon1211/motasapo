import  React,{ useState } from "react";
import { FaBorderNone } from "react-icons/fa";

import { Mention, MentionsInput } from "react-mentions";
const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/;

const MultipleTriggers:React.FC<{data:any, value:any, onChange:any, onAdd:any}> = (props) => {
  
  return (
    <div className="comment-input-field">

      <MentionsInput
        value={props.value}
        onChange={props.onChange}
        placeholder={"Mention people using '@'"}
      >
        <Mention
          trigger="@"
          data={props.data}
          markup="@[__display__](__type__:__id__)"
          renderSuggestion={(
            suggestion:any,
            search:any,
            highlightedDisplay:any,
            index:any,
            focused:any
          ) => (
            <div>
              {highlightedDisplay}
            </div>
          )}
          onAdd={props.onAdd}
        />

        <Mention
          trigger={emailRegex}
          data={(search:any) => [{ id: search, display: search }]}
          onAdd={props.onAdd}
        />
      </MentionsInput>
    </div>
  );
}

export default MultipleTriggers;
