import React from 'react'
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core'
import "./infoBox.css"

function InfoBox({title,cases,active,isRed,total, ...props}) {
  return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"}  ${isRed && "infoBox--red"} `}>
            <CardContent>
                {/* title i.e. COrona cases*/}
                <Typography className="infoBox__title"  color="textSecondary">{title}
                </Typography>
                
                 {/*+1200 Number of case  */}
                 <h2 className="infoBox__cases">{cases}</h2>
                  {/*1.4M Total */}
                  <Typography className="infoBox__total" color="textSecondary">{title}:{total}
                </Typography>

            </CardContent>
        </Card>
  )
}

export default InfoBox
