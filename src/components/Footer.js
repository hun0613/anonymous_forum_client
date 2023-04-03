const Footer = () => {
  return (
    <>
      <div className="max-w-[1000px] w-[95%] h-fit flex flex-col justify-center items-center tablet:mt-20 mt-12 tablet:mb-16 mb-10">
        <div className="w-full h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-textColor/50">
          (주) ANONYMOUS FORUM
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-textColor/50 mt-2">
          ⓒANONYMOUSFORUM. ALL RIGHTS RESERVED
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-textColor/50 mt-5">
          시스템관리자 : 박성훈
        </div>
        <div className="w-full h-fit flex tablet:flex-row flex-col justify-center items-center">
          <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-textColor/50 mt-2">
            TEL : 010)4601-9075
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
