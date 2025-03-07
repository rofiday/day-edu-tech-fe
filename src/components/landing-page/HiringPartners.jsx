const HiringPartners = () => {
  const partners = [
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
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/mrt_b9ea94d370.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/cermati_2b8a9d35ec.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/btpn_7c9cbdb236.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/sirclo_0d7b000fbc.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/qlue_8e2e741317.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/flip_3b6b7d7025.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/99_co_a766132d81.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/technasia_e968625431.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/koinworks_fdacc98a8f.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/mpm_da7702d203.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/payfazz_7093d6d1cc.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/permatabank_a63504f7a5.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/bareksa_ccda0d10f2.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/zenius_13156a2ba3.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/sicepat_109ebae7bd.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/mandiri_02d8950661.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/cimb_23cf99ded4.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/bi_b5418defc5.png",
    "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/dana_e419a03ea3.png",
  ];

  return (
    <div className="hiring-partners p-10 bg-gray-100 pt-28 px-[6%] pb-8">
      <h3 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Partner Kami
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-center">
        {partners.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Partner ${index + 1}`}
            className="w-32 h-auto mx-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default HiringPartners;
