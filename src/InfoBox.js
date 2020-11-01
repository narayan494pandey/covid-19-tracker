import React from 'react'
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core'

function InfoBox({title,cases,total}) {
  return (
    <div>
        <Card>
            <CardContent>
                {/* title i.e. COrona cases*/}
                <Typography className="infoBox__title"  color="textSecondary">{title}
                </Typography>
                
                 {/*+1200 Number of case  */}
                 <h2 className="infoBox__cases">{cases}</h2>
                  {/*1.4M Total */}
                  <Typography className="infoBox__total" color="textSecondary">Total_{title}:{total}
                </Typography>

            </CardContent>
        </Card>
      
    </div>
  )
}

export default InfoBox
