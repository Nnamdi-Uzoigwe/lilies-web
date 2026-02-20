
const Subscribe = () => {
  return (
    <div className='py-10 px-6 lg:px-50 flex flex-col lg:flex-row justify-between items-start gap-6 lg:items-center pb-20 lg:pb-40'>
      <div>
        <h3 className='text-xl font-semibold text-[#FBDDBB] mb-3'>Get notified when we update!</h3>
        <p className='text-white text-sm lg:w-[70%]'>
          Get notified when we add new items to our special menu, update our price list or have promos!
        </p>
      </div>

      {/* input */}
      <div className='flex flex-col lg:flex-row items-center gap-3 w-full '>
        <input
          type='text'
          className='bg-white text-black rounded-md p-2 w-full'
          placeholder='gregphilips@gmail.com'
        />
        <button className='p-2 rounded-md w-full lg:w-fit bg-[#FBDDBB] text-(--primary) font-semibold whitespace-nowrap'>
          Get notified
        </button>
      </div>
    </div>
  )
}

export default Subscribe