import { useQuery } from 'react-query'

interface Card {
  title: string
  id: number
  image: string
  ingredients: string
  description: string
}

function Home() {
  const { isLoading, data } = useQuery('CoffeList', async () => {
    const response = await fetch('https://api.sampleapis.com/coffee/hot')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })

  if (isLoading) {
    return (
      <div className="bg-white">
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center bg-yellow-600">
      <h1 className="mt-10 text-6xl text-white">Coffe!</h1>
      <div className="flex flex-wrap justify-center gap-5 p-10">
        {data.map((item: Card) => {
          return (
            <div
              key={item.id}
              className="w-1/4 flex-col rounded-xl border border-white bg-white p-5"
            >
              <h3 className="mb-5 text-3xl">{item.title}</h3>
              <div className="w-1/2 min-w-[40%]">
                <img src={item.image} />
              </div>
              <div>
                <h4 className="mb-1 mt-3 text-xl">Ingredients:</h4>
                <p>{item.ingredients}</p>
              </div>
              <div>
                <h4 className="mb-1 mt-3 text-xl">Description:</h4>
                <p>{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Home
