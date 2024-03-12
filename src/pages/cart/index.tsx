export function Cart() {
  return (
    <div className='w-full max-w-7xl  mx-auto'>
      <h1 className='font-medium text-2xl text-center my-4'>Shopping cart</h1>
      <section className='flex items-center justify-between border-b-2 border-gray-300'>
        <img
          className='w-28'
          src='https://www.kadri.com.br/sys/corteimg.asp?img=amp-1(42).jpg&sys=produtos&cut=1&w1=906&h1=906'
          alt='Product logo'
        />
        <strong>Price: $1.000</strong>
        <div className="flex items-center justify-center gap-3">
          <button className='bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center'>
            -
          </button>
          2
          <button className='bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center'>
            +
          </button>
        </div>

        <strong className="float-right">
          Subtotal: $1.000
        </strong>
      </section>

      <p className="font-bold mt-4">Total: $1.000</p>
    </div>
  );
}
