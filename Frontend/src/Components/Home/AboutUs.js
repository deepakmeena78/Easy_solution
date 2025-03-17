import React from 'react';

const AboutUs = () => {
    return (
        <div className="flex justify-center p-4">
            <iframe
                width="1189"
                height="479"
                frameBorder="0"
                id="gmap_canvas"
                src="https://maps.google.com/maps?width=1189&amp;height=479&amp;hl=en&amp;q=Durga%20colony%20%20indore+(Home)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default AboutUs;
