import React, { useEffect, useState } from "react";
import "../../App.css"
import HelpImage from "./HelpImage";
import HelpInfo from "./HelpInfo";


const HelpDetails = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 p-4">
                <div className="col-span-3">
                    <HelpImage />
                </div>

                <div className="col-span-2">
                    <HelpInfo />
                </div>
            </div>
        </>
    )
}
export default HelpDetails;
