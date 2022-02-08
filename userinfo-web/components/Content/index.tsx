import { isEmpty} from "lodash"
import React from "react"
import MessageArea from "./MessageArea"

function Content({data}:any) { 
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5">
     { !isEmpty(data)&&<MessageArea data={data} />}
      </div>
    </div>
  )
}

export default Content
