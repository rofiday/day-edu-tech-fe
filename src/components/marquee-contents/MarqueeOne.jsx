const MarqueeOne = () => {
  const images = [
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/tiket_com_b3285c975f.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/traveloka_91a0555133.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/bukalapak_eefd8ee17a.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/tokped_7613729a20.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/grab_72dae08f0c.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/gojek_7e5b3e05a0.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/telkom_43bf226dfd.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/xendit_4dd607f210.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/sinarmas_abcfc64b13.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/investree_5f925a9f3a.png",
  ];

  return (
    <div className="overflow-hidden relative w-full">
      <div className="flex animate-marquee whitespace-nowrap">
        {images.map((src, index) => (
          <div key={index} className="inline-block mx-4">
            <img src={src} alt={`marquee-item-${index}`} className="h-16" />
          </div>
        ))}
      </div>
      <div className="flex absolute top-0 animate-marquee2 whitespace-nowrap">
        {images.map((src, index) => (
          <div key={index} className="inline-block mx-4">
            <img src={src} alt={`marquee-item-${index}`} className="h-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeOne;
