export const ColumnIndicators = () => {
  return (
    <>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={`bg-red-200 opacity-30 p-2 text-center text-sm font-semibold ${
                  i >= 6 ? 'hidden md:block' : ''
                } ${
                  i >= 8 ? 'md:hidden lg:block' : ''
                }`}
              >
                {i + 1}
              </div>
            ))}
    </>
  )
}