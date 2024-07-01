import React, { useEffect, useState } from 'react';
import './css/badge.css';

function Badge() {
    const [badgeClass, setBadgeClass] = useState('silver');

    useEffect(() => {
        // Get the visit count from local storage
        let visitCount = localStorage.getItem('visitCount');

        if (visitCount === null) {
            visitCount = 0;
        } else {
            visitCount = parseInt(visitCount, 10);
        }

        // Increment the visit count
        visitCount += 1;

        // Store the updated visit count in local storage
        localStorage.setItem('visitCount', visitCount);

        // Determine the badge class based on the visit count
        if (visitCount > 10) {
            setBadgeClass('premium');
        } else if (visitCount > 4) {
            setBadgeClass('gold');
        } else {
            setBadgeClass('silver');
        }
    }, []);

    return (
        <div className={`badge ${badgeClass}`}>
            <h4> {badgeClass} <i className="las la-id-badge"></i> </h4>
        </div>
    );
}

export default Badge;
