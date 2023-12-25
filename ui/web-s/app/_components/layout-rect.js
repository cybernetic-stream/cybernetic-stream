export default function LayoutRect({ background, header, children }) {
  const bgElement = background && (
    <div className='h-full bg-slate-400 opacity-40 rounded-xl shadow-sm shadow-slate-300' />
  );

  const content = children;

  return (
    <div
      className={
        'fixed w-11/12 h-80 bottom-0 -translate-x-1/2 left-1/2 sm:translate-x-1/4 sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 sm:short:w-[18.355rem] sm:short:h-[18.355rem] sm:w-96 2xl:w-[26.5rem] 4xl:w-[33rem] 6xl:w-[33.5rem] sm:h-96 2xl:h-[26.5rem] 4xl:h-[33rem] 6xl:h-[33.5rem] backdrop-blur-[0.75px] '
      }
    >
      {bgElement}
      <div className=''>
        <div className='text-white leading-snug text-center flex flex-col items-center'>
          {header}
        </div>
        {content}
      </div>
    </div>
  );
}
