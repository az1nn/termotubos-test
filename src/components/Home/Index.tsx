import CardModal from 'components/CardModal'
import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'

export interface Card {
  title: string
  id: number
  image: string
  ingredients: Array<string>
  description: string
}
const initialSelectedItem = {
  title: '',
  id: 0,
  image: '',
  ingredients: [''],
  description: ''
}

function Home() {
  const [showModal, setShowModal] = React.useState(false)
  const [selectedItem, setSelectedItem] =
    React.useState<Card>(initialSelectedItem)
  const [filterBy, setFilterBy] = React.useState('none')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isFiltered, setIsFiltered] = React.useState(false)
  const [FilteredCoffeList, setFilteredCoffeList] = React.useState<Array<Card>>(
    []
  )

  const HotCoffeList = useQuery('HotCoffeList', async () => {
    const response = await fetch('https://api.sampleapis.com/coffee/hot')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })

  const IcedCoffeList = useQuery('IcedCoffeList', async () => {
    const response = await fetch('https://api.sampleapis.com/coffee/iced')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })

  const SumAllCoffeList: Array<Card> = useMemo(() => {
    if (!HotCoffeList.isLoading && !IcedCoffeList.isLoading) {
      return HotCoffeList.data.concat(IcedCoffeList.data)
    }
  }, [HotCoffeList, IcedCoffeList])

  function SelectItem(item: Card) {
    setSelectedItem(item)
    setShowModal(true)
  }

  function HandleFilter(props: string) {
    setFilterBy(props)
    setIsFiltered(true)
  }

  useEffect(() => {
    if (filterBy === 'hot') {
      setFilteredCoffeList(HotCoffeList.data)
    }
    if (filterBy === 'iced') {
      setFilteredCoffeList(IcedCoffeList.data)
    }
    if (filterBy === 'none') {
      setIsFiltered(false)
    }
    if (filterBy === 'search') {
      const searchResults: Array<Card> = SumAllCoffeList.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      })
      if (searchTerm.length < 1) {
        return setFilteredCoffeList(SumAllCoffeList)
      } else {
        setFilteredCoffeList(searchResults)
      }
    }
  }, [
    HotCoffeList.data,
    IcedCoffeList.data,
    SumAllCoffeList,
    filterBy,
    searchTerm
  ])

  if (HotCoffeList.isFetching) {
    return (
      <div className="bg-white">
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center bg-yellow-600">
      <h1 className="mt-6 text-6xl text-white">Coffe!</h1>
      <div className="mt-2 flex w-full justify-center flex-wrap">
        <p className="text-lg w-full text-center m-2 mb-4 text-white">Filter By:</p>
        <button
          className="mx-4 rounded border p-1 text-black hover:bg-white"
          onClick={() => HandleFilter('hot')}
        >
          Hot
        </button>
        <button
          className="mx-4 rounded border p-1 text-black hover:bg-white"
          onClick={() => HandleFilter('iced')}
        >
          Iced
        </button>
        <button
          className="mx-4 rounded border p-1 text-black hover:bg-white"
          onClick={() => HandleFilter('none')}
        >
          Show All
        </button>
      </div>
      <div className="mt-6">
        <input
          className="rounded border p-1"
          type="text"
          name=""
          id=""
          placeholder="Search by..."
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
        />
        <button
          className="ml-4 border p-1 hover:bg-white"
          onClick={() => HandleFilter('search')}
        >
          Search
        </button>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-5 p-10">
        {isFiltered
          ? FilteredCoffeList.map((item: Card) => {
              const ingredientsArray: Array<string> = Array.from(
                item.ingredients
              )
              return (
                <div
                  key={item.id}
                  className="w-1/4 cursor-pointer flex-col justify-items-center rounded-xl border border-white bg-white p-5"
                  onClick={() => SelectItem(item)}
                >
                  <div className="flex flex-wrap justify-center">
                    <h3 className="mb-5 w-full text-center text-3xl">
                      {item.title}
                    </h3>
                    <div className="flex w-full justify-center">
                      <img className="h-40 w-40" src={item.image} />
                    </div>
                    <div className="mt-4 mb-2 w-full">
                      <h4 className="mb-1 text-xl">Ingredients:</h4>
                      <div>
                        {ingredientsArray.map((item, index) => {
                          return <p key={index}>{item}</p>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          : SumAllCoffeList.map((item: Card) => {
              const ingredientsArray: Array<string> = Array.from(
                item.ingredients
              )
              return (
                <div
                  key={item.id}
                  className="w-1/4 cursor-pointer flex-col justify-items-center rounded-xl border border-white bg-white p-5"
                  onClick={() => SelectItem(item)}
                >
                  <div className="flex flex-wrap justify-center">
                    <h3 className="mb-5 w-full text-center text-3xl">
                      {item.title}
                    </h3>
                    <div className="flex w-full justify-center">
                      <img className="h-40 w-40" src={item.image} />
                    </div>
                    <div className="mt-4 mb-2 w-full">
                      <h4 className="mb-1 text-xl">Ingredients:</h4>
                      <div>
                        {ingredientsArray.map((item, index) => {
                          return <p key={index}>{item}</p>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
      </div>
      {showModal ? (
        <CardModal
          selectedItem={selectedItem}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  )
}
export default Home
