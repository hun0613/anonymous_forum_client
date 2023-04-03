const Guide = () => {
  return (
    <>
      <div className="w-full h-50 flex-col justify-center items-center tablet:mt-14 mt-10 mb-2">
        <div className="w-full h-fit justify-center items-center flex tablet:flex-row flex-col">
          <div className="w-fit h-fit justify-center items-center tablet:text-lg text-md flex flex-col tablet:mr-2 font-NMSNeo2">
            Anonymous Forum은 익명을 보장하며
          </div>
          <div className="w-fit h-fit justify-center items-center tablet:text-lg text-md flex flex-col font-NMSNeo2">
            자유롭게 어떠한 제약을 받지않고
          </div>
        </div>
        <div className="w-full h-fit justify-center items-center flex tablet:flex-row flex-col">
          <div className="w-fit h-fit justify-center items-center tablet:text-lg text-md flex flex-col tablet:mr-1 font-NMSNeo2">
            여러분들의 생각을 공유할 수 있는
          </div>
          <div className="w-fit h-fit justify-center items-center tablet:text-lg text-md flex flex-col font-NMSNeo2">
            익명게시판입니다.
          </div>
        </div>

        <div className="w-full h-fit justify-center items-center flex tablet:flex-row flex-col">
          <div className="w-fit h-fit justify-center items-center text-sm flex flex-col tablet:mt-3 mt-6 text-pointColor font-NMSNeo2">
            단, 성적인 내용 및 타인을 노골적으로 비판하는 등,
          </div>
          <div className="w-fit h-fit justify-center items-center text-sm flex flex-col tablet:mt-3 tablet:ml-1 text-pointColor font-NMSNeo2">
            부적절한 게시글에 대해서는
          </div>
        </div>

        <div className="w-full h-fit justify-center items-center text-sm flex flex-col text-pointColor font-NMSNeo2">
          관리자 권한으로 삭제될 수 있음을 알려드립니다.
        </div>
      </div>
    </>
  );
};

export default Guide;
